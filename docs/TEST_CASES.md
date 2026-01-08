## Docly CLI Test Cases Documentation

**Project:** Docly CLI
**Description:** A command-line interface tool for generating documentation (README, SRS, Architecture, Workflow, Test Cases) using AI.
**Tech Stack:** Node.js CLI

---

### 1. Unit Tests

**Purpose:** To test individual functions and components in isolation, ensuring their correctness and adherence to specifications.

---

#### 1.1 Project Analyzer Tests (src/core/analyzer.js)

**Component:** `analyzeProject` function

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-PA-001 | Analyze an empty directory. | An empty directory named `test-empty-project`. | 1. Call `analyzeProject` with the path to `test-empty-project`. | Returns an object with `files` and `directories` arrays being empty. `packageJson` should be null. | `To Do` |
| UT-PA-002 | Analyze a directory with common files (package.json, src, tests). | A directory `test-common-project` containing `package.json`, `src/index.js`, `tests/test.js`. | 1. Call `analyzeProject` with the path to `test-common-project`. | Returns an object with `packageJson` containing parsed data, and `files`/`directories` arrays reflecting the structure. | `To Do` |
| UT-PA-003 | Analyze a directory ignoring specified files/patterns. | A directory `test-ignore-project` containing `node_modules/dep.js`, `.env`, `src/index.js`. Analyzer configured to ignore `node_modules` and `.env`. | 1. Call `analyzeProject` with the path to `test-ignore-project` and appropriate ignore patterns. | The `files` and `directories` arrays should not include `node_modules` or `.env`. `src/index.js` should be present. | `To Do` |
| UT-PA-004 | Analyze a project with specific file types (e.g., .ts, .py). | A directory `test-multi-lang-project` containing `src/main.ts`, `scripts/script.py`. | 1. Call `analyzeProject` with the path to `test-multi-lang-project`. | The `files` array should correctly list `main.ts` and `script.py` with their respective extensions. | `To Do` |
| UT-PA-005 | Handle non-existent project path. | None. | 1. Call `analyzeProject` with a non-existent path like `/tmp/non_existent_project_123`. | Throws an error indicating the path does not exist or is not a directory. | `To Do` |

#### 1.2 Prompt Building Tests (src/templates/index.js)

**Component:** `buildPrompt` function (or similar template generation logic)

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-PB-001 | Build README prompt with basic project data. | Mock project data (small `package.json`, a few files). | 1. Call `buildPrompt('readme', mockProjectData)`. | Returns a string containing Markdown instructions for a README, incorporating data like project name, description, and file list. | `To Do` |
| UT-PB-002 | Build SRS prompt with detailed project data. | Mock project data (detailed `package.json`, function signatures from `src` files). | 1. Call `buildPrompt('srs', mockProjectData)`. | Returns a string containing instructions for an SRS, referencing functional requirements and system components. | `To Do` |
| UT-PB-003 | Build Architecture prompt. | Mock project data including file structure and dependencies. | 1. Call `buildPrompt('architecture', mockProjectData)`. | Returns a string tailored for generating an architecture document, requesting high-level design and component interaction. | `To Do` |
| UT-PB-004 | Build Workflow prompt. | Mock project data. | 1. Call `buildPrompt('workflow', mockProjectData)`. | Returns a string tailored for generating a workflow document, requesting process flows or data flow diagrams. | `To Do` |
| UT-PB-005 | Build Test Cases prompt. | Mock project data with function definitions. | 1. Call `buildPrompt('testcases', mockProjectData)`. | Returns a string tailored for generating test cases, referencing specific functions or features for testing. | `To Do` |
| UT-PB-006 | Handle missing project data gracefully. | None. | 1. Call `buildPrompt('readme', {})`. | Returns a prompt, possibly with placeholders or indicating minimal information available, without crashing. | `To Do` |

#### 1.3 Config Loading Tests (.env and CLI options)

**Component:** Configuration loading logic (e.g., in `src/config.js` or main CLI file)

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-CL-001 | Load API key from `.env` file. | A `.env` file in the project root with `GEMINI_API_KEY=test_api_key_env`. | 1. Call config loading function. | The `GEMINI_API_KEY` in the loaded config object should be `test_api_key_env`. | `To Do` |
| UT-CL-002 | CLI argument overrides `.env` variable. | A `.env` file with `GEMINI_API_KEY=env_key`. CLI argument `--api-key cli_key`. | 1. Call config loading function with mock CLI args. | The `GEMINI_API_KEY` in the loaded config object should be `cli_key`. | `To Do` |
| UT-CL-003 | Handle missing `.env` file. | No `.env` file present. | 1. Call config loading function. | No error should be thrown, and `GEMINI_API_KEY` should be `undefined` (or default null) if not set elsewhere. | `To Do` |
| UT-CL-004 | Load other configuration options (e.g., `--output`) | CLI argument `--output custom_output.md`. | 1. Call config loading function with mock CLI args. | The `output` property in the loaded config object should be `custom_output.md`. | `To Do` |

#### 1.4 File Utilities Tests (src/core/runGenerator.js - file writing part)

**Component:** File writing utility function (e.g., `writeFile` or `outputFile`)

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-FU-001 | Write content to a new file. | A non-existent file path: `temp/new_file.md`. | 1. Call file writing utility with `temp/new_file.md` and content `Hello World`. | File `temp/new_file.md` is created and contains `Hello World`. | `To Do` |
| UT-FU-002 | Overwrite an existing file without `--overwrite` flag. | An existing file `temp/existing_file.md` with content `Original`. | 1. Call file writing utility with `temp/existing_file.md`, new content `New Content`, and `overwrite=false`. | Throws an error (e.g., `FileAlreadyExistsError`) or returns `false` indicating no write occurred. File content remains `Original`. | `To Do` |
| UT-FU-003 | Overwrite an existing file with `--overwrite` flag. | An existing file `temp/existing_file.md` with content `Original`. | 1. Call file writing utility with `temp/existing_file.md`, new content `New Content`, and `overwrite=true`. | File `temp/existing_file.md` is updated and contains `New Content`. | `To Do` |
| UT-FU-004 | Write to an invalid directory path. | An invalid path like `/nonexistent_dir/file.md`. | 1. Call file writing utility with `/nonexistent_dir/file.md` and some content. | Throws an error (e.g., `ENOENT: no such file or directory`). | `To Do` |

#### 1.5 Logger Tests (src/utils/logger.js)

**Component:** `logger` utility

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-LG-001 | Log an info message. | Mock `console.log` to capture output. | 1. Call `logger.info('This is an info message.')`. | `console.log` is called once with a string containing `[INFO]` and the message. | `To Do` |
| UT-LG-002 | Log an error message. | Mock `console.error` to capture output. | 1. Call `logger.error('This is an error message.')`. | `console.error` is called once with a string containing `[ERROR]` and the message. | `To Do` |
| UT-LG-003 | Log a warning message. | Mock `console.warn` to capture output. | 1. Call `logger.warn('This is a warning message.')`. | `console.warn` is called once with a string containing `[WARN]` and the message. | `To Do` |
| UT-LG-004 | Log a debug message (if debug mode enabled). | Mock `console.debug` (or `console.log`) and set debug mode to true. | 1. Call `logger.debug('This is a debug message.')`. | `console.debug` (or `console.log`) is called once with a string containing `[DEBUG]` and the message. | `To Do` |
| UT-LG-005 | Debug message not logged (if debug mode disabled). | Mock `console.debug` (or `console.log`) and set debug mode to false. | 1. Call `logger.debug('This should not be logged.')`. | `console.debug` (or `console.log`) is not called. | `To Do` |

#### 1.6 Validator Tests (src/utils/validator.js)

**Component:** Validation functions (e.g., `validateApiKey`)

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| UT-VL-001 | Validate a valid API key. | A string `VALID_API_KEY_123`. | 1. Call `validateApiKey('VALID_API_KEY_123')`. | Returns `true` (or no error thrown). | `To Do` |
| UT-VL-002 | Validate an empty API key. | An empty string `''`. | 1. Call `validateApiKey('')`. | Throws an error (e.g., `ValidationError: API key cannot be empty`). | `To Do` |
| UT-VL-003 | Validate a `null` API key. | `null`. | 1. Call `validateApiKey(null)`. | Throws an error (e.g., `ValidationError: API key is missing`). | `To Do` |
| UT-VL-004 | Validate an `undefined` API key. | `undefined`. | 1. Call `validateApiKey(undefined)`. | Throws an error (e.g., `ValidationError: API key is missing`). | `To Do` |

---

### 2. Integration Tests

**Purpose:** To test the interaction between different modules and components, ensuring they work together as expected.

---

#### 2.1 Command Execution (CLI parsing) Tests

**Components:** `commander.js` and initial CLI setup

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| IT-CE-001 | Execute `docly --help`. | Docly CLI installed and accessible. | 1. Run `docly --help` in the terminal. | Displays the general help message for Docly CLI, listing available commands and global options. | `To Do` |
| IT-CE-002 | Execute `docly readme --help`. | Docly CLI installed and accessible. | 1. Run `docly readme --help` in the terminal. | Displays the help message specific to the `readme` command, listing its options. | `To Do` |
| IT-CE-003 | Execute an unknown command. | Docly CLI installed. | 1. Run `docly unknown-command` in the terminal. | Exits with an error message indicating an unknown command and suggests `docly --help`. | `To Do` |
| IT-CE-004 | Pass an invalid option to a command. | Docly CLI installed. | 1. Run `docly readme --invalid-option`. | Exits with an error message indicating an unknown option for the `readme` command. | `To Do` |

#### 2.2 API Client with Mock Responses Tests (src/api/client.js)

**Components:** `GeminiApiClient` with mocked network calls

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| IT-AC-001 | Successful API call. | Mock the Gemini API to return a successful response (e.g., `200 OK` with `text: "Generated content"`). Valid API key. | 1. Instantiate `GeminiApiClient`. 2. Call `generateContent(prompt)`. | Returns the mocked `text` content. No errors are thrown. | `To Do` |
| IT-AC-002 | API call with network error (e.g., no internet). | Mock the Gemini API to throw a network-related error. Valid API key. | 1. Instantiate `GeminiApiClient`. 2. Call `generateContent(prompt)`. | Throws a `NetworkError` or similar custom error indicating connection issues. | `To Do` |
| IT-AC-003 | API call with invalid API key (401/403). | Mock the Gemini API to return a `401 Unauthorized` or `403 Forbidden` status. Invalid API key. | 1. Instantiate `GeminiApiClient` with the invalid key. 2. Call `generateContent(prompt)`. | Throws an `AuthenticationError` or similar custom error. | `To Do` |
| IT-AC-004 | API call with rate limit exceeded (429). | Mock the Gemini API to return a `429 Too Many Requests` status. Valid API key. | 1. Instantiate `GeminiApiClient`. 2. Call `generateContent(prompt)`. | Throws a `RateLimitError` or similar custom error. | `To Do` |
| IT-AC-005 | API call with internal server error (500). | Mock the Gemini API to return a `500 Internal Server Error` status. Valid API key. | 1. Instantiate `GeminiApiClient`. 2. Call `generateContent(prompt)`. | Throws a `ServerError` or similar custom error. | `To Do` |

#### 2.3 File System Operations (integrated with mock AI)

**Components:** `runGenerator.js`, file utilities, and mocked AI response

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| IT-FS-001 | Generate a new file with mock AI content. | Mock the AI client to return "Mock README content". Clean test directory. | 1. Simulate `docly readme` execution, using mocked AI. 2. Specify output path `temp/README.md`. | File `temp/README.md` is created and contains "Mock README content". | `To Do` |
| IT-FS-002 | Attempt to overwrite existing file without `--overwrite`. | Existing file `temp/README.md` with "Original content". Mock AI client returns "New content". | 1. Simulate `docly readme` execution (without `--overwrite`), using mocked AI. 2. Specify output path `temp/README.md`. | An error message is logged to console indicating file already exists. `temp/README.md` still contains "Original content". | `To Do` |
| IT-FS-003 | Overwrite existing file with `--overwrite`. | Existing file `temp/README.md` with "Original content". Mock AI client returns "New content". | 1. Simulate `docly readme --overwrite` execution, using mocked AI. 2. Specify output path `temp/README.md`. | File `temp/README.md` is updated and contains "New content". | `To Do` |

#### 2.4 Environment Variable Loading (integrated with CLI)

**Components:** `commander.js`, `.env` loading, and config module

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| IT-EV-001 | CLI uses API key from `.env` file. | A `.env` file with `GEMINI_API_KEY=env_api_key`. Mock AI client to check for this key. | 1. Run `docly readme` in a clean environment (no CLI `--api-key`). | The mocked AI client receives `env_api_key`. The command attempts to generate content. | `To Do` |
| IT-EV-002 | CLI `--api-key` overrides `.env` key. | A `.env` file with `GEMINI_API_KEY=env_api_key`. Mock AI client to check for the CLI key. | 1. Run `docly readme --api-key cli_api_key`. | The mocked AI client receives `cli_api_key`. The command attempts to generate content. | `To Do` |
| IT-EV-003 | Missing API key (neither .env nor CLI). | No `.env` file. No `--api-key` CLI option. | 1. Run `docly readme`. | The command exits with an error message about a missing API key. | `To Do` |

---

### 3. End-to-End Tests

**Purpose:** To simulate real-world user scenarios, executing the full Docly CLI workflow from command input to file output, including error handling and edge cases.

---

#### 3.1 Complete Command Execution & Output File Verification

**Scenario:** Generate various documentation types for a sample project.

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| E2E-001 | Generate `README.md` for a sample project. | 1. A small, simple Node.js sample project (e.g., a "hello world" express app) in a `test-project` directory. 2. Valid `GEMINI_API_KEY` set in `.env` or as env var. 3. No `README.md` in `test-project`. | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. `README.md` is created in `test-project`. 2. The file contains valid Markdown. 3. The content is relevant to the sample project (e.g., project name, description, how to run). | `To Do` |
| E2E-002 | Generate `SRS.md` for a sample project. | 1. The same `test-project` as E2E-001. 2. Valid `GEMINI_API_KEY`. 3. No `SRS.md` in `test-project`. | 1. Navigate to `test-project`. 2. Run `docly srs`. | 1. `SRS.md` is created in `test-project`. 2. The file contains valid Markdown. 3. The content outlines functional/non-functional requirements or system behavior relevant to the project. | `To Do` |
| E2E-003 | Generate `ARCHITECTURE.md` for a sample project. | 1. The same `test-project` as E2E-001. 2. Valid `GEMINI_API_KEY`. 3. No `ARCHITECTURE.md` in `test-project`. | 1. Navigate to `test-project`. 2. Run `docly architecture`. | 1. `ARCHITECTURE.md` is created in `test-project`. 2. The file contains valid Markdown. 3. The content describes the project's high-level design, components, and their interactions. | `To Do` |
| E2E-004 | Generate `WORKFLOW.md` for a sample project. | 1. The same `test-project` as E2E-001. 2. Valid `GEMINI_API_KEY`. 3. No `WORKFLOW.md` in `test-project`. | 1. Navigate to `test-project`. 2. Run `docly workflow`. | 1. `WORKFLOW.md` is created in `test-project`. 2. The file contains valid Markdown. 3. The content describes typical operational flows or data processing steps within the project. | `To Do` |
| E2E-005 | Generate `TEST_CASES.md` for a sample project. | 1. The same `test-project` as E2E-001. 2. Valid `GEMINI_API_KEY`. 3. No `TEST_CASES.md` in `test-project`. | 1. Navigate to `test-project`. 2. Run `docly testcases`. | 1. `TEST_CASES.md` is created in `test-project`. 2. The file contains valid Markdown. 3. The content lists potential test cases or scenarios relevant to the project's functionality. | `To Do` |

#### 3.2 Error Handling

**Scenario:** Verify robust error handling for common issues.

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| E2E-EH-001 | Missing API key (no .env, no CLI option). | 1. A `test-project` directory. 2. Ensure `GEMINI_API_KEY` is NOT set in `.env` or as an environment variable. | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The command exits with a non-zero status code. 2. An error message is printed to `stderr` clearly stating that the `GEMINI_API_KEY` is missing and how to set it. 3. No `README.md` file is created. | `To Do` |
| E2E-EH-002 | Invalid API key (API returns 401/403). | 1. A `test-project` directory. 2. Set an intentionally invalid `GEMINI_API_KEY` (e.g., a random string or known invalid key). | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The command exits with a non-zero status code. 2. An error message is printed to `stderr` indicating an authentication failure or invalid API key. 3. No `README.md` file is created. | `To Do` |
| E2E-EH-003 | Project analysis failure (e.g., permissions). | 1. A `test-project` directory where the user running the CLI has no read permissions. 2. Valid `GEMINI_API_KEY`. | 1. Navigate to the parent of `test-project`. 2. Run `docly readme --path test-project`. | 1. The command exits with a non-zero status code. 2. An error message is printed to `stderr` indicating a permission error or inability to read the project directory. 3. No `README.md` file is created. | `To Do` |

#### 3.3 Retry Logic on API Failures

**Scenario:** Verify the CLI handles transient API errors gracefully with retries.

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| E2E-RL-001 | API returns 500 (Internal Server Error) then succeeds on retry. | 1. A `test-project` directory. 2. Valid `GEMINI_API_KEY`. 3. **Mock the Gemini API to respond with `500 Internal Server Error` on the first call, then `200 OK` with content on subsequent calls.** | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The CLI attempts the API call, encounters the 500 error, logs a retry attempt. 2. The CLI retries, the API succeeds, and `README.md` is created with the generated content. 3. No fatal error is reported to the user unless all retries fail. | `To Do` |
| E2E-RL-002 | API returns 429 (Rate Limit Exceeded) then succeeds on retry. | 1. A `test-project` directory. 2. Valid `GEMINI_API_KEY`. 3. **Mock the Gemini API to respond with `429 Too Many Requests` on the first call, then `200 OK` with content on subsequent calls.** | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The CLI attempts the API call, encounters the 429 error, logs a retry attempt (possibly with a delay). 2. The CLI retries, the API succeeds, and `README.md` is created with the generated content. 3. No fatal error is reported to the user unless all retries fail. | `To Do` |
| E2E-RL-003 | API consistently fails after all retries. | 1. A `test-project` directory. 2. Valid `GEMINI_API_KEY`. 3. **Mock the Gemini API to consistently respond with `500 Internal Server Error` (or `429`) for all configured retry attempts.** | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The CLI logs multiple retry attempts. 2. After exhausting all retries, the command exits with a non-zero status code. 3. An error message is printed to `stderr` indicating persistent API failure. 4. No `README.md` file is created. | `To Do` |

#### 3.4 Overwrite Flag Behavior

**Scenario:** Test how `--overwrite` interacts with existing files.

| Test ID | Description | Prerequisites | Steps | Expected Result | Status |
| :------ | :---------- | :------------ | :---- | :-------------- | :----- |
| E2E-OW-001 | Attempt to generate `README.md` when it exists (no `--overwrite`). | 1. A `test-project` directory with an existing `README.md` containing "Initial Content". 2. Valid `GEMINI_API_KEY`. | 1. Navigate to `test-project`. 2. Run `docly readme`. | 1. The command exits with a non-zero status code. 2. An error message is printed to `stderr` indicating that `README.md` already exists and suggests using `--overwrite`. 3. The content of `README.md` remains "Initial Content". | `To Do` |
| E2E-OW-002 | Generate `README.md` when it exists (with `--overwrite`). | 1. A `test-project` directory with an existing `README.md` containing "Initial Content". 2. Valid `GEMINI_API_KEY`. | 1. Navigate to `test-project`. 2. Run `docly readme --overwrite`. | 1. The command completes successfully with a zero status code. 2. `README.md` is updated with new AI-generated content. 3. A message might be logged indicating the file was overwritten. | `To Do` |
| E2E-OW-003 | Generate `README.md` in a clean directory (with `--overwrite`). | 1. A `test-project` directory with no `README.md`. 2. Valid `GEMINI_API_KEY`. | 1. Navigate to `test-project`. 2. Run `docly readme --overwrite`. | 1. The command completes successfully with a zero status code. 2. `README.md` is created with AI-generated content. (The `--overwrite` flag should not cause issues when the file doesn't exist). | `To Do` |