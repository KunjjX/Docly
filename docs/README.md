# docly-cli

[![npm version](https://img.shields.io/npm/v/docly-cli?style=flat-square)](https://www.npmjs.com/package/docly-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg?style=flat-square)](https://nodejs.org/en/)

## 🚀 Automatically generate complete project documentation with a single command!

Docly CLI is an **AI-powered command-line interface (CLI) tool** designed to drastically simplify and speed up your documentation process. With just a single command, Docly leverages the power of Google Gemini AI to analyze your project and generate comprehensive, high-quality documentation, including READMEs, SRS, architecture overviews, workflow diagrams, and test cases.

Say goodbye to manual documentation drudgery and hello to instant, intelligent insights into your codebase!

## ✨ Features

*   **AI-Powered Generation**: Utilizes the advanced capabilities of the Google Gemini AI (specifically `gemini-1.5-flash`) to understand your project and generate relevant documentation.
*   **Multiple Documentation Types**: Generate various essential project documents:
    *   `README.md`: Project overview, setup, and usage instructions.
    *   `SRS`: Software Requirements Specification.
    *   `Architecture`: High-level system architecture documentation.
    *   `Workflow`: Detailed project workflows and processes.
    *   `Test Cases`: Comprehensive test case scenarios.
*   **Simple CLI Commands**: Intuitive and easy-to-use commands for generating specific documentation types.
*   **Configurable via `.env`**: Customize AI settings and API keys using a simple `.env` file.
*   **Supports Node.js Projects**: Designed to analyze and document any Node.js project structure effectively.

## 🛠️ Technology Stack

Docly CLI is a **pure command-line interface application**. It has no frontend, no database, and runs entirely in your terminal.

*   **Runtime**: Node.js
*   **AI Provider**: Google Gemini API (`gemini-1.5-flash` model)
*   **CLI Framework**: [commander.js](https://www.npmjs.com/package/commander)
*   **HTTP Client**: [axios](https://www.npmjs.com/package/axios)
*   **Terminal Styling**: [chalk](https://www.npmjs.com/package/chalk)
*   **Loading Indicators**: [ora](https://www.npmjs.com/package/ora)
*   **File Operations**: [fs-extra](https://www.npmjs.com/package/fs-extra)
*   **Environment Variables**: [dotenv](https://www.npmjs.com/package/dotenv)

## 🚦 Prerequisites

Before you can use Docly CLI, ensure you have the following installed and configured:

*   **Node.js**: Version 16 or higher.
    ```bash
    node -v
    ```
*   **Google Gemini API Key**: A valid API key from Google AI Studio. You'll need to set this as an environment variable.

## 📦 Installation

You can install Docly CLI globally for easy access from any directory, or locally within your project.

### Global Installation

This is the recommended way to use Docly CLI.

```bash
npm install -g docly-cli
```

After global installation, you can run `docly` commands from anywhere.

### Local Installation (within a project)

If you prefer to install it as a development dependency for a specific project:

```bash
npm install --save-dev docly-cli
```

When installed locally, you'll need to use `npx` to execute the commands:

```bash
npx docly readme
```

## 🔑 Environment Variables

Docly CLI requires a Google Gemini API key to function. Create a `.env` file in the root of your project (or in the directory where you run `docly`) and add the following:

```dotenv
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
# Optional: Specify AI provider (defaults to 'gemini')
# AI_PROVIDER=gemini
```

Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key.

### Getting Your Gemini API Key

You can obtain a Google Gemini API key by visiting the Google AI Studio:

👉 [**Get your API Key from Google AI Studio**](https://aistudio.google.com/app/apikey)

## 🚀 Usage

Navigate to the root directory of your Node.js project in your terminal and run the `docly` command followed by the desired documentation type.

**Important**: Ensure your `GEMINI_API_KEY` is set in a `.env` file in your project root or as a system environment variable.

### Generate README.md

```bash
docly readme
# To overwrite an existing README.md
docly readme --overwrite
```

### Generate Software Requirements Specification (SRS)

```bash
docly srs
# To overwrite an existing SRS document
docly srs --overwrite
```

### Generate Architecture Documentation

```bash
docly architecture
# To overwrite existing architecture documentation
docly architecture --overwrite
```

### Generate Workflow Documentation

```bash
docly workflow
# To overwrite existing workflow documentation
docly workflow --overwrite
```

### Generate Test Cases Documentation

```bash
docly testcases
# To overwrite existing test cases documentation
docly testcases --overwrite
```

### Using with `npx` (for local installations)

```bash
npx docly readme
npx docly srs --overwrite
# etc.
```

## 📂 Project Structure

The Docly CLI project itself is structured as follows:

```
docly-cli/
├── bin/                 # Executable scripts for the CLI
├── docs/                # Generated documentation by Docly CLI (for this project)
├── docs-olds/           # Backup of older generated documentation
├── scripts/             # Utility scripts for development/maintenance
├── src/                 # Core source code of the CLI tool
│   ├── commands/        # Defines individual CLI commands (e.g., readme, srs)
│   ├── api/             # Handles communication with the Google Gemini API
│   ├── utils/           # Helper functions
│   ├── templates/       # Prompt templates for different documentation types
│   └── index.js         # Main entry point for the CLI logic
├── test-project/        # A sample project used for testing Docly's generation
├── tests/               # Unit and integration tests for Docly CLI
├── .env.example         # Example environment variables file
├── package.json         # Project metadata and dependencies
└── README.md            # This file
```

## 🧠 How It Works

Docly CLI operates through a series of intelligent steps:

1.  **Project Analysis**: When a command is run, Docly recursively scans your project directory, identifying key files, folders, and technologies used (e.g., `package.json`, source code files, configuration).
2.  **Contextual Prompt Building**: Based on the project analysis and the desired documentation type (e.g., README, SRS), Docly constructs a highly detailed and contextual prompt for the AI. This prompt includes snippets of your code, file structure, and project metadata.
3.  **AI Interaction**: The constructed prompt is sent to the Google Gemini API. The `gemini-1.5-flash` model processes this information and generates the requested documentation.
4.  **Output Formatting & Saving**: The AI's response is received, formatted for readability, and then saved into the appropriate file (e.g., `README.md`, `docs/SRS.md`) within your project directory.

## 🤝 Contributing

We welcome contributions to Docly CLI! If you have suggestions, bug reports, or want to contribute code, please refer to our `CONTRIBUTING.md` guide.

➡️ [**CONTRIBUTING.md**](CONTRIBUTING.md)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## ✉️ Contact

For any questions, issues, or feedback, please open an issue on our GitHub repository:

➡️ [**GitHub Issues**](https://github.com/your-username/docly-cli/issues) (Replace `your-username/docly-cli` with the actual repo URL)