# Remark Deflist Revisited °// Dual Implementation

**[Remark Deflist Revisited][module]** is a **[Remark]** plugin that enhances the standard `remark-deflist` with improved support for nested definition lists. This project demonstrates two ways to use the **`@verikami/remark-deflist-revisited`** module in a live, interactive environment:

1. **`server.js`** → A classic Node.js HTTP server.
2. **`worker.js`** → A modern Cloudflare Worker.

Both implementations provide the exact same functionality and user interface, showcasing the module's versatility across different JavaScript runtimes.

## Interactive Start

[![Codeflow][Codeflow Badge]][Codeflow]
[![StackBlitz][StackBlitz Badge]][StackBlitz]
[![Codesandbox][Codesandbox Badge]][Codesandbox]

## Cloudflare Worker Deploy

[![Cloudflare][Cloudflare Badge]][Cloudflare]

## Features

- **Dual Implementation**: Side-by-side examples for Node.js (`server.js`) and Cloudflare Workers (`worker.js`).
- **Consistent UX**: Both versions offer an identical two-column layout with a live markdown editor and real-time preview.
- **Modern JavaScript**: Uses ES Modules and modern syntax.
- **Minimal Dependencies**: Built to be lightweight and easy to understand.
- **Universal Template**: A single, environment-agnostic HTML template (`lib/template.js`) is used by both implementations.

## Requirements

- Node.js 20 or higher
- `npm` (`pnpm` or `yarn`)
- `wrangler` CLI for the Cloudflare Worker version

## Quick Start

### 1. Node.js Server

This version uses the standard Node.js `http` module to run the server.  
It reads the CSS and Markdown files from the filesystem at runtime.

```bash
## Install dependencies
ツ npm install

## Start the Node.js server
ツ npm start
```

Now, open your browser and visit **`http://localhost:3000`**.

### 2. Cloudflare Worker

This version is designed to be deployed on the Cloudflare edge network. It uses modern `import` syntax to bundle the CSS and Markdown files into the script during the build process, requiring no runtime file system access.

```bash
## Install dependencies
ツ npm install

## Start the local development server for the worker
ツ npm run dev
```

Now, open your browser and visit the local URL provided by Wrangler.  
It is usually **`http://localhost:8787`**.

To deploy the worker to your Cloudflare account run:

```bash
ツ npm run deploy
```

## Project Structure

The project is structured to share as much code as possible between the two implementations.

```
project/
├── server.js             # Node.js server implementation
├── worker.js             # Cloudflare Worker implementation
├── test.js               # Test suite for the core logic
├── lib/
│   ├── processor.js      # Core markdown processing (used by both)
│   └── template.js       # Universal HTML template (used by both)
├── styles/
│   └── main.css          # Single stylesheet for both implementations
└── examples/
    └── basic.md          # Default markdown content
```

### Key Files & Concepts

- **`server.js`** → The entry point for the Node.js environment. Uses `fs.readFileSync` to load assets.
- **`worker.js`** → The entry point for the Cloudflare Workers environment. Uses `import ... assert { type: "text" }` to bundle assets at build time.
- **`lib/processor.js`** → The core markdown-to-HTML conversion logic is shared between both implementations.
- **`lib/template.js`** → A simple, universal function that takes content and CSS to produce an HTML page. It has no environment-specific code.

## License

This project is Open Source and available under the MIT License  
2025 © MIT °// [veriKami] °// [Weronika Kami]

[veriKami]: https://verikami.com
[Weronika Kami]: https://linkedin.com/in/verikami
[module]: https://github.com/veriKami/remark-deflist-revisited

[Remark]: https://remark.js.org

[Codeflow Badge]: https://developer.stackblitz.com/img/open_in_codeflow.svg
[Codeflow]: https:///pr.new/veriKami/remark-deflist-revisited-dual?startScript=start

[StackBlitz Badge]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[StackBlitz]: https://stackblitz.com/github/veriKami/remark-deflist-revisited-dual?startScript=start

[Codesandbox Badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[Codesandbox]: https://codesandbox.io/p/github/veriKami/remark-deflist-revisited-dual

[Codespaces Badge]: https://github.com/codespaces/badge.svg
[Codespaces]: https://codespaces.new/veriKami/remark-deflist-revisited-dual?quickstart=1

[Cloudflare Badge]: https://deploy.workers.cloudflare.com/button
[Cloudflare]: https://deploy.workers.cloudflare.com/?url=https://github.com/veriKami/remark-deflist-revisited-dual
