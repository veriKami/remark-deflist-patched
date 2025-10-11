//: worker.js
//: --------------------------------------------------------
import { processMarkdown } from "./lib/processor.js";
import { createHTMLPage } from "./lib/template.js";
import { parse, serialize } from "cookie";

import css from "./styles/main.css" assert { type: "text" };
import md from "./examples/basic.md" assert { type: "text" };

const pageTitle = "Remark Deflist Revisited";

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

//: WORKER
//: --------------------------------------------------------
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const cookies = parse(request.headers.get("Cookie") || "");

    try {
      if (pathname === "/" && request.method === "GET") {
        const { processed, original } = cookies;
        if (processed && original) { //: Check for both cookies
          const page = await renderFormPage(
            decodeURIComponent(original),
            `${pageTitle} °// Processed Markdown`,
            decodeURIComponent(processed)
          );

          //: Headers object for multi-value headers
          const headers = new Headers({
            "Content-Type": "text/html; charset=utf-8",
          });
          headers.append("Set-Cookie", serialize("processed", "", { path: "/", expires: new Date(0) }));
          headers.append("Set-Cookie", serialize("original", "", { path: "/", expires: new Date(0) }));

          return new Response(page, { headers });
        } else {
          const page = await renderFormPage(md, `${pageTitle} °// Worker °// Live Demo`);
          return new Response(page, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      } else if (pathname === "/" && request.method === "POST") {
        const body = await request.text();
        const markdown = decodeURIComponent(body.split("=")[1] || "").replace(/\+/g, " ");
        const processedContent = await processMarkdown(markdown);

        //: Headers object for multi-value headers
        const headers = new Headers({
          Location: "/",
        });
        headers.append("Set-Cookie", serialize("processed", encodeURIComponent(processedContent), { path: "/", httpOnly: true }));
        headers.append("Set-Cookie", serialize("original", encodeURIComponent(markdown), { path: "/", httpOnly: true }));

        return new Response(null, { status: 303, headers });

      } else {
        return new Response("Not Found", {
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }
    catch (err) {
      console.error("❌ Error:", err.message);
      return new Response("Internal Server Error", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  },
};
