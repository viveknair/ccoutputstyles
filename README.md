# ccoutputstyle

CLI tool and template gallery for customizing Claude Code output styles.

**Website:** [ccoutputstyles.vercel.app](https://ccoutputstyles.vercel.app)

## Quick Install

```bash
npx ccoutputstyle --url https://ccoutputstyles.vercel.app/templates/critical-code-reviewer
```

Or run interactively:
```bash
npx ccoutputstyle
```

## Contributing Templates

**We strongly encourage template contributions!** The more templates we have, the better Claude Code becomes for everyone.

### How to Contribute

1. Fork this repository
2. Add your template to `/templates/your-template.md`:
```markdown
---
name: your-template-name
description: Brief description of what this style does
---

Your template instructions here...
```

3. Add it to `/app/data/templates.ts`
4. Submit a PR - we'll review and merge quickly!

### Template Ideas
- Domain-specific styles (React, Python, DevOps, etc.)
- Language learning assistants
- Code review styles
- Documentation generators
- Teaching/tutoring styles

## Development

```bash
npm install
npm run dev        # Start website at localhost:3000
npm run build:cli  # Build CLI tool
```

## How It Works

Templates are Markdown files with YAML frontmatter that modify Claude Code's system prompt. They install to:
- **User level:** `~/.claude/output-styles/`
- **Project level:** `./.claude/output-styles/`

## License

MIT