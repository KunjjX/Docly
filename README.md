<div align="center">

# 📚 Docly

### **AI-Powered Documentation Generator**

[![npm version](https://img.shields.io/npm/v/docly-cli.svg?style=flat-square&color=CB3837)](https://www.npmjs.com/package/docly-cli)
[![npm downloads](https://img.shields.io/npm/dm/docly-cli.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/docly-cli)
[![license](https://img.shields.io/npm/l/docly-cli.svg?style=flat-square&color=blue)](https://github.com/kunjjarsaniya/Docly/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/docly-cli.svg?style=flat-square&color=339933)](https://nodejs.org)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/kunjjarsaniya/Docly/ci.yml?style=flat-square&branch=main)](https://github.com/kunjjarsaniya/Docly/actions)
[![coverage](https://img.shields.io/codecov/c/github/kunjjarsaniya/Docly?style=flat-square)](https://codecov.io/gh/kunjjarsaniya/Docly)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**Transform your codebase into professional documentation with a single command.**

[Installation](#-installation) • [Commands](#-commands) • [Diagrams](#-diagram-generation) • [Configuration](#️-configuration) • [API](#-programmatic-usage) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📄 10 Documentation Types
- **README.md** — Project overview
- **SRS.md** — Software Requirements Specification
- **ARCHITECTURE.md** — System architecture
- **WORKFLOW.md** — User flows
- **TEST_CASES.md** — Test documentation
- **API_DOCS.md** — API documentation
- **SETUP.md** — Installation guide
- **DEPLOYMENT.md** — Deployment guide
- **SECURITY.md** — Security documentation
- **REQUIREMENTS.md** — Requirements matrix

</td>
<td width="50%">

### 📊 14 Diagram Types
- **Architecture & Component** — System design
- **ER Diagram** — Entity relationships
- **DFD Level 1–3** — Data flow diagrams
- **Sequence & Activity** — Process flows
- **Class, State, Use Case** — UML diagrams
- **Flowchart, Workflow, Deployment**

</td>
</tr>
</table>

### 🚀 Why Docly?

| Problem | Docly Solution |
|---------|---------------|
| ⏰ No time for docs | ⚡ Generate full documentation in seconds |
| 📝 Don't know what to write | 🤖 AI analyzes your project automatically |
| 🔁 Repetitive manual work | 🎯 Single command generates everything |
| 📊 Complex diagrams | 🎨 Beautiful Mermaid.js diagrams (PNG/SVG/PDF) |

---

## 📦 Installation

```bash
# Install globally (recommended)
npm install -g docly-cli

# Or install as dev dependency
npm install --save-dev docly-cli

# Or use directly
npx docly-cli readme
```

### Requirements

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0 or **yarn** / **pnpm**
- Internet connection
- [Gemini API key](https://aistudio.google.com/app/apikey)

---

## 🛠 Commands

### Generate single doc types

```bash
docly readme          # README.md
docly srs             # Software Requirements Specification
docly architecture    # System architecture
docly workflow        # End-to-end workflows
docly testcases       # Test case documentation
docly api-docs        # API documentation
docly setup           # Setup/installation guide
docly deploy          # Deployment guide
docly security        # Security documentation
docly requirements    # Requirements matrix
```

### Generate everything at once

```bash
docly generate --all
```

### Command options

```bash
docly readme -o ./docs          # Custom output directory
docly readme --overwrite         # Overwrite existing files
docly readme --ai openai         # Use OpenAI instead of Gemini
docly readme --dry-run           # Preview what would be generated
```

---

## 📊 Diagram Generation

### Quick commands

```bash
docly diagram -t architecture     # Generate architecture diagram
docly diagram -t er               # Generate ER diagram
docly diagram --all               # Generate all 14 diagram types
```

### Output formats

```bash
docly diagram -t architecture -f png    # PNG (default)
docly diagram -t architecture -f svg    # SVG vector
docly diagram -t architecture -f pdf    # PDF document
docly diagram -t architecture -f md     # Mermaid markdown
```

---

## ⚙️ Configuration

### 1. Environment variables

Create a `.env` file in your project root:

```env
# Required: Your Gemini API key
GEMINI_API_KEY=your_key_here

# Optional: AI provider (gemini or openai)
AI_PROVIDER=gemini

# Optional: Custom output directory (default: ./docs)
OUTPUT_DIR=./docs
```

### 2. Configuration file

Create `docly.config.json`:

```json
{
  "outputDir": "./docs",
  "aiProvider": "gemini",
  "geminiModel": "gemini-2.0-flash",
  "overwriteExisting": false,
  "logLevel": "info"
}
```

### 3. Quick setup

```bash
docly init
```

Scaffolds `.env` and `docly.config.json` for your project.

---

## 📁 Output Structure

```
your-project/
├── docs/
│   ├── README.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
│   ├── WORKFLOW.md
│   ├── TEST_CASES.md
│   ├── API_DOCS.md
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   ├── REQUIREMENTS.md
│   └── diagrams/
│       ├── architecture.png
│       ├── er.png
│       └── ...
└── package.json
```

---

## 📖 Programmatic Usage

Docly can also be used as a library in your Node.js projects:

```typescript
import { analyzeProject, generateDoc } from 'docly-cli';
import { renderMermaidToPng } from 'docly-cli/mermaidUtils';
import { validateMarkdown } from 'docly-cli/validator';
```

---

## 🧪 Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime (≥18) |
| **TypeScript** | Type-safe code |
| **Commander.js** | CLI framework |
| **Google Gemini AI** | AI-powered generation |
| **OpenAI** | Alternative AI provider |
| **Mermaid.js** | Diagram rendering |
| **Biome** | Linting & formatting |
| **Vitest** | Testing |
| **tsup** | Bundling |
| **Chalk & Ora** | CLI UI |

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
git clone https://github.com/kunjjarsaniya/Docly.git
cd Docly
npm install
npm run build
npm link    # local testing
```

---

## 📄 License

MIT © 2026 [Kunj Jarsaniya](https://github.com/kunjjarsaniya)

---

<div align="center">

**Made for developers who code more and document better**

[⭐ Star on GitHub](https://github.com/kunjjarsaniya/Docly) •
[🐛 Report Bug](https://github.com/kunjjarsaniya/Docly/issues) •
[💡 Request Feature](https://github.com/kunjjarsaniya/Docly/issues)

</div>
