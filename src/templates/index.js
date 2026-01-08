/**
 * Build README prompt for AI generation
 */
export function buildReadmePrompt(projectData) {
  return `Generate a comprehensive README.md file for the following project:

**Project Information:**
- Name: ${projectData.name}
- Description: ${projectData.description}
- Version: ${projectData.version}

**IMPORTANT CONTEXT:**
This is "Docly" - an AI-powered CLI tool that automatically generates project documentation (README, SRS, Architecture, Workflows, Test Cases) using Google Gemini AI. It's NOT a web application - it's a command-line interface tool built with Node.js.

**Available Commands:**
- \`docly readme\` - Generate README.md
- \`docly srs\` - Generate Software Requirements Specification
- \`docly architecture\` - Generate architecture diagram
- \`docly workflow\` - Generate workflow documentation
- \`docly testcases\` - Generate test cases documentation

**Technology Stack:**
- Runtime: Node.js (CLI application, no frontend/database)
- AI Provider: Google Gemini API (gemini-1.5-flash model)
- HTTP Client: axios
- CLI Framework: commander.js
- Styling: chalk (terminal colors)
- Spinners: ora (loading indicators)
- File Operations: fs-extra
- Environment: dotenv

**Key Dependencies:**
${projectData.dependencies
  .slice(0, 15)
  .map(dep => `- ${dep}`)
  .join('\\n')}

**Project Structure:**
${projectData.structure.map(dir => `- ${dir}/`).join('\\n')}

---

**Instructions:**
Generate a professional README.md specifically for this CLI documentation generator tool. Include:

1. **Project Title & Badges** - "Docly CLI" with shields.io badges for version, license, node version
2. **Description** - Clearly explain this is an AI-powered CLI tool for automatic documentation generation
3. **Features** - List:
   - Automated doc generation using Gemini AI
   - Multiple documentation types (README, SRS, Architecture, Workflow, Test Cases)
   - Simple CLI commands
   - Configurable via .env
   - Support for any Node.js project
4. **Tech Stack** - Emphasize this is a CLI tool (Node.js backend only, no frontend/database)
5. **Prerequisites** - Node.js 16+, Gemini API key
6. **Installation** - Both global installation and local usage
7. **Environment Variables** - GEMINI_API_KEY is required, AI_PROVIDER (gemini/openai) optional
8. **Usage** - Show actual commands: \`docly readme\`, \`docly srs\`, etc. with flags like \`--overwrite\`
9. **Getting API Key** - Link to https://aistudio.google.com/app/apikey
10. **Project Structure** - Explain bin/, src/commands/, src/api/, src/templates/, etc.
11. **How It Works** - Brief explanation of: analyze project → build prompt → call AI → save output
12. **Contributing** - Link to CONTRIBUTING.md
13. **License** - MIT License
14. **Contact** - GitHub issues

DO NOT include fictional features like web UI, database, authentication, or features that don't exist.
Format in clean Markdown with code blocks for commands. Use emojis sparingly.`;
}

/**
 * Build SRS prompt for AI generation
 */
export function buildSRSPrompt(projectData) {
  return `Generate a Software Requirements Specification (SRS) document for:

**Project:** ${projectData.name}
**Description:** ${projectData.description}

**CRITICAL CONTEXT:**
This is "Docly CLI" - a command-line tool that uses Google Gemini AI to automatically generate project documentation. It's NOT a web app, NOT a documentation platform with user accounts. It's a simple CLI tool.

**What Docly Actually Does:**
1. User runs a command like \`docly readme\`
2. Docly analyzes the project structure (files, package.json, etc.)
3. Builds an AI prompt with project information
4. Sends prompt to Google Gemini API
5. Receives AI-generated documentation
6. Saves to \`docs/\` folder

**Actual Commands:**
- \`docly readme\` - Generate README.md
- \`docly srs\` - Generate SRS.md  
- \`docly architecture\` - Generate ARCHITECTURE.md
- \`docly workflow\` - Generate WORKFLOW.md
- \`docly testcases\` - Generate TEST_CASES.md

**Tech Stack:** Node.js CLI (no frontend, no database, no authentication)

---

**Instructions:**
Create a focused SRS document for this specific CLI tool with:

1. **Introduction**
   - Purpose: Document Docly CLI tool requirements
   - Scope: AI-powered documentation generator for developers
   - Audience: Docly users and developers
   - Product overview: CLI that generates docs using Gemini AI

2. **Overall Description**
   - Product perspective: Standalone CLI tool
   - Product functions: Analyze project → Call AI → Generate docs
   - User classes: Developers needing documentation
   - Operating environment: Any OS with Node.js
   - Constraints: Requires Gemini API key, internet connection
   - Dependencies: Node.js 16+, Gemini API

3. **Functional Requirements**
   Focus on ACTUAL features:
   - FR-1: Execute \`docly readme\` command
   - FR-2: Execute \`docly srs\` command
   - FR-3: Execute \`docly architecture\` command
   - FR-4: Execute \`docly workflow\` command
   - FR-5: Execute \`docly testcases\` command
   - FR-6: Load GEMINI_API_KEY from .env
   - FR-7: Analyze project structure
   - FR-8: Call Gemini API with prompts
   - FR-9: Save generated docs to docs/ folder
   - FR-10: Handle --overwrite flag
   - FR-11: Display progress spinners
   - FR-12: Retry on API failures

4. **Non-Functional Requirements**
   - Performance: Generate docs in <30 seconds
   - Security: API key stored in .env (gitignored)
   - Usability: Simple CLI commands
   - Reliability: Retry logic for API failures

5. **System Constraints**
   - Requires internet connection
   - Requires valid Gemini API key
   - Subject to Gemini API rate limits

DO NOT invent features like JSDoc parsing, TypeScript support, template customization, watch mode, or web interfaces.
Keep it realistic and specific to what Docly actually does.`;
}

/**
 * Build Workflow prompt for AI generation
 */
export function buildWorkflowPrompt(projectData) {
  return `Generate workflow documentation for:

**Project:** ${projectData.name}

**CRITICAL CONTEXT:**
This is "Docly CLI" - a command-line documentation generator. It's NOT a web application, so there are NO user login flows, NO authentication workflows, NO database operations.

**What Docly Actually Does:**
- User runs a CLI command (e.g., \`docly readme\`)
- Docly analyzes project files
- Sends data to Gemini AI
- Saves generated documentation

**Actual Commands:**
\`\`\`bash
docly readme        # Generate README.md
docly srs           # Generate SRS.md
docly architecture  # Generate ARCHITECTURE.md
docly workflow      # Generate WORKFLOW.md
docly testcases     # Generate TEST_CASES.md
\`\`\`

**Tech Stack:** Node.js CLI only (no frontend, no backend server, no database)

---

**Instructions:**
Create workflow documentation covering:

1. **User Workflows**
   - First-time setup workflow
   - Command execution workflow
   - Documentation generation workflow
   - Regenerating documentation workflow
   
2. **System Workflows**
   - Command parsing (commander.js)
   - Project analysis (reading files)
   - AI prompt building
   - Gemini API call workflow
   - File writing workflow

3. **Internal Component Workflows**
   - bin/index.js → src/commands/index.js flow
   - src/commands → src/core/runGenerator.js flow
   - runGenerator → analyzer → generateDoc flow
   - AI client workflow (callGemini with retry logic)

4. **Error Handling Workflows**
   - Missing API key error
   - Invalid API key error
   - API timeout/503 errors
   - File write permission errors

5. **Diagrams**
   Create Mermaid diagrams for:
   - High-level command execution flow
   - Detailed documentation generation sequence
   - Error handling flowchart

DO NOT document:
- User registration/login (doesn't exist)
- Web request-response cycles (it's a CLI)
- Database workflows (no database)
- Authentication flows (no auth)

Keep workflows specific to CLI operations and AI-powered doc generation.`;
}

/**
 * Build Test Cases prompt for AI generation
 */
export function buildTestCasesPrompt(projectData) {
  return `Generate test cases documentation for:

**Project:** ${projectData.name}

**CRITICAL CONTEXT:**
This is "Docly CLI" - a command-line tool for generating documentation using AI.

**Commands to Test:**
1. \`docly readme\` - Generate README.md
2. \`docly srs\` - Generate SRS.md
3. \`docly architecture\` - Generate ARCHITECTURE.md
4. \`docly workflow\` - Generate WORKFLOW.md
5. \`docly testcases\` - Generate TEST_CASES.md

**Key Components to Test:**
- CLI argument parsing (commander.js)
- Environment variable loading (.env)
- Project analysis (src/core/analyzer.js)
- AI prompt building (src/templates/index.js)
- Gemini API client (src/api/client.js)
- File writing (src/core/runGenerator.js)

**Tech Stack:** Node.js CLI (no frontend, no database)

---

**Instructions:**
Create test documentation with:

1. **Unit Tests**
   Test individual functions:
   - Project analyzer tests
   - Prompt building tests
   - Config loading tests
   - File utilities tests
   - Logger tests
   - Validator tests

2. **Integration Tests**
   - Command execution tests
   - API client with mock responses
   - File system operations
   - Environment variable loading

3. **End-to-End Tests**
   - Complete command execution: \`docly readme\`
   - Output file verification
   - Error handling (missing API key)
   - Retry logic on API failures
   - Overwrite flag behavior

4. **Test Format**
   For each test include:
   - Test ID
   - Description
   - Prerequisites (e.g., valid API key, test project)
   - Steps
   - Expected Result
   - Status field

Focus on testing ACTUAL Docly features:
- Command execution
- AI API integration
- File generation
- Error handling
- Retry logic

DO NOT create tests for:
- Web UI (doesn't exist)
- Database operations (no database)
- User authentication (no auth)
- REST APIs (it's a CLI)

Keep tests realistic and specific to CLI tool functionality.`;
}

/**
 * Build API Documentation prompt
 */
export function buildAPIDocsPrompt(projectData) {
  return `Generate API documentation for:

**Project:** ${projectData.name}

**CRITICAL CONTEXT:**
This is "Docly CLI" - it does NOT expose a REST API. Users interact via command-line commands, not HTTP endpoints.

However, Docly CONSUMES the Google Gemini AI API internally.

---

**Instructions:**
Create documentation explaining:

1. **Internal API Usage**
   - How Docly uses Google Gemini API
   - API endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
   - Authentication: API key in query parameter
   - Request format
   - Response format

2. **CLI "API" (Commands)**
   Document the command-line interface:
   - \`docly readme [options]\`
   - \`docly srs [options]\`
   - \`docly architecture [options]\`
   - \`docly workflow [options]\`
   - \`docly testcases [options]\`
   
   Options:
   - \`--overwrite\` - Overwrite existing documentation

3. **Environment Variables**
   - GEMINI_API_KEY (required)
   - AI_PROVIDER (optional, default: gemini)

DO NOT document REST API endpoints, as this tool doesn't provide any.
Focus on documenting the CLI commands and internal Gemini API usage.`;
}

/**
 * Build Architecture Documentation prompt
 */
export function buildArchitecturePrompt(projectData) {
  return `Generate architecture documentation for:

**Project:** ${projectData.name}

**CRITICAL CONTEXT:**
This is "Docly CLI" - a command-line documentation generator, NOT a web application. There is NO frontend, NO backend server, NO database, NO authentication.

**What Docly Actually Is:**
- A Node.js CLI tool
- Runs locally on user's machine
- Makes API calls to Google Gemini
- Reads/writes local files

**Actual Architecture Components:**
1. **CLI Entry Point** (\`bin/index.js\`)
   - Uses commander.js for command parsing
   - Entry point for all commands

2. **Commands Layer** (\`src/commands/index.js\`)
   - Command handlers (readme, srs, architecture, workflow, testcases)
   - Delegates to runGenerator

3. **Core Layer** (\`src/core/\`)
   - \`runGenerator.js\` - Main orchestration
   - \`analyzer.js\` - Project structure analysis
   - \`generator.js\` - AI prompt building and doc generation

4. **Templates Layer** (\`src/templates/index.js\`)
   - Prompt builders for each doc type
   - Context-specific instructions for AI

5. **API Client Layer** (\`src/api/client.js\`)
   - Gemini API integration
   - HTTP client (axios)
   - Retry logic
   - Error handling

6. **Utils Layer** (\`src/utils/\`)
   - File operations (read/write)
   - Environment loading (.env)
   - Logging utilities

**Tech Stack:** 
- Runtime: Node.js
- CLI: commander.js
- HTTP: axios
- AI: Google Gemini API
- Files: fs-extra
- UI: chalk + ora

---

**Instructions:**
Create architecture documentation with:

1. **High-Level Architecture**
   Create a Mermaid diagram showing:
   - User → CLI → Commands → runGenerator → Analyzer + Generator → AI API
   - File System interactions
   - .env configuration flow

2. **Component Breakdown**
   For each layer, explain:
   - Purpose
   - Key files
   - Responsibilities
   - Dependencies

3. **Data Flow**
   Explain the flow:
   - Command execution → Project analysis → Prompt building → AI call → File writing

4. **Technology Stack**
   List actual technologies used (not generic frontend/backend/database)

5. **Dependencies**
   List key npm packages and their purposes

DO NOT create:
- Frontend/Backend/Database diagrams (doesn't apply to CLI)
- Authentication flows (no auth)
- REST API architecture (it's a CLI)

Keep it specific to CLI tool architecture with local file operations and external API calls.`;
}
