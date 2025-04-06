# 🌐 DOM Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A powerful Chrome extension for developers to explore, validate and test DOM elements in real-time.

![Extension Preview](./public/icons/icon-128.png)

## ✨ Features

-   🔍 Automatic DOM element detection
-   🧪 One-click validation testing
-   📝 Smart dummy data generation
-   🎯 Support for custom UI components
-   ⚡ Lightning-fast performance

## 🚀 Getting Started

Follow these steps to clone and load the extension in Chrome:

### 1. Clone the Repository

```bash
git clone https://github.com/krishna-singhal/dom-explorer.git
cd dom-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Extension

```bash
npm run build
```

### 4. Load the Extension in Chrome

1. Open Chrome and navigate to:

    ```bash
    chrome://extensions/
    ```

2. Enable "Developer mode" (toggle in top right corner)
3. Click "Load unpacked"
4. Select the dist folder generated by the build process

### 5. Using the Extension

1. Pin the extension to your toolbar by clicking the puzzle icon (Extensions menu)
2. Click the DOM Explorer icon when on any webpage to activate
3. Use the popup interface to explore and test DOM elements

## 🛠 Tech Stack

| Component     | Technology   |
| ------------- | ------------ |
| Frontend      | React 19     |
| Styling       | Tailwind CSS |
| Build Tool    | Vite         |
| UI Components | Radix UI     |
| Icons         | Lucide       |

## 📂 Project Structure

```text
📦 dom-explorer/
 ┣ dist/                  → Production build output (auto-generated)
 ┣ 📂public/
 ┃ ┣ 📁icons/             → Extension icons (16, 48, 128)
 ┃ ┣ 📄manifest.json      → Extension config
 ┣ 📂src/
 ┃ ┣ 📄App.jsx            → Popup UI
 ┃ ┣ 📄content-script.js  → DOM logic runs on every page
 ┣ 📄webpack.config.js    → Bundles content-script
 ┣ 📄tailwind.config.js
 ┣ 📄vite.config.js
```

## 🤝 Contributing

We welcome contributions through GitHub Pull Requests! Here's how:

1. Fork the repository
2. Make your improvements directly in your fork
3. Submit a Pull Request with:
    - Description of changes
    - Screenshots (if applicable)
    - Reference to related issues

We'll review your PR and may suggest improvements before merging.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Project Link: [https://github.com/krishna-singhal/dom-explorer](https://github.com/krishna-singhal/dom-explorer)
