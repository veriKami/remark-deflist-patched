//: --------------------------------------------------------
//: scripts/sample.server.x.js
//: --------------------------------------------------------
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { createServer } from "node:http";
import { remark } from "remark";
import html from "remark-html";
import dedent from "dedent";
//: -----------------------------------------
import deflist from "../dist/index.js";
// import deflist from "../src/index.simple.ts";
// import deflist from "../src/index.old.ts";
// import deflist from "../src/index.ts";

const execAsync = promisify(exec);
const PORT = process.env.PORT || 3000;

//: Sample markdown to process
//: -----------------------------------------
const markdown = dedent.withOptions({ alignValues: true })`
  ## Remark Deflist Revisited °// Processing Example

  Remark Deflist Revisited Module
  : **Compatible** with Bun, Deno and Cloudflare Workers
  : **Enhanced** definition lists support
  : **Supports** nested lists

  Nested Lists
  : **Support** for complex structures
  : - Item A
      - Item B
        - Item C

  Compatibility
  : **Works** with modern runtimes
  : - Node.js
    - Cloudflare Workers
    - Deno
    - Bun
`;

//: Formatting function
//: -----------------------------------------
async function formatCode(code, $ = false, ext = "html") {
  //return $ && escapeHtml(code) || code;
  try {
    const { stdout } = await execAsync(
      `echo ${JSON.stringify(code)} | dprint fmt --stdin "temp.${ext}"`,
      { shell: true }
    );
    return $ && escapeHtml(stdout) || stdout;
  }
  catch (err) {
    console.error("ERROR Formatting:", err);
    return $ && escapeHtml(code) || code;
  }
}

//: Escaping function
//: -----------------------------------------
function escapeHtml(html) {
  return html.replace(/</g, "&#x3C;");
}

//: Processing function
//: -----------------------------------------
async function processMarkdown(markdown) {
  const output = await remark()
    .use(deflist)
    .use(html)
    .processSync(markdown)
    .toString()
    .replace(/<ul>/g, "\n<ul>")
    .replace(/^\s*$\r?\n/gm, "");

  const escaped = await formatCode(output, true);
  const pure = await formatCode(output);

  return await formatCode(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Remark Deflist Revisited °// Processing Example</title>
        <meta name="author" content="veriKami °// Weronika Kami">
        <style>
          html { min-height: 100%; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.2;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
          }
          .container {
            background: #333;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          h1, h2 { color: hotpink; margin-top: 0; }
          dl { margin: 10px 0; }
          dt {
            font-weight: bold;
            font-size: 1.1em;
            margin: 20px 0;
            color: #667eea;
          }
          dd {
            margin: 5px 0 0 40px;
            padding: 0;
            color: #666;
          }
          p { margin: 5px 0 0; padding: 0;}
          ul { margin: 0 10px; }
          li { margin: 0; }
          a, a:visited { color: silver; text-decoration: none; }
          a:hover { text-decoration: underline; }
          footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #888;
          }
          div.pure, pre {
            padding: 15px;
            border: 1px solid #ddd;
            background: #f5f5f5;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>veriKami °// Remark Deflist Revisited</h1>
          <div class="pure">${pure}</div>
          <pre>${markdown}</pre>
          <pre>${escaped}</pre>
          <footer>
            Created by <a href="https://verikami.com" target="_blank">veriKami</a> °//
            <a href="https://linkedin.com/in/verikami" target="_blank">Weronika Kami</a> \\&#92;°
            <a href="https://www.npmjs.com/package/@verikami/remark-deflist-revisited"
              target="_blank">remark-deflist-revisited</a>
          </footer>
        </div>
      </body>
    </html>
  `);
}

//: -----------------------------------------
//: MAIN

const output = await processMarkdown(markdown);

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(output);
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
