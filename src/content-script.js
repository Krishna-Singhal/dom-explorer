(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "scanElements") {
            const elements = scanPageElements();
            sendResponse({ elements });
        } else if (request.action === "runTests") {
            const results = runValidationTests();
            sendResponse({ results });
        } else if (request.action === "fakeFill") {
            fakeFill();
        }
        return true;
    });

    function scanPageElements() {
        const elements = {};

        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            const type = input.type || "text";
            elements[type] = (elements[type] || 0) + 1;
        });

        const selects = document.querySelectorAll("select");
        elements["select"] = selects.length;

        const textareas = document.querySelectorAll("textarea");
        elements["textarea"] = textareas.length;

        const buttons = document.querySelectorAll("button");
        elements["button"] = buttons.length;

        return elements;
    }

    function getRelevantInputs() {
        const inputs = Array.from(document.querySelectorAll("input"));
        return inputs.filter((input) => {
            const type = input.type;
            return (
                !["hidden", "file", "radio", "checkbox", "submit"].includes(type) &&
                !input.disabled &&
                !input.readOnly
            );
        });
    }

    function runValidationTests() {
        const results = [];
        const inputs = getRelevantInputs();

        inputs.forEach((input) => {
            const meta = getInputMeta(input);

            if (checkEmailField(input, meta, results)) return;
            if (checkNameField(input, meta, results)) return;
            if (checkPasswordField(input, meta, results)) return;
            if (checkPhoneField(input, meta, results)) return;
            if (checkPincodeField(input, meta, results)) return;
            if (checkGstField(input, meta, results)) return;
            if (checkCouponField(input, meta, results)) return;

            results.push({
                elementType: "unknown",
                id: input.id,
                status: "unknown",
                message: "Uncategorized input field",
                details: `Located at: ${getElementPath(input)}`,
            });
        });

        return results;
    }

    function getInputMeta(input) {
        const type = input.type?.toLowerCase() || "";
        const nameAttr = input.name?.toLowerCase() || "";
        const id = input.id?.toLowerCase() || "";
        const placeholder = input.placeholder?.toLowerCase() || "";
        const label = document.querySelector(`label[for="${input.id}"]`);
        const labelText = label?.innerText.toLowerCase() || "";

        return { type, nameAttr, id, placeholder, labelText };
    }

    function checkEmailField(input, meta, results) {
        const { type, nameAttr, id, placeholder, labelText } = meta;
        const isEmailRelated =
            type.includes("email") ||
            nameAttr.includes("email") ||
            id.includes("email") ||
            placeholder.includes("email") ||
            labelText.includes("email");
        if (!isEmailRelated) return false;

        const originalValue = input.value;
        input.value = "invalid_test";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        if (input.checkValidity()) {
            results.push({
                elementType: "email",
                id: input.id,
                status: "fail",
                message: "Email field should have validation",
                details: `Located at: ${getElementPath(input)}`,
            });
        } else {
            results.push({
                elementType: "email",
                id: input.id,
                status: "pass",
                message: "Email field correctly rejected invalid input",
                details: `Located at: ${getElementPath(input)}`,
            });
        }

        input.value = originalValue;
        return true;
    }

    function checkNameField(input, meta, results) {
        const { type, nameAttr, id, placeholder, labelText } = meta;
        const isNameRelated =
            type.includes("name") ||
            nameAttr.includes("name") ||
            id.includes("name") ||
            placeholder.includes("name") ||
            labelText.includes("name");
        if (!isNameRelated) return false;

        const maxLength = input.maxLength;
        const isInvalid = !(maxLength > 0 && maxLength <= 30);

        results.push({
            elementType: "name",
            id: input.id,
            status: isInvalid ? "fail" : "pass",
            message: isInvalid
                ? "Name field should have maxLength of 30 or less"
                : "Name field has appropriate maxLength",
            details: `Located at: ${getElementPath(input)}`,
        });

        return true;
    }

    function checkPasswordField(input, meta, results) {
        const { type, nameAttr, id, placeholder, labelText } = meta;
        const isPasswordRelated =
            type.includes("password") ||
            nameAttr.includes("password") ||
            id.includes("password") ||
            placeholder.includes("password") ||
            labelText.includes("password");
        if (!isPasswordRelated) return false;

        const maxLength = input.maxLength;
        const isInvalid = !(maxLength > 8 && maxLength <= 20);

        results.push({
            elementType: "password",
            id: input.id,
            status: isInvalid ? "fail" : "pass",
            message: isInvalid
                ? "Password field should have maxLength between 8 and 20"
                : "Password field has appropriate maxLength",
            details: `Located at: ${getElementPath(input)}`,
        });

        return true;
    }

    function checkPhoneField(input, meta, results) {
        const { type, nameAttr, id, placeholder, labelText } = meta;
        const isPhoneRelated =
            type.includes("tel") ||
            nameAttr.includes("phone") ||
            nameAttr.includes("mobile") ||
            id.includes("phone") ||
            id.includes("mobile") ||
            placeholder.includes("phone") ||
            placeholder.includes("mobile") ||
            labelText.includes("phone") ||
            labelText.includes("mobile");
        if (!isPhoneRelated) return false;

        const originalValue = input.value;

        if (input.type !== "number") {
            input.value = "abc123";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));

            const allowsNonNumbers =
                input.value !== "" && (isNaN(input.value) || !input.checkValidity());
            results.push({
                elementType: "phone",
                id: input.id,
                status: allowsNonNumbers ? "fail" : "pass",
                message: allowsNonNumbers
                    ? "Phone field should not accept non-numeric characters"
                    : "Phone field rejected non-numeric characters as expected",
                details: `Located at: ${getElementPath(input)}`,
            });
        }

        input.value = "12345678901";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        results.push({
            elementType: "phone",
            id: input.id,
            status: input.value.length > 10 ? "fail" : "pass",
            message:
                input.value.length > 10
                    ? "Phone field should restrict input to 10 digits"
                    : "Phone field correctly restricts input to 10 digits",
            details: `Located at: ${getElementPath(input)}`,
        });

        input.value = originalValue;
        return true;
    }

    function checkPincodeField(input, meta, results) {
        const { nameAttr, id, placeholder, labelText } = meta;
        const isPincodeRelated =
            nameAttr.includes("pincode") ||
            id.includes("pincode") ||
            placeholder.includes("pincode") ||
            labelText.includes("pincode");
        if (!isPincodeRelated) return false;

        const originalValue = input.value;
        input.value = "2820011";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        results.push({
            elementType: "Pin Code",
            id: input.id,
            status: input.value.length > 6 ? "fail" : "pass",
            message:
                input.value.length > 6
                    ? "Pin code field should restrict input to 6 digits"
                    : "Pin code field correctly restricts to 6 digits",
            details: `Located at: ${getElementPath(input)}`,
        });

        input.value = originalValue;
        return true;
    }

    function checkGstField(input, meta, results) {
        const { nameAttr, id, placeholder, labelText } = meta;
        const isGstRelated =
            nameAttr.includes("gst") ||
            id.includes("gst") ||
            placeholder.includes("gst") ||
            labelText.includes("gst");
        if (!isGstRelated) return false;

        const originalValue = input.value;
        input.value = "gst123456789012345";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        results.push({
            elementType: "GST",
            id: input.id,
            status: input.value.length > 15 ? "fail" : "pass",
            message:
                input.value.length > 15
                    ? "GSTIN field should restrict input to 15 digits"
                    : "GSTIN field correctly restricts to 15 digits",
            details: `Located at: ${getElementPath(input)}`,
        });

        input.value = originalValue;
        return true;
    }

    function checkCouponField(input, meta, results) {
        const { nameAttr, id, placeholder, labelText } = meta;
        const isCouponRelated =
            nameAttr.includes("coupon") ||
            id.includes("coupon") ||
            placeholder.includes("coupon") ||
            labelText.includes("coupon");
        if (!isCouponRelated) return false;

        const originalValue = input.value;
        input.value = "coupon123456789";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        results.push({
            elementType: "Coupon",
            id: input.id,
            status: input.value.length > 10 ? "fail" : "pass",
            message:
                input.value.length > 10
                    ? "Coupon field should restrict input to 10 digits"
                    : "Coupon field correctly restricts to 10 digits",
            details: `Located at: ${getElementPath(input)}`,
        });

        input.value = originalValue;
        return true;
    }

    function getElementPath(element) {
        const tag = element.tagName.toLowerCase();

        if (element.id) {
            return `#${element.id}`;
        } else if (element.classList.length) {
            return `${tag}.${[...element.classList].join(".")}`;
        } else {
            return tag;
        }
    }

    function fakeFill() {
        const inputs = Array.from(document.querySelectorAll("input, textarea, select")).filter(
            (input) => {
                const type = input.type;
                return (
                    !["hidden", "file", "submit"].includes(type) &&
                    !input.disabled &&
                    !input.readOnly &&
                    !input.closest(".dropdown-menu")
                );
            }
        );

        const processedNames = new Set();

        inputs.forEach((input) => {
            const name = input.name?.toLowerCase() || "";
            const id = input.id?.toLowerCase() || "";
            const placeholder = input.placeholder?.toLowerCase() || "";
            const label = document.querySelector(`label[for="${input.id}"]`);
            const labelText = label?.innerText.toLowerCase() || "";

            const identifier = `${name} ${id} ${placeholder} ${labelText}`;

            if (input.tagName === "SELECT") {
                const options = Array.from(input.options);

                if (input.multiple) {
                    const count = Math.min(3, options.length);
                    const indices = getRandomIndices(options.length, count);
                    for (let i = 0; i < options.length; i++) {
                        options[i].selected = indices.includes(i);
                    }
                } else if (options.length > 0) {
                    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
                    options[randomIndex].selected = true;
                }

                input.dispatchEvent(new Event("change", { bubbles: true }));
                return;
            }

            if (
                (input.type === "radio" || input.type === "checkbox") &&
                name &&
                !processedNames.has(name)
            ) {
                const group = Array.from(document.querySelectorAll(`input[name="${name}"]`));
                const selected = getRandomIndices(group.length, input.type === "checkbox" ? 2 : 1);
                group.forEach((el, idx) => {
                    el.checked = selected.includes(idx);
                    el.dispatchEvent(new Event("change", { bubbles: true }));
                });
                processedNames.add(name);
                return;
            }

            if (input.type === "email" || identifier.includes("email")) {
                input.value = "test@example.com";
            } else if (input.type === "password" || identifier.includes("password")) {
                input.value = "Test@1234";
            } else if (
                input.type === "tel" ||
                identifier.includes("phone") ||
                identifier.includes("mobile")
            ) {
                input.value = generateRandomNumber();
            } else if (input.type === "date") {
                input.value = getRandomDate();
            } else if (identifier.includes("name")) {
                input.value = generateRandomPhrase(2);
            } else if (identifier.includes("address")) {
                input.value = generateRandomPhrase();
            } else if (identifier.includes("pincode") || identifier.includes("zip")) {
                input.value = generateRandomNumber(6);
            } else if (
                identifier.includes("location") ||
                identifier.includes("city") ||
                identifier.includes("state")
            ) {
                input.value = generateRandomPhrase(1);
            } else if (
                input.type === "url" ||
                identifier.includes("link") ||
                identifier.includes("website") ||
                identifier.includes("url")
            ) {
                input.value = "https://example.com/";
            } else if (identifier.includes("gst")) {
                input.value = "22AAAAA0000A1Z5";
            } else if (identifier.includes("coupon")) {
                input.value = "COUPON100";
            } else {
                input.value = generateRandomPhrase();
            }

            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
        });
    }

    function generateRandomPhrase(wordCount = Math.floor(Math.random() * (5 - 2 + 1)) + 2) {
        const words = Array.from({ length: wordCount }, () => generateRandomWord(3, 8));
        return words.join(" ");
    }

    function generateRandomWord(minLen, maxLen) {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
        let word = "";
        for (let i = 0; i < length; i++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    function generateRandomNumber(length = 10) {
        const startDigits = ["6", "7", "8", "9"];
        const firstDigit = startDigits[Math.floor(Math.random() * startDigits.length)];
        let number = firstDigit;

        for (let i = 0; i < length - 1; i++) {
            number += Math.floor(Math.random() * 10);
        }

        return number;
    }

    function getRandomDate(startYear = 2010, endYear = new Date().getFullYear()) {
        const start = new Date(`${startYear}-01-01`).getTime();
        const end = new Date(`${endYear}-12-31`).getTime();
        const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
        return new Date(randomTimestamp).toISOString().split("T")[0];
    }

    function getRandomIndices(max, count) {
        const indices = new Set();
        while (indices.size < count && indices.size < max) {
            indices.add(Math.floor(Math.random() * max));
        }
        return Array.from(indices);
    }
})();
