# docly-cli

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/docly-cli/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-%3E%3D16.x-brightgreen.svg)](https://nodejs.org/)

## 📝 Description

`docly-cli` is a powerful command-line interface (CLI) tool designed to streamline the documentation process for any project. With `docly-cli`, you can automatically generate comprehensive and well-structured project documentation with a single, simple command. Say goodbye to manual documentation efforts and keep your project's knowledge base always up-to-date.

## ✨ Features

*   **Automated Documentation Generation:** Effortlessly create complete project documentation from source code, configuration, or predefined templates.
*   **Command-Line Interface (CLI):** Intuitive and easy-to-use commands for generating, updating, and managing your documentation.
*   **Interactive User Experience:** Provides clear feedback and progress indicators during documentation generation using `ora` and `chalk`.
*   **Flexible Configuration:** Supports environment variables for sensitive information and customizable settings via `.env` files.
*   **Robust File System Operations:** Handles complex file and directory structures for reading project files and writing generated documentation with `fs-extra`.
*   **Extensible Architecture:** Built on Node.js, allowing for future integrations and custom documentation generation logic.
*   **External Data Integration:** Potential to fetch documentation templates or data from external sources using `axios`.

## 🚀 Tech Stack

`docly-cli` is built entirely on Node.js, leveraging a set of robust libraries to deliver its functionality.

*   **Backend**:
    *   [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Frontend**: None (This is a CLI tool).
*   **Database**: None
*   **Authentication**: None

### Core Dependencies

*   [`commander`](https://www.npmjs.com/package/commander): For building robust command-line interfaces.
*   [`chalk`](https://www.npmjs.com/package/chalk): For terminal string styling.
*   [`ora`](https://www.npmjs.com/package/ora): Elegant terminal spinner.
*   [`axios`](https://www.npmjs.com/package/axios): Promise-based HTTP client for the browser and node.js.
*   [`dotenv`](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.
*   [`fs-extra`](https://www.npmjs.com/package/fs-extra): Node.js `fs` methods with promises and extra functionality.

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js**: Version `16.x` or higher.
    *   You can download it from [nodejs.org](https://nodejs.org/).
    *   To check your Node.js version:
        ```bash
        node -v
        ```
*   **npm**: Node Package Manager, which comes bundled with Node.js.
    *   To check your npm version:
        ```bash
        npm -v
        ```

## 🛠️ Installation

Follow these steps to get `docly-cli` up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/docly-cli.git
    cd docly-cli
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Link the CLI for local development (optional, but recommended):**
    This allows you to run `docly` commands directly from your terminal, similar to a globally installed package.
    ```bash
    npm link
    ```
    Alternatively, you can install it globally if you intend to use it across multiple projects:
    ```bash
    npm install -g .
    ```

## ⚙️ Environment Variables

`docly-cli` uses `dotenv` to load environment variables from a `.env` file in the project root. While no specific variables are strictly required for basic operation, you might need to configure the following for advanced features or integrations:

Create a file named `.env` in the root of your project and add any necessary variables:

```ini
# Example: API key for an external documentation generation service (e.g., AI-powered summarization)
DOCLY_API_KEY=your_secret_api_key_here

# Example: URL to a custom documentation template repository or API endpoint
DOCLY_TEMPLATE_REPO_URL=https://templates.example.com/docly-templates

# Example: Default output directory for generated documentation
DOCLY_OUTPUT_DIR=./docs
```

Ensure you replace placeholder values with your actual configuration.

## 🚀 Usage

Once installed, you can use `docly-cli` to generate your project documentation.

### Basic Commands

If you used `npm link` or installed globally:

```bash
# Display help information
docly --help

# Initialize docly configuration in your project
docly init

# Generate documentation for your current project
docly generate

# Generate documentation and specify an output directory
docly generate --output ./my-custom-docs
```

If you prefer to run it directly without global installation (e.g., during development):

```bash
# Display help information
node bin/docly --help

# Initialize docly configuration in your project
node bin/docly init

# Generate documentation for your current project
node bin/docly generate
```

### Development Scripts

The `package.json` includes several numbered scripts (`npm run 0` through `npm run 9`). These are typically used for internal development, testing, or specific build steps. To understand their exact purpose, please refer to the `scripts` section in the `package.json` file.

```bash
# Example: Run script '0'
npm run 0

# Example: Run script '5'
npm run 5
```

## 📂 Project Structure

The project follows a modular structure to keep concerns separated and maintainable:

```
.
├── bin/                 # Contains the main executable script for the CLI.
├── docs-olds/           # Archive or deprecated documentation files.
├── scripts/             # Utility scripts (e.g., build, deployment, helper functions).
├── src/                 # Core source code of the docly-cli application.
│   ├── commands/        # Logic for individual CLI commands (init, generate, etc.).
│   ├── utils/           # Helper functions and utilities.
│   └── index.js         # Main entry point for the application logic.
├── test-project/        # A sample project used for testing docly-cli's output and functionality.
├── tests/               # Unit and integration tests for the docly-cli codebase.
├── .env.example         # Example file for environment variables.
├── package.json         # Project metadata and dependencies.
├── package-lock.json    # Exact dependency tree.
└── README.md            # You are here!
```

## 📚 API Documentation

As `docly-cli` is a command-line interface tool, it does not expose a traditional RESTful API for external consumption. Its "API" is its set of commands and options accessible via the terminal.

However, `docly-cli` may *consume* external APIs (e.g., via `axios`) for fetching templates, interacting with AI services for content generation, or integrating with other documentation platforms. Any such integrations would be configured via environment variables or command-line options.

## 🤝 Contributing

We welcome contributions to `docly-cli`! If you're interested in improving the project, please check out our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to submit issues, features, and pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions, support, or feedback, please feel free to:

*   Open an issue on the [GitHub Issues page](https://github.com/your-username/docly-cli/issues).
*   Reach out to the maintainer via email at [your.email@example.com](mailto:your.email@example.com).