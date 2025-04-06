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
