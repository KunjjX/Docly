# Contributing to Docly 🤝

Thank you for your interest in contributing to **docly-cli**! We love your input and welcome contributions of all kinds.

## 📋 Quick Start

```bash
# Fork and clone
git clone https://github.com/kunjjarsaniya/Docly.git
cd Docly

# Install dependencies
npm install

# Link for local testing
npm link

# Test your changes
docly --help
```

## 🐛 Reporting Bugs

Before creating a bug report, please check existing issues. When reporting, include:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Node.js version (`node -v`)
- Operating system
- Error messages/screenshots

## 💡 Suggesting Features

We welcome feature ideas! Please:

1. Check existing issues/discussions first
2. Describe the feature clearly
3. Explain the use case
4. Provide examples if possible

## 🔧 Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Code** following our style guide
4. **Test** your changes: `npm test`
5. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add new diagram type
   fix: handle missing API key gracefully  
   docs: update command examples
   ```
6. **Push** and open a Pull Request

## 📁 Project Structure

```
Docly/
├── bin/              # CLI entry point
├── src/
│   ├── commands/     # Command implementations
│   ├── core/         # Core logic (analyzer, generator)
│   ├── templates/    # AI prompt templates
│   ├── api/          # Gemini API client
│   └── utils/        # Utilities
├── tests/            # Test suite
└── docs/             # Generated documentation
```

## 🎨 Code Style

- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** required
- Run `npm run lint` before committing
- Run `npm run format` to auto-format

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 📞 Need Help?

- 🐛 [Report Issues](https://github.com/kunjjarsaniya/Docly/issues)
- 💬 [Discussions](https://github.com/kunjjarsaniya/Docly/discussions)

---

**Thank you for helping make Docly better!** 🚀
