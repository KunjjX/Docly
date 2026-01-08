# Contributing to Docly

Thank you for your interest in contributing to Docly! 🎉

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing issues** for duplicates
- **Describe the feature** in detail
- **Explain the use case** and benefits
- **Provide examples** if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code style**: Run `npm run lint` and `npm run format`
4. **Write tests**: Maintain 80%+ coverage
5. **Update documentation**: Update README if needed
6. **Commit with clear messages**: Use conventional commits
   ```
   feat: add new command for API docs
   fix: handle missing package.json gracefully
   docs: update installation instructions
   ```
7. **Push to your fork**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/docly-cli.git
cd docly-cli

# Install dependencies
npm install

# Link for local testing
npm link

# Run tests
npm test

# Run in watch mode
npm run dev
```

## Coding Guidelines

### Style Guide

- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons**
- Follow **ESLint** rules: `npm run lint`
- Format code: `npm run format`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

### Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain coverage: `npm test -- --coverage`

## Project Structure

```
docly-cli/
├── bin/          # CLI entry point
├── src/          # Source code
│   ├── commands/ # Command implementations
│   ├── core/     # Core logic
│   ├── api/      # API client
│   └── utils/    # Utilities
└── tests/        # Test files
```

## Adding New Commands

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for detailed instructions.

## Need Help?

- 📖 Check [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- 💬 Ask in [GitHub Discussions](https://github.com/yourusername/docly-cli/discussions)
- 🐛 Report issues on [GitHub Issues](https://github.com/yourusername/docly-cli/issues)

## Recognition

Contributors will be recognized in:
- README.md
- Release notes
- Contributors list

Thank you for contributing! 🚀
