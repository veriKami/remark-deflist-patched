//: server.js
//: --------------------------------------------------------
import { createServer } from "node:http";
import { parse } from "node:url";
import { readFileSync } from "node:fs";
import { parse as parseCookie, serialize } from "cookie";
import { processMarkdown } from "./lib/processor.js";
import { createHTMLPage } from "./lib/template.js";

const css = readFileSync("styles/main.css", "utf-8");
const md = readFileSync("examples/basic.md", "utf-8");

const pageTitle = "Remark Deflist Revisited";
const PORT = process.env.PORT || 3000;

//: FORM
//: --------------------------------------------------------
async function renderFormPage(markdown, title, processedContent = null) {
  const content = processedContent || await processMarkdown(markdown);
  const formHTML = `
    <div class="form-column">
      <form method="POST" action="/">
        <h2>Try it yourself</h2>
        <textarea name="markdown" placeholder="Enter your markdown...">${markdown}</textarea>
        <button type="submit">Process Markdown</button>
      </form>
    </div>
    <div class="output-column">
      <h2>Output</h2>
      ${content}
    </div>
  `;
  return createHTMLPage(formHTML, title, css);
}

//: HANDLER
//: --------------------------------------------------------
async function handleRequest(req, res) {
  const { pathname } = parse(req.url, true);
  const cookies = parseCookie(req.headers.cookie || "");

  try {
    if (pathname === "/" && req.method === "GET") {
      const { processed, original } = cookies;
      if (processed && original) { //: Check for both cookies
        const page = await renderFormPage(
          decodeURIComponent(original),
          `${pageTitle} °// Processed Markdown`,
          decodeURIComponent(processed)
        );
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Set-Cookie": [
            serialize("processed", "", { path: "/", expires: new Date(0) }),
            serialize("original", "", { path: "/", expires: new Date(0) }),
          ],
        });
        res.end(page);
      } else {
        const page = await renderFormPage(md, `${pageTitle} °// Server °// Live Demo`);
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(page);
      }
    } else if (pathname === "/" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        const markdown = decodeURIComponent(body.split("=")[1] || "").replace(/\+/g, " ");
        const processedContent = await processMarkdown(markdown);
        res.writeHead(303, {
          Location: "/",
          "Set-Cookie": [
            serialize("processed", encodeURIComponent(processedContent), { path: "/", httpOnly: true }),
            serialize("original", encodeURIComponent(markdown), { path: "/", httpOnly: true }),
          ],
        });
        res.end();
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
    }
  }
  catch (err) {
    console.error("❌ Error:", err.message);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
}

//: SERVER
//: --------------------------------------------------------
const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log("👄 Processing Markdown");
  console.log(`🌐 http://localhost:${PORT}\n`);
});
