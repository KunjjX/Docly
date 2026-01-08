This document outlines comprehensive test cases for the `docly-cli` project, a Node.js-based Command Line Interface tool for documentation generation. The tests cover Unit, Integration, and End-to-End scenarios, ensuring the reliability and robustness of the application.

**Project:** `docly-cli`
**Tech Stack:** Node.js

---

## 1. Unit Tests

Unit tests focus on individual functions and modules in isolation, ensuring they perform their intended logic correctly. Mock data is used to simulate dependencies.

### Core Functions

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **UT-CORE-001** | Test `initProject` function for creating default project structure. | None | Call `initProject('my-doc-project')` | - `my-doc-project/` directory created.<br>- `my-doc-project/docs/` directory created.<br>- `my-doc-project/templates/` directory created.<br>- `my-doc-project/docly.config.js` created with default content.<br>- `my-doc-project/docs/index.md` created with a sample markdown. | | |
| **UT-CORE-002** | Test `parseMarkdown` function with basic Markdown input. | None | Call `parseMarkdown('# Hello World\n\nThis is a paragraph.')` | An AST (Abstract Syntax Tree) or structured JSON object representing the Markdown, including a heading and a paragraph node. | | |
| **UT-CORE-003** | Test `parseMarkdown` function with front matter. | None | Call `parseMarkdown('---\ntitle: My Doc\nauthor: John Doe\n---\n# My Document')` | An AST/structured object with `title: "My Doc"` and `author: "John Doe"` in metadata, and a heading node for "My Document". | | |
| **UT-CORE-004** | Test `generateHTML` function with simple parsed data and a basic template. | Mock `parsedData` (e.g., `{ title: 'Test Page', content: '<h1>Test Page</h1><p>Content</p>' }`).<br>Mock `template` function (e.g., `(data) => \`<html><body><h1>\${data.title}</h1>\${data.content}</body></html>\``). | Call `generateHTML(parsedData, template)` | A complete HTML string: `<html><body><h1>Test Page</h1><p>Content</p></body></html>` | | |
| **UT-CORE-005** | Test `readConfig` function with a valid configuration file. | Mock `fs.readFileSync` to return valid JSON/JS config string (e.g., `module.exports = { outputDir: 'build', sourceDir: 'content' };`). | Call `readConfig('path/to/docly.config.js')` | An object `{ outputDir: 'build', sourceDir: 'content' }` | | |
| **UT-CORE-006** | Test `readConfig` function with a missing configuration file. | Mock `fs.existsSync` to return `false`. | Call `readConfig('non/existent/docly.config.js')` | Throws an error indicating the config file was not found, or returns a default configuration object. | | |
| **UT-CORE-007** | Test `writeFile` function for successful file writing. | Mock `fs.writeFileSync` to simulate writing. | Call `writeFile('output/test.html', '<html>Test</html>')` | `fs.writeFileSync` is called once with `('output/test.html', '<html>Test</html>')`. Function returns `true` or no error. | | |
| **UT-CORE-008** | Test `writeFile` function for error during file writing (e.g., permissions). | Mock `fs.writeFileSync` to throw an error (e.g., `EACCES`). | Call `writeFile('/no/permissions/file.txt', 'Content')` | Throws an error indicating a file writing failure. | | |

### Utility Functions

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **UT-UTIL-001** | Test `validatePath` function with an existing directory. | Mock `fs.existsSync` to return `true` and `fs.lstatSync().isDirectory()` to return `true`. | Call `validatePath('/tmp/docs', 'directory')` | Returns `true`. | | |
| **UT-UTIL-002** | Test `validatePath` function with a non-existent path. | Mock `fs.existsSync` to return `false`. | Call `validatePath('/nonexistent/path')` | Throws an error indicating the path does not exist. | | |
| **UT-UTIL-003** | Test `slugify` function with a standard string. | None | Call `slugify('My Awesome Document Title')` | `'my-awesome-document-title'` | | |
| **UT-UTIL-004** | Test `slugify` function with special characters and leading/trailing spaces. | None | Call `slugify('  Another Document! Title?  ')` | `'another-document-title'` | | |
| **UT-UTIL-005** | Test `deepMerge` function for merging two simple objects. | None | Call `deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })` | `{ a: 1, b: { c: 2, d: 3 }, e: 4 }` | | |
| **UT-UTIL-006** | Test `deepMerge` function for merging with arrays (should replace). | None | Call `deepMerge({ tags: ['a', 'b'] }, { tags: ['c'] })` | `{ tags: ['c'] }` (assuming default merge strategy for arrays is replacement) | | |
| **UT-UTIL-007** | Test `formatError` function for a simple error message. | None | Call `formatError('File not found', 'readConfig')` | A formatted string like `[docly-cli:readConfig] Error: File not found` (or similar, depending on implementation). | | |
| **UT-UTIL-008** | Test `formatError` function with an Error object. | None | Call `formatError(new Error('Permission denied'), 'writeFile')` | A formatted string like `[docly-cli:writeFile] Error: Permission denied` | | |

### Mock Data Examples

```javascript
// Mock for docly.config.js content
const mockConfigContent = `
module.exports = {
  sourceDir: 'content',
  outputDir: 'public',
  templatesDir: 'templates',
  defaultTemplate: 'default.html',
  siteUrl: 'https://docs.example.com',
  plugins: [
    'docly-plugin-search',
    { name: 'docly-plugin-analytics', options: { id: 'UA-12345' } }
  ]
};
`;

// Mock for a basic Markdown file content
const mockMarkdownContent = `
---
title: Getting Started
category: Introduction
order: 1
---

# Getting Started with Docly

Welcome to the Docly CLI! This guide will help you set up your first documentation project.

## Installation

\`\`\`bash
npm install -g docly-cli
\`\`\`

## Initialization

Run the init command:

\`\`\`bash
docly init my-docs
\`\`\`
`;

// Mock for parsed data structure (after markdown parsing)
const mockParsedData = {
  metadata: {
    title: 'Getting Started',
    category: 'Introduction',
    order: 1
  },
  content: `
    <h1>Getting Started with Docly</h1>
    <p>Welcome to the Docly CLI! This guide will help you set up your first documentation project.</p>
    <h2>Installation</h2>
    <pre><code class="language-bash">npm install -g docly-cli</code></pre>
    <h2>Initialization</h2>
    <p>Run the init command:</p>
    <pre><code class="language-bash">docly init my-docs</code></pre>
  `,
  slug: 'getting-started'
};

// Mock for a simple HTML template function
const mockTemplateFunction = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.metadata.title} | Docly Docs</title>
</head>
<body>
    <header>
        <h1>Docly CLI Documentation</h1>
    </header>
    <main>
        ${data.content}
    </main>
    <footer>
        <p>&copy; ${new Date().getFullYear()} Docly</p>
    </footer>
</body>
</html>
`;
```

## 2. Integration Tests

Integration tests verify the interactions between different modules, components, and external services (like the file system or hypothetical APIs).

### File System & CLI Interaction

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **IT-FS-001** | Test `docly init` command creates expected directory structure and config file. | Clean temporary directory. | 1. Run `docly init temp-project` in a shell.<br>2. Check filesystem. | - `temp-project/` directory exists.<br>- `temp-project/docs/` directory exists.<br>- `temp-project/templates/` directory exists.<br>- `temp-project/docly.config.js` exists and contains default config.<br>- `temp-project/docs/index.md` exists. | | |
| **IT-FS-002** | Test `docly process` reads multiple Markdown files and stores processed data. | 1. Project initialized via `docly init`.<br>2. `docs/page1.md` and `docs/page2.md` exist. | 1. Run `docly process` from the project root.<br>2. Inspect internal state or a generated intermediate file (if applicable). | Processed data for both `page1.md` and `page2.md` are correctly loaded and transformed into the expected internal data structure. | | |
| **IT-FS-003** | Test `docly generate` writes generated HTML files to the output directory. | 1. Project initialized.<br>2. `docs/page1.md` and `docs/page2.md` exist.<br>3. `docly process` has been run or equivalent data is available. | 1. Run `docly generate` from the project root.<br>2. Check filesystem in the configured output directory (e.g., `public/`). | - `public/index.html` (if `index.md` exists) created.<br>- `public/page1.html` created.<br>- `public/page2.html` created.<br>- All generated HTML files contain the expected content based on templates and processed Markdown. | | |
| **IT-FS-004** | Test `docly generate` handles missing template gracefully. | 1. Project initialized.<br>2. `docly.config.js` configured with a non-existent `defaultTemplate`. | 1. Run `docly generate`. | CLI outputs an error message indicating that the specified template file could not be found. Generation process fails or uses a fallback. | | |

### Configuration Management Integration

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **IT-CONFIG-001** | Test custom `docly.config.js` overrides default settings. | 1. Project initialized.<br>2. `docly.config.js` modified to set `outputDir: 'build-docs'` and `sourceDir: 'source-md'`. | 1. Create `source-md/test.md`.<br>2. Run `docly generate`.<br>3. Check filesystem. | - `build-docs/` directory exists.<br>- `build-docs/test.html` exists.<br>- `public/` (default output dir) does NOT exist. | | |
| **IT-CONFIG-002** | Test invalid `docly.config.js` format causes error. | 1. Project initialized.<br>2. `docly.config.js` modified to contain invalid JavaScript (e.g., missing closing brace). | 1. Run any `docly` command (e.g., `docly generate`). | CLI outputs an error message indicating a configuration file parsing error. Command execution is halted. | | |

### Third-Party Service Integration (Hypothetical)

*Note: As "None" was specified for additional tech stack, these are hypothetical tests for potential future features like publishing to a remote documentation service.*

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **IT-THIRD-001** | Test `docly publish` command successfully uploads generated docs to a remote service. | 1. Project initialized and docs generated.<br>2. `docly.config.js` configured with valid API keys/credentials for a mock publishing service.<br>3. Mock API for the publishing service is running and accessible. | 1. Run `docly publish`.<br>2. Check mock service logs/state. | CLI outputs a success message. Mock publishing service receives the generated documentation files (e.g., HTML, CSS, JS) and confirms deployment. | | |
| **IT-THIRD-002** | Test `docly publish` command handles authentication failure with remote service. | 1. Project initialized and docs generated.<br>2. `docly.config.js` configured with invalid API keys/credentials for a mock publishing service.<br>3. Mock API for the publishing service is running and configured to return authentication errors. | 1. Run `docly publish`. | CLI outputs an error message indicating authentication failure (e.g., "Unauthorized", "Invalid API Key"). | | |

## 3. End-to-End Tests

End-to-End (E2E) tests simulate a complete user interaction flow with the `docly-cli`, from initial setup to final output, ensuring all components work together as expected. Cross-browser testing is not applicable as this is a CLI tool without a direct frontend.

### Complete User Workflows

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **E2E-WF-001** | Full Happy Path: Initialize, add content, generate, and serve documentation. | Clean temporary directory. | 1. Run `docly init my-docs-project`.<br>2. Navigate into `my-docs-project`.<br>3. Create `docs/new-page.md` with some Markdown content.<br>4. Run `docly generate`.<br>5. Run `docly serve` (in background/separate process).<br>6. Use an HTTP client (e.g., `curl` or `fetch` in Node.js) to access `http://localhost:8080/new-page.html`. | - Project structure is created.<br>- `new-page.md` is processed and `new-page.html` is generated in the output directory.<br>- `docly serve` starts successfully on the default port.<br>- Accessing `http://localhost:8080/new-page.html` returns HTTP 200 and the correct HTML content for `new-page.md`. | | |
| **E2E-WF-002** | Error Path: Initialize, add invalid content, attempt generation, observe error. | Clean temporary directory. | 1. Run `docly init error-project`.<br>2. Navigate into `error-project`.<br>3. Create `docs/invalid.md` with intentionally malformed Markdown (e.g., unclosed tags, syntax errors that parser should catch).<br>4. Run `docly generate`. | - Project structure is created.<br>- `docly generate` command fails or reports an error related to parsing `invalid.md`.<br>- No `invalid.html` is generated, or it contains error messages instead of parsed content. | | |
| **E2E-WF-003** | Custom Template Workflow: Initialize, configure custom template, generate. | Clean temporary directory. | 1. Run `docly init custom-template-project`.<br>2. Navigate into `custom-template-project`.<br>3. Create `templates/custom.html` with a unique identifier (e.g., "Custom Template Footer").<br>4. Modify `docly.config.js` to set `defaultTemplate: 'custom.html'`.<br>5. Create `docs/page.md` with simple content.<br>6. Run `docly generate`.<br>7. Inspect `public/page.html`. | - Project initialized and custom template created.<br>- `docly.config.js` is updated correctly.<br>- `public/page.html` is generated and contains the content from `page.md` rendered *within* the `custom.html` template, including the "Custom Template Footer" identifier. | | |

### Critical Path Testing

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **E2E-CP-001** | Generate docs from a single basic Markdown file using default settings. | Clean temporary directory. | 1. Run `docly init basic-doc`.<br>2. Navigate into `basic-doc`.<br>3. Create `docs/hello.md` with `# Hello Docly`.<br>4. Run `docly generate`.<br>5. Inspect `public/hello.html`. | - `public/hello.html` is created.<br>- `hello.html` contains `<h1>Hello Docly</h1>` rendered within the default template. | | |
| **E2E-CP-002** | Generate docs with multiple Markdown files and ensure correct linking/structure (if applicable). | Clean temporary directory. | 1. Run `docly init multi-doc`.<br>2. Navigate into `multi-doc`.<br>3. Create `docs/index.md` and `docs/about.md`.<br>4. Add a link in `index.md` to `about.md` (e.g., `[About Us](about.md)`).<br>5. Run `docly generate`.<br>6. Inspect `public/index.html` and `public/about.html`. | - Both `index.html` and `about.html` are generated.<br>- The link in `public/index.html` points correctly to `about.html` (e.g., `<a href="about.html">About Us</a>`). | | |

### CLI Argument Overrides

| Test ID | Test Description | Prerequisites | Test Steps | Expected Result | Actual Result | Status |
| :------ | :--------------- | :------------ | :--------- | :-------------- | :------------ | :----- |
| **E2E-CLI-001** | Override `outputDir` via command-line argument. | 1. Project initialized.<br>2. `docs/page.md` exists. | 1. Run `docly generate --outputDir custom-output`.<br>2. Check filesystem. | - `custom-output/` directory is created.<br>- `custom-output/page.html` exists.<br>- The default `public/` directory is not created/used for output. | | |
| **E2E-CLI-002** | Override `port` for `docly serve` command. | 1. Project initialized and docs generated. | 1. Run `docly serve --port 9000` (in background).<br>2. Attempt to access `http://localhost:9000/index.html` using an HTTP client.<br>3. Attempt to access `http://localhost:8080/index.html`. | - `docly serve` starts successfully on port 9000.<br>- `http://localhost:9000/index.html` returns HTTP 200.<br>- `http://localhost:8080/index.html` returns a connection error or HTTP 404 (if no other server is running there). | | |
| **E2E-CLI-003** | Use help command for all major commands. | None | 1. Run `docly --help`.<br>2. Run `docly init --help`.<br>3. Run `docly generate --help`.<br>4. Run `docly serve --help`. | - Each command displays its respective help message, including available options and descriptions. | | |