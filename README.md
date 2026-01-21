# Revwisely Redesign

A website redesign project migrating from Webflow to a self-hosted codebase, built and maintained with Claude Code.

## Project Overview

This project contains the redesigned Revwisely website, exported from Webflow and enhanced for deployment on Vercel.

## Tech Stack

- **Source**: Webflow export (HTML/CSS/JS)
- **Deployment**: Vercel
- **Development**: Claude Code AI-assisted development

## Project Structure

```
revwisely/
├── index.html          # Homepage
├── css/
│   └── webflow.css     # Webflow styles + normalize.css
├── js/
│   └── webflow.js      # Interactions and animations
├── images/             # All site assets
└── [other-pages].html  # Additional pages
```

## Getting Started

### Prerequisites

- Node.js (for Vercel CLI)
- Vercel CLI: `npm i -g vercel`

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/derrtaderr/revwisely.git
   cd revwisely
   ```

2. Serve locally (any static server works):
   ```bash
   npx serve .
   ```

3. Open `http://localhost:3000` in your browser

### Deployment

Deploy to Vercel:
```bash
vercel
```

For production:
```bash
vercel --prod
```

## Migration Notes

### Exported from Webflow
- All pages and styles preserved
- Interactions and animations functional via `webflow.js`
- Images and assets included

### Requires Manual Setup
- **Forms**: Need to be connected to a form handler (Formspree, custom API, etc.)
- **CMS Content**: Static content only - no dynamic CMS
- **Site Search**: Requires third-party integration if needed

## Development Workflow

This project uses Claude Code for AI-assisted development:
- Code modifications and enhancements
- Bug fixes and optimizations
- New feature development

## License

Private project - All rights reserved.
