# 📚 Docly - Automated Documentation Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

> **Transform your codebase into professional documentation with a single command.**

Docly is a powerful developer productivity tool that automatically generates complete project documentation including README files, SRS documents, architecture diagrams, workflows, and test cases—all powered by AI.

## 🎯 Why Docly?

Most developers focus on coding but skip proper documentation due to:
- ⏰ Time constraints
- 📝 Lack of documentation knowledge  
- 🔁 Repetitive manual work
- ⚡ Tight deadlines

**Docly solves this by:**
- 🤖 Automatically analyzing your project
- 🧠 Using AI-powered generation
- 📄 Producing structured, professional documentation
- ⚡ Running via a single CLI command

## ✨ Features

### MVP Features (v1.0)
- ✅ **README.md Generation** - Professional project documentation
- ✅ **SRS Generation** - Software Requirement Specification
- ✅ **Architecture Diagrams** - Visual system design with Mermaid.js
- ✅ **Workflow Documentation** - End-to-end user flows
- ✅ **Test Cases** - Comprehensive testing documentation
- ✅ **CLI-based** - Simple command execution
- ✅ **MERN Stack Support** - Optimized for MERN projects

### Power Features
- 🚀 **API Documentation** - Automatic endpoint documentation
- 🛠️ **Setup Guide** - Environment and configuration docs
- 📦 **Deployment Guide** - Hosting and CI/CD instructions
- 🔒 **Security Documentation** - Auth flows and best practices
- 📋 **Requirements Matrix** - Feature-to-module mapping

## 🚀 Quick Start

### Installation

**Option 1: NPX (No installation required)**
```bash
npx docly-cli readme
```

**Option 2: Global Installation**
```bash
npm install -g docly-cli
```

**Option 3: Project Dependency**
```bash
npm install --save-dev docly-cli
```

### Basic Usage

Navigate to your project root and run:

```bash
# Generate README
docly readme

# Generate SRS document
docly srs

# Generate architecture diagram
docly architecture

# Generate workflow documentation
docly workflow

# Generate test cases
docly testcases
```

## 📖 Command Reference

### Core Commands

| Command | Description | Output |
|---------|-------------|--------|
| `docly readme` | Generate README.md | `docs/README.md` |
| `docly srs` | Generate SRS document | `docs/SRS.md` |
| `docly architecture` | Generate architecture diagram | `docs/ARCHITECTURE.md` |
| `docly workflow` | Generate workflow documentation | `docs/WORKFLOW.md` |
| `docly testcases` | Generate test cases | `docs/TEST_CASES.md` |

### Power Commands

| Command | Description | Output |
|---------|-------------|--------|
| `docly api-docs` | Generate API documentation | `docs/API_DOCS.md` |
| `docly setup` | Generate setup guide | `docs/SETUP.md` |
| `docly deploy` | Generate deployment guide | `docs/DEPLOYMENT.md` |
| `docly requirements` | Generate requirements matrix | `docs/REQUIREMENTS.md` |
| `docly security` | Generate security documentation | `docs/SECURITY.md` |

### Command Options

```bash
# Use specific AI provider
docly readme --ai gemini
docly readme --ai openai

# Export as PDF (future)
docly srs --format pdf

# Custom diagram type
docly architecture --diagram mermaid
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# AI API Configuration (Choose one)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Custom API endpoint
API_BASE_URL=http://localhost:3000

# Optional: Output directory (default: ./docs)
OUTPUT_DIR=./docs
```

### Configuration File

Create `docly.config.json` (optional):

```json
{
  "outputDir": "./documentation",
  "aiProvider": "gemini",
  "includeExamples": true,
  "diagramFormat": "mermaid",
  "projectType": "MERN"
}
```

## 📂 Output Structure

After running Docly commands, your project will have:

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
│   └── DEPLOYMENT.md
├── src/
└── package.json
```

## 🛠️ Tech Stack

- **CLI Framework**: Node.js + Commander.js
- **AI Engine**: OpenAI / Google Gemini (pluggable)
- **Diagrams**: Mermaid.js
- **File Operations**: fs-extra
- **Styling**: Chalk + Ora
- **User Input**: Inquirer

## 📋 Requirements

- Node.js >= 16.0.0
- NPM >= 8.0.0
- Internet connection (for AI generation)
- API key for OpenAI or Google Gemini

## 🎓 Examples

### Generate README for MERN Project

```bash
cd my-mern-app
docly readme
```

Output: Professional README with project description, tech stack, installation steps, and folder structure.

### Generate Complete Documentation Suite

```bash
docly readme
docly srs
docly architecture
docly workflow
docly testcases
docly api-docs
```

Result: **6 professional documents** ready for client delivery or team collaboration.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/docly-cli.git
cd docly-cli

# Install dependencies
npm install

# Link for local testing
npm link

# Run in development mode
npm run dev

# Run tests
npm test
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: `docly: command not found`
```bash
# Solution: Install globally
npm install -g docly-cli
```

**Issue**: `API key not found`
```bash
# Solution: Set environment variable
export GEMINI_API_KEY=your_key_here
# or create .env file
```

**Issue**: `Permission denied`
```bash
# Solution (Unix/Mac)
chmod +x ./node_modules/.bin/docly
```

## 📊 Roadmap

### Phase 1 - MVP ✅
- [x] CLI tool
- [x] Markdown documentation
- [x] MERN stack support
- [x] AI-powered generation

### Phase 2 - Enhancements (Q1 2026)
- [ ] PDF & DOCX export
- [ ] Custom templates
- [ ] Multi-language support
- [ ] GitHub integration

### Phase 3 - Scale (Q2 2026)
- [ ] SaaS dashboard
- [ ] Team collaboration
- [ ] Versioned documentation
- [ ] CI/CD integration

## 📄 License

MIT © [Your Name]

## 🙏 Acknowledgments

- Built with ❤️ for developers who code more and document better
- Powered by AI technologies from OpenAI and Google
- Inspired by the documentation gap in software development

## 📞 Support

- 📧 Email: support@docly.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/docly-cli/issues)
- 💬 Discord: [Join our community](https://discord.gg/docly)
- 📖 Docs: [Documentation](https://docs.docly.dev)

---

**Made with ❤️ by developers, for developers**

⭐ Star us on [GitHub](https://github.com/yourusername/docly-cli) if Docly saves your time!
