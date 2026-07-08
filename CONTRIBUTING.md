# 🤝 Contributing to Spider Canvas

Thank you for your interest in contributing to Spider Canvas! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Reporting Issues](#reporting-issues)

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please:

- ✅ Be respectful and considerate
- ✅ Welcome newcomers and help them get started
- ✅ Focus on constructive feedback
- ❌ No harassment or discrimination
- ❌ No trolling or spam

---

## 🚀 How to Contribute

### 1. Fork the Repository

```bash
# Click the "Fork" button on GitHub, then:
git clone https://github.com/m4spider/spider-canvas.git
cd spider-canvas
git remote add upstream https://github.com/m4spider/spider-canvas.git
```

### 2. Create a Branch

```bash
# For features
git checkout -b feature/amazing-feature

# For bug fixes
git checkout -b fix/bug-description

# For documentation
git checkout -b docs/update-readme
```

### 3. Make Your Changes

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Make your changes...
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add amazing feature"
```

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/amazing-feature

# Then create a Pull Request on GitHub
```

---

## 💻 Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/spider-canvas.git

# Navigate to project
cd spider-canvas

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

---

## 📝 Pull Request Process

### Before Submitting

1. ✅ Ensure your code follows the style guidelines
2. ✅ Test your changes thoroughly
3. ✅ Update documentation if needed
4. ✅ Add screenshots for UI changes
5. ✅ Reference any related issues

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please describe)

## How Has This Been Tested?
- [ ] Local development
- [ ] Different browsers
- [ ] Mobile responsive

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code (if necessary)
- [ ] I have updated documentation (if needed)
- [ ] My changes generate no new warnings
```

---

## 🎨 Style Guidelines

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable/function names
- Add comments for complex logic

### CSS/Tailwind

- Use Tailwind CSS utilities
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic class names

### Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Code style (formatting, semicolons, etc.)
refactor: Code refactoring
test:     Adding tests
chore:    Maintenance tasks
```

---

## 🐛 Reporting Issues

### Bug Reports

```markdown
**Describe the bug**
A clear description of what the bug is.

**To reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

### Feature Requests

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

---

## 🏷️ Labels

| Label | Description |
|-------|-------------|
| `good first issue` | Good for newcomers |
| `bug` | Bug reports |
| `enhancement` | New features |
| `documentation` | Documentation updates |
| `help wanted` | Extra attention needed |

---

## ❓ Questions?

- Open a [Discussion](https://github.com/m4spider/spider-canvas/discussions)
- Join our [Discord](#) (if available)

---

## 🙏 Thank You!

Your contributions help make Spider Canvas better for everyone. We appreciate your time and effort!

Made with ❤️ by **M4 Spider**
