//: lib/template.js
//: --------------------------------------------------------
export function createHTMLPage(content, title = "Remark Deflist Revisited", css = "") {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${css}</style>
  </head>
<body>
  <h1>${title}</h1>
  <div class="container">
    ${content}
  </div>
  <p style="text-align: center; color: #6b7280; font-size: 0.9em;">
    Powered by @verikami/remark-deflist-revisited
  </p>
</body>
</html>`;
}
