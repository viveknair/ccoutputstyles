# Claude Code Output Styles

A collection of output style templates for Claude Code with an easy-to-use CLI installer and web gallery.

## 🚀 Quick Start

Install any template directly using npx:

```bash
npx ccoutputstyle --url https://ccoutputstyles.vercel.app/templates/critical-code-reviewer
```

## 📦 Installation

### Global Installation

```bash
npm install -g ccoutputstyles
ccoutputstyle --url <template-url>
```

### Local Usage (no installation required)

```bash
npx ccoutputstyle --url <template-url>
```

## 🎨 Available Templates

Visit [https://ccoutputstyles.vercel.app](https://ccoutputstyles.vercel.app) to browse all available templates:

- **Critical Code Reviewer** - Uncompromising technical reviewer focused on correctness
- **Friendly Tutor** - Patient and encouraging teacher
- **Concise Engineer** - Direct and minimal responses
- **Documentation Writer** - Comprehensive documentation specialist
- **Test-Driven Developer** - TDD advocate with test-first approach

## 📖 Usage

### CLI Options

```bash
# Install from URL
npx ccoutputstyle --url <template-url>

# Install with custom name
npx ccoutputstyle --url <template-url> --name my-custom-style

# Install to project level instead of user level
npx ccoutputstyle --url <template-url> --project
```

### Output Style Locations

- **User level**: `~/.claude/output-styles/`
- **Project level**: `./.claude/output-styles/`

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/viveknair/ccoutputstyles.git
cd ccoutputstyles

# Install dependencies
npm install

# Build CLI
npm run build:cli

# Start development server
npm run dev
```

### Build

```bash
# Build everything
npm run build

# Build CLI only
npm run build:cli

# Build website only
npm run build:web
```

### Project Structure

```
ccoutputstyles/
├── src/
│   ├── cli/           # TypeScript CLI source
│   ├── shared/        # Shared types and constants
│   └── web/          # Website components
├── dist/             # Compiled CLI (git-ignored)
├── app/              # Next.js app directory
├── templates/        # Template markdown files
└── bin/              # CLI executable
```

## 🌐 Website Deployment

The website is automatically deployed to Vercel. Any push to the main branch triggers a new deployment.

## 📝 Creating Custom Templates

Templates are markdown files with YAML frontmatter:

```markdown
---
name: template-name
description: Brief description of the style
---

Your custom instructions here...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-template`)
3. Commit your changes (`git commit -m 'Add new template'`)
4. Push to the branch (`git push origin feature/new-template`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Website](https://ccoutputstyles.vercel.app)
- [npm Package](https://www.npmjs.com/package/ccoutputstyles)
- [GitHub Repository](https://github.com/viveknair/ccoutputstyles)