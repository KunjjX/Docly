<div align="center">
  
# 📚 Docly

### **AI-Powered Documentation Generator**

[![npm version](https://img.shields.io/npm/v/docly-cli.svg?style=flat-square&color=CB3837)](https://www.npmjs.com/package/docly-cli)
[![license](https://img.shields.io/npm/l/docly-cli.svg?style=flat-square&color=blue)](https://github.com/kunjjarsaniya/Docly/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/docly-cli.svg?style=flat-square&color=339933)](https://nodejs.org)
[![downloads](https://img.shields.io/npm/dm/docly-cli.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/docly-cli)

**Transform your codebase into professional documentation with a single command.**

[Installation](#-installation) • [Commands](#-commands) • [Diagrams](#-diagram-generation) • [Configuration](#️-configuration) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📄 10 Documentation Types
- **README.md** — Project overview
- **SRS.md** — Software Requirements
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
- **ER Diagram** — Entity relationships with PK/FK
- **DFD Level 1-3** — Data flow diagrams
- **Sequence & Activity** — Process flows
- **Class, State, Use Case** — UML diagrams
- **Flowchart, Workflow, Deployment**

</td>
</tr>
</table>

### 🚀 Why Docly?

| Problem | Docly Solution |
|---------|---------------|
| ⏰ No time for documentation | ⚡ Generate docs in seconds |
| 📝 Don't know what to write | 🤖 AI analyzes your project |
| 🔁 Repetitive manual work | 🎯 Single command automation |
| 📊 Complex diagram creation | 🎨 Beautiful Mermaid.js PNG diagrams |

---

## 📦 Installation

```bash
# Install globally (recommended)
npm install -g docly-cli

# Or install as dev dependency
npm i docly-cli --save-dev

# Or use directly with npx
npx docly-cli readme
```

After installation, navigate to your project and run:

```bash
docly readme
```

---

## 🛠 Commands

### Documentation Generation (10 Types)

| Command | Description | Output |
|---------|-------------|--------|
| `docly readme` | Generate README.md | `docs/README.md` |
| `docly srs` | Generate SRS document | `docs/SRS.md` |
| `docly architecture` | Generate architecture documentation | `docs/ARCHITECTURE.md` |
| `docly workflow` | Generate workflow documentation | `docs/WORKFLOW.md` |
| `docly testcases` | Generate test cases | `docs/TEST_CASES.md` |
| `docly api-docs` | Generate API documentation | `docs/API_DOCS.md` |
| `docly setup` | Generate setup/installation guide | `docs/SETUP.md` |
| `docly deploy` | Generate deployment guide | `docs/DEPLOYMENT.md` |
| `docly security` | Generate security documentation | `docs/SECURITY.md` |
| `docly requirements` | Generate requirements matrix | `docs/REQUIREMENTS.md` |

### Command Options

```bash
# Specify output directory
docly readme -o ./documentation

# Overwrite existing files
docly srs --overwrite

# Choose AI provider
docly readme --ai gemini
```

---

## 📊 Diagram Generation (14 Types)

### Quick Commands

```bash
# Generate specific diagram type
docly diagram -t <type>

# Generate ALL diagrams at once
docly diagram --all

# Direct diagram commands
docly diagram-er
docly diagram-class
docly diagram-sequence
```

### All Diagram Types

| Type | Command | Description |
|------|---------|-------------|
| **Architecture** | `docly diagram-architecture` | System architecture overview |
| **Component** | `docly diagram-component` | Component interaction diagram |
| **Deployment** | `docly diagram-deployment` | Deployment environment diagram |
| **ER Diagram** | `docly diagram-er` | Entity Relationship with PK/FK |
| **Class** | `docly diagram-class` | Class/Object structure |
| **Sequence** | `docly diagram-sequence` | Process sequence flow |
| **State** | `docly diagram-state` | State machine diagram |
| **Activity** | `docly diagram-activity` | Activity flow diagram |
| **Use Case** | `docly diagram-usecase` | Use case diagram |
| **Flowchart** | `docly diagram-flowchart` | General flowchart |
| **Workflow** | `docly diagram-workflow` | Workflow process diagram |
| **DFD Level 1** | `docly diagram-dfd-level-1` | Data Flow Diagram - Level 1 |
| **DFD Level 2** | `docly diagram-dfd-level-2` | Data Flow Diagram - Level 2 |
| **DFD Level 3** | `docly diagram-dfd-level-3` | Data Flow Diagram - Level 3 |

> 💡 All diagrams are generated as **high-resolution PNG files** in `docs/diagrams/`

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in your project root:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Custom output directory (default: ./docs)
OUTPUT_DIR=./docs
```

> 💡 Get your free Gemini API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 2. Configuration File (Optional)

Create `docly.config.json`:

```json
{
  "outputDir": "./docs",
  "aiProvider": "gemini",
  "diagramFormat": "mermaid"
}
```

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
│       ├── class.png
│       ├── component.png
│       ├── deployment.png
│       ├── sequence.png
│       ├── state.png
│       ├── activity.png
│       ├── usecase.png
│       ├── flowchart.png
│       ├── workflow.png
│       ├── dfd-level-1.png
│       ├── dfd-level-2.png
│       └── dfd-level-3.png
└── package.json
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Commander.js** | CLI framework |
| **Google Gemini AI** | AI-powered generation |
| **Mermaid.js** | Diagram rendering |
| **Chalk & Ora** | Beautiful CLI output |

---

## 📋 Requirements

- **Node.js** ≥ 16.0.0
- **npm** ≥ 8.0.0
- Internet connection
- Gemini API key

---

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md).

```bash
# Clone repository
git clone https://github.com/kunjjarsaniya/Docly.git
cd Docly

# Install dependencies
npm install

# Link for local testing
npm link

# Run tests
npm test
```

---

## 🐛 Troubleshooting

<details>
<summary><b>docly: command not found</b></summary>

```bash
npm install -g docly-cli
```
</details>

<details>
<summary><b>API key not found</b></summary>

```bash
# Set environment variable
export GEMINI_API_KEY=your_key_here

# Or create .env file in your project root
```
</details>

<details>
<summary><b>Permission denied (Unix/Mac)</b></summary>

```bash
chmod +x ./node_modules/.bin/docly
```
</details>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
MIT License © 2026 Kunj Jarsaniya
```

---

## 👨‍💻 Author

**Kunj Jarsaniya**

- GitHub: [@kunjjarsaniya](https://github.com/kunjjarsaniya)
- Email: kunjjarsaniya07@gmail.com
- package-link: [npm](https://www.npmjs.com/package/docly-cli)

---

<div align="center">

**Made with ❤️ for developers who code more and document better**

[⭐ Star on GitHub](https://github.com/kunjjarsaniya/Docly) • [🐛 Report Bug](https://github.com/kunjjarsaniya/Docly/issues) • [💡 Request Feature](https://github.com/kunjjarsaniya/Docly/issues)

</div>
