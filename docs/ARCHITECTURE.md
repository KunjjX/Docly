This document outlines the architectural design of `docly-cli`, a Node.js command-line interface (CLI) tool designed to generate various documentation types by leveraging AI capabilities.

---

## 1. High-Level Architecture

The `docly-cli` operates entirely on the user's local machine, interacting with the local file system and an external AI API. It does not involve any server-side components, databases, or user authentication.

```mermaid
graph TD
    subgraph User Interaction
        User[User]
    end

    subgraph CLI Application (Local Machine)
        A[CLI Entry Point (commander.js)]
        B[Commands Layer]
        C[Core Layer: runGenerator.js]
        D[Core Layer: analyzer.js]
        E[Core Layer: generator.js]
        F[Templates Layer]
        G[API Client Layer]
        H[Utils Layer: File Ops]
        I[Utils Layer: .env Loader]
    end

    subgraph External Services
        J[Google Gemini API]
    end

    subgraph Local Resources
        K[Local File System (Project Files)]
        L[Local File System (Generated Docs)]
        M[.env Configuration]
    end

    User --> A
    A --> B: Command Parsing & Dispatch
    B --> C: Initiate Generation (Doc Type, Path)

    C --> D: Request Project Analysis
    D --> H: Read Project Files
    H --> K: Access Project Files

    C --> E: Orchestrate Doc Generation
    E --> F: Retrieve Prompt Templates
    E --> G: Make AI API Call (Prompt)

    I --> A: Load API Key / Config
    I --> G: Provide API Key

    G --> J: Send Prompt Request
    J --> G: AI Response (Generated Text)

    G --> E: Return Generated Text
    E --> C: Return Generated Text

    C --> H: Write Generated Docs
    H --> L: Save Docs to File System
```

**Flow Summary:**
1.  **User** executes a `docly` command.
2.  The **CLI Entry Point** parses the command using `commander.js`.
3.  The **Commands Layer** handles the specific command, delegating to `runGenerator.js`.
4.  `runGenerator.js` orchestrates the process:
    *   It uses `analyzer.js` to read **Local Project Files** (via **Utils Layer: File Ops**) to understand the project context.
    *   It uses `generator.js` to build AI prompts (using **Templates Layer**) and send them to the **Google Gemini API** (via **API Client Layer**).
    *   **API Client Layer** uses environment variables loaded by **Utils Layer: .env Loader** to authenticate with the API.
    *   Upon receiving the AI's response, `runGenerator.js` uses **Utils Layer: File Ops** to write the generated documentation to the **Local File System**.

---

## 2. Component Breakdown

This section details the purpose, key files, responsibilities, and dependencies for each architectural layer.

### 2.1. CLI Entry Point
*   **Purpose**: The primary entry point for the `docly-cli` application, responsible for initializing the command-line interface.
*   **Key Files**: `bin/index.js`
*   **Responsibilities**:
    *   Parse command-line arguments provided by the user.
    *   Define the available top-level commands (e.g., `readme`, `srs`).
    *   Display help information and versioning.
    *   Dispatch control to the appropriate command handlers.
*   **Dependencies**: `commander.js`, `src/commands/index.js`

### 2.2. Commands Layer
*   **Purpose**: To define and manage the specific actions or documentation types that `docly-cli` can generate.
*   **Key Files**: `src/commands/index.js` (and potentially individual command files like `src/commands/readme.js`, etc.)
*   **Responsibilities**:
    *   Implement handlers for each command (e.g., `readme`, `srs`, `architecture`).
    *   Validate command-specific options and arguments.
    *   Translate user commands into calls to the core generation logic (`runGenerator`).
    *   Provide user feedback using CLI styling utilities.
*   **Dependencies**: `src/core/runGenerator.js`, `chalk`, `ora`

### 2.3. Core Layer
*   **Purpose**: The central orchestration and logic hub for generating documentation. It coordinates project analysis, prompt construction, and AI interaction.
*   **Key Files**:
    *   `src/core/runGenerator.js`
    *   `src/core/analyzer.js`
    *   `src/core/generator.js`
*   **Responsibilities**:
    *   **`runGenerator.js`**: Main orchestrator. It ties together the analysis, generation, and file writing steps. Manages the overall flow from command invocation to output.
    *   **`analyzer.js`**: Scans the user's project directory, identifies relevant files and folders, extracts metadata, code snippets, and structural information pertinent to the documentation type.
    *   **`generator.js`**: Constructs detailed AI prompts based on the project analysis and specific document templates. It sends these prompts to the AI API and processes the AI's response.
*   **Dependencies**: `src/templates/index.js`, `src/api/client.js`, `src/utils/file.js`, `src/utils/logger.js`

### 2.4. Templates Layer
*   **Purpose**: To define the structured prompts and contextual instructions for the AI model for different types of documentation.
*   **Key Files**: `src/templates/index.js` (and potentially sub-files for each doc type)
*   **Responsibilities**:
    *   Provide pre-defined prompt structures and instructions for generating READMEs, SRS documents, architecture descriptions, etc.
    *   Incorporate placeholders for dynamically injected project context.
    *   Guide the AI on the desired tone, format, and content scope for each document type.
*   **Dependencies**: Consumed by `src/core/generator.js`.

### 2.5. API Client Layer
*   **Purpose**: To abstract all interactions with the external Google Gemini API.
*   **Key Files**: `src/api/client.js`
*   **Responsibilities**:
    *   Manage API key securely (retrieved via Utils Layer).
    *   Construct and send HTTP requests to the Gemini API endpoints.
    *   Implement robust error handling, including retry mechanisms for transient network issues.
    *   Parse and normalize responses from the AI API.
*   **Dependencies**: `axios`, `src/utils/env.js`, `src/utils/logger.js`

### 2.6. Utils Layer
*   **Purpose**: To provide common, reusable utility functions across the application, promoting modularity and reducing code duplication.
*   **Key Files**:
    *   `src/utils/file.js`
    *   `src/utils/env.js`
    *   `src/utils/logger.js`
*   **Responsibilities**:
    *   **`file.js`**: Perform file system operations (reading files, writing files, checking directory existence, path manipulation, etc.).
    *   **`env.js`**: Load and provide environment variables from `.env` files, ensuring sensitive data like API keys are handled correctly.
    *   **`logger.js`**: Provide standardized logging functionalities (info, warn, error) for debugging and user feedback.
*   **Dependencies**: `fs-extra`, `dotenv` (implicitly for env loading).

---

## 3. Data Flow

The following describes the end-to-end data flow within `docly-cli` for a typical documentation generation request:

1.  **Command Execution**:
    *   The **User** invokes `docly <command> [options]` in their terminal.
    *   The **CLI Entry Point** (`bin/index.js`) uses `commander.js` to parse the command and its arguments.
    *   Control is passed to the relevant handler in the **Commands Layer** (e.g., `src/commands/readme.js`).

2.  **Initiate Generation**:
    *   The command handler in the **Commands Layer** validates the input (e.g., project path, output file).
    *   It then calls `src/core/runGenerator.js`, passing the desired documentation type (e.g., "readme") and any specific options.

3.  **Project Analysis**:
    *   `runGenerator.js` invokes `src/core/analyzer.js`.
    *   `analyzer.js` utilizes file system utilities from the **Utils Layer** (`src/utils/file.js`) to:
        *   Traverse the specified project directory.
        *   Read relevant project files (e.g., `package.json`, source code files, configuration files).
        *   Extract project structure, dependencies, and potentially code snippets.
    *   The result is a structured `projectContext` object, which is returned to `runGenerator.js`.

4.  **Prompt Building**:
    *   `runGenerator.js` passes the `projectContext` and the documentation type to `src/core/generator.js`.
    *   `generator.js` retrieves the appropriate prompt template for the given documentation type from the **Templates Layer** (`src/templates/index.js`).
    *   It then dynamically populates the template with data from the `projectContext` to construct a comprehensive and context-rich prompt for the AI model.

5.  **AI API Call**:
    *   `generator.js` sends the crafted prompt to the **API Client Layer** (`src/api/client.js`).
    *   The `API Client Layer` retrieves the Google Gemini API key using the environment loading utility from the **Utils Layer** (`src/utils/env.js`).
    *   Using `axios`, it constructs and sends an HTTP POST request containing the prompt to the Google Gemini API.
    *   It handles network errors, API-specific errors, and retry logic.

6.  **Response Handling**:
    *   The Google Gemini API processes the prompt and returns the generated documentation text.
    *   The **API Client Layer** receives this response, extracts the generated text, and returns it to `generator.js`.
    *   `generator.js` passes the raw generated content back to `runGenerator.js`.

7.  **File Writing**:
    *   `runGenerator.js` receives the generated documentation text.
    *   It uses file writing utilities from the **Utils Layer** (`src/utils/file.js`) to save this content to the specified output file in the user's local file system.
    *   Finally, the **Commands Layer** provides user feedback (e.g., "Documentation generated successfully!").

---

## 4. Technology Stack

`docly-cli` is built using the following technologies:

*   **Runtime**: Node.js
*   **CLI Framework**: commander.js
*   **HTTP Client**: axios
*   **AI Integration**: Google Gemini API
*   **File System Operations**: fs-extra
*   **User Interface/Styling**: chalk, ora

---

## 5. Dependencies

Key npm packages used in `docly-cli` and their purposes:

*   **`commander.js`**: A powerful framework for building command-line interfaces in Node.js, used for parsing arguments, defining commands, and generating help text.
*   **`axios`**: A promise-based HTTP client for the browser and Node.js, used for making API requests to the Google Gemini service.
*   **`fs-extra`**: Provides additional file system methods beyond the native `fs` module, making file operations like reading, writing, copying, and deleting files/directories easier.
*   **`chalk`**: A library for styling terminal output with colors and backgrounds, enhancing the user experience of the CLI.
*   **`ora`**: A library for displaying elegant terminal spinners, providing visual feedback to the user during long-running operations like AI API calls.
*   **`dotenv`** (implied for `.env` loading): A zero-dependency module that loads environment variables from a `.env` file into `process.env`.