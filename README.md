# veriKami °// Remark Deflist Revisited

[![pkg.pr.new][pkg.pr.new Badge]][pkg.pr.new]

My latest "pro bono" work – (npm/jsr) module for parsing nested definision lists.  
Developed on the margins of a certain markdown-related project.

## @verikami/remark-deflist-patched

<!--### Interactive Start-->
[![Codeflow][Codeflow Badge]][Codeflow #]
[![StackBlitz][StackBlitz Badge]][StackBlitz #]
[![Codesandbox][Codesandbox Badge]][Codesandbox #]

This (patched) version is primarily used for experimentation, testing and development.  
The base version can be found in the module **[`@verikami/remark-deflist-revisited`][page]**.

<!--### Cloudflare Worker Deploy-->
<!--[![Cloudflare][Cloudflare Badge]][Cloudflare #]-->

## @verikami/remark-deflist-revisited

[![GH][GH Badge]][GH]
[![CC][CC Badge]][CC]
[![CI][CI Badge]][CI]
[![NPM][NPM Badge]][NPM]
[![JSR][JSR Badge]][JSR]
[![Socket][Socket Badge]][Socket]

**[Remark]** plugin. A wrapper around `remark-deflist` with improved support for nested definition lists.
It preserves all the original functionality and performs additional processing.
**[Bun]**, **[Deno]** and **[Cloudflare Workers]** compatibility. Also works in **[Astro]** and web browser.

<hr style="height:1px;margin:15px 0 15px;">
<details name="d1"><summary><strong>Project Description</strong></summary><hr>

**The problem** with `remark-deflist` is that the plugin renders nested list items inside `<dd>` incorrectly.

### Markdown

```markdown
Term
: - item A
  - item B
  - item C
```

With `remark-deflist`

```html
<dl>
<dt> Term </dt>
<dd>
  <ul>
    <li> item A </li>
  </ul>
</dl>
<ul>
  <li> item B </li>
  <li> item C </li>
</ul>
```

With `@verikami/remark-deflist-revisited`

```html
<dl>
<dt>Term</dt>
<dd>
  <ul>
    <li> item A </li>
    <li> item B </li>
    <li> item C </li>
  </ul>
</dl>
```

<hr></details>
<details name="d2"><summary><strong>Installation and Usage</strong></summary><hr>

### Installation

```bash
ツ pnpm add @verikami/remark-deflist-revisited
ツ npm i @verikami/remark-deflist-revisited
```

Cloudflare Worker demo

```bash
ツ npx @verikami/remark-deflist-revisited@latest
ツ npx @verikami/remark-deflist-revisited --help
```

### Usage

<details><summary>Usage in Node.js</summary>

```js
import { remark } from "remark";
import html from "remark-html";
import deflist from "@verikami/remark-deflist-revisited";

const markdown = `
Term
: - item A
  - item B
  - item C
`;

const output = await remark()
  .use(deflist)
  .use(html)
  .process(markdown);

console.log(String(output));
```

</details>
<details><summary>Usage in Deno</summary>

```js
import { remark } from "npm:remark@^15";
import html from "npm:remark-html@^16";
import deflist from "npm:@verikami/remark-deflist-revisited";

// (...) same code as above
```

</details>
<details><summary>Usage in Astro</summary>

```js
import remarkDeflist from "@verikami/remark-deflist-revisited";

export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkDeflist
    ]
  }
});
```

</details>
<details><summary>Usage in Cloudflare Worker</summary>

```js
import { remark } from "remark";
import html from "remark-html";
import dedent from "dedent";
import deflist from "@verikami/remark-deflist-revisited";

export default {
  async fetch(request, env, ctx) {

    const markdown = dedent`
      Term
      :  - item A
         - item B
         - item C
    `;

    const output = await remark()
      .use(deflist)
      .use(html)
      .process(markdown);

    return new Response(String(output), {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
```

</details>
<details><summary>Usage in html</summary>

```html
<html>
  <head>
    <script type="module">
      import { remark } from "https://esm.sh/remark@15";
      import html from "https://esm.sh/remark-html@16";
      import dedent from "https://esm.sh/dedent@1";
      import deflist from "https://esm.sh/@verikami/remark-deflist-revisited";

      const render = async (markdown) => (
        await remark()
          .use(deflist)
          .use(html)
          .process(markdown)
      );

      const append = async (markdown) => {
        const output = await render(markdown);
        const el = document.getElementById("markdown");
        el.innerHTML += String(output);
      };

      const markdown = dedent`
        Term
        : - item A
          - item B
          - item C
      `;

      document.body.onload = append(markdown);

    </script>
  </head>
  <body>
    <div id="markdown"></div>
  </body>
</html>
```

</details>

### License

Original work — MIT © Alex Shaw

* [gh: Symbitic/remark-plugins](https://github.com/Symbitic/remark-plugins)
* [npm: remark-deflist](https://www.npmjs.com/package/remark-deflist)

2025 © MIT °// veriKami °// Weronika Kami

<hr></details>
<details name="d3" open><summary><strong>Examples and Templates</strong></summary><hr>

Example implementations for `@verikami/remark-deflist-revisited`.  
They are also published as standalone repositories (templates):

- **Simple** → [veriKami/remark-deflist-revisited-simple][+:simple]
- **Express.js** → [veriKami/remark-deflist-revisited-express][+:express]
- **Cloudflare Worker** → [veriKami/remark-deflist-revisited-worker][+:worker]
- **Astro** → [veriKami/remark-deflist-revisited-astro][+:astro]

### Live Examples

You can play with these examples via **[StackBlitz]** web IDE:

| Simple Example        | Express Example       | Worker Example        | Astro Example         |
|:----------------------|:----------------------|:----------------------|:----------------------|
|[![SB][SB Badge]][SB_s]|[![SB][SB Badge]][SB_e]|[![SB][SB Badge]][SB_w]|[![SB][SB Badge]][SB_a]|

### Interactive Installation

#### npm + pnpm + yarn

```bash
npm create remark-deflist-revisited@latest
```
```bash
pnpm create remark-deflist-revisited
```
```bash
yarn create remark-deflist-revisited
```

### Cloudflare Worker demo (via module itself)

```bash
npx @verikami/remark-deflist-revisited@latest
```
```bash
npx @verikami/remark-deflist-revisited --help
```

### License

2025 © MIT °// veriKami °// Weronika Kami

</details>
<hr style="height:1px;margin:15px 0 15px;">

```
        (▒)(▒)_______███☼███____(▒)(▒)
        (▒)(█)(▒)__ ███_☼██████
        _(▒)(▒)___██____████████
        _________██____███▒▒▄▒▒
        __________██____█▒▒▒▒▒▒
        ___________██____ █▒▒▒♥___(▒)(▒)
        ____________██_____▒▒____(▒)(█)(▒)
        __________ __██____▒▒______(▒)(▒)
        _____________██__▓▓▒▓_______█
        ________██__██ ▓▓▓▒▒▒▓____█
        _(▒)(▒)___███_ ▓▓_▓▓▓▓▓___█
        (▒)(█)(▒)______▓▓__▓▓▓▓▓___█
        _(▒)(▒)_____ _▓▓__▓▓▓▓▓___█___█
        ___________ ▓▓___▓▓▓▓_▓___█_█
        __________ ▓▓___▓▓▓▓__▓▓__█
        _________ ▓▓___███☼█__▓▓__█
        ___♥▒▒♥▒♥▒♥▒♥▒♥▒♥▒♥ __▓▓_█
        ___ ♥▒♥▒▒♥▒♥▒♥▒♥▒▒♥▒♥__▒▒▒
        ____ ♥▒♥▒▒♥▒♥▒♥▒▒♥▒▒♥▒____█
        ______ ♥▒▒♥▒♥▒♥▒♥▒♥▒▒♥▒♥__█
        ________ ♥▒▒♥▒▒♥▒♥▒▒♥▒▒♥▒♥
        ___________♥▒♥▒▒♥▒▒♥▒▒♥▒▒♥▒
        _______________▓▓_▓▓
        _(▒)(▒)_________▓▓_▓▓
        (▒)(█)(▒)_______▓▓_▓▓
        _(▒)(▒)_________▓▓_▓▓
        _______________▓▓_▓▓
        _______________▓▓▓▓
        _______________▓▓▓
        ______█████████
        ________██____██
        ______█☼█____██
        ______█_______██
        ______________█☼█
        ______________██__█▄
```

2025 © MIT °// [veriKami] °// [Weronika Kami]

[veriKami]: https://verikami.com
[Weronika Kami]: https://linkedin.com/in/verikami

[page]: https://verikami.github.io/remark-deflist-revisited
[inline]: https://verikami.github.io/remark-deflist-revisited/script.esm.sh.html
[generated]: https://verikami.github.io/remark-deflist-revisited/generated

[Remark]: https://github.com/remarkjs/remark
[remark-deflist]: https://www.npmjs.com/package/remark-deflist
[Bun]: https://bun.sh
[Deno]: https://deno.com
[Cloudflare Workers]: https://workers.cloudflare.com
[Astro]: https://astro.build
[StackBlitz]: https://stackblitz.com

[+:simple]: https://github.com/veriKami/remark-deflist-revisited-simple
[+:express]: https://github.com/veriKami/remark-deflist-revisited-express
[+:worker]: https://github.com/veriKami/remark-deflist-revisited-worker
[+:astro]: https://github.com/veriKami/remark-deflist-revisited-astro

[GH Badge]: https://img.shields.io/badge/GitHub-Repository-blue?logo=github
[GH]: https://github.com/veriKami/remark-deflist-revisited

[CC Badge]: https://codecov.io/github/veriKami/remark-deflist-revisited/graph/badge.svg?token=0EWE7CIAVI
[CC]: https://codecov.io/github/veriKami/remark-deflist-revisited

[CI Badge]: https://github.com/veriKami/remark-deflist-revisited/actions/workflows/publish.yml/badge.svg
[CI]: https://github.com/veriKami/remark-deflist-revisited/actions/workflows/publish.yml

[NPM Badge]: https://img.shields.io/npm/v/@verikami/remark-deflist-revisited?logo=npm&logoColor=white&labelColor=red&color=black
[NPM]: https://www.npmjs.com/package/@verikami/remark-deflist-revisited

[JSR Badge]: https://jsr.io/badges/@verikami/remark-deflist-revisited
[JSR]: https://jsr.io/@verikami/remark-deflist-revisited

[Downloads Badge]: https://img.shields.io/npm/dm/@verikami/remark-deflist-revisited.svg
[Downloads]: https://www.npmjs.com/package/@verikami/remark-deflist-revisited

[Socket Badge]: https://badge.socket.dev/npm/package/@verikami/remark-deflist-revisited
[Socket]: https://socket.dev/npm/package/@verikami/remark-deflist-revisited

[pkg.pr.new Badge]: https://pkg.pr.new/badge/veriKami/remark-deflist-patched
[pkg.pr.new]: https://pkg.pr.new/~/veriKami/remark-deflist-patched

[SB Badge]: https://developer.stackblitz.com/img/open_in_stackblitz_small.svg
[SB_s]: https://stackblitz.com/github/veriKami/remark-deflist-revisited/tree/main/samples/simple?startScript=start
[SB_e]: https://stackblitz.com/github/veriKami/remark-deflist-revisited/tree/main/samples/express?startScript=start
[SB_w]: https://stackblitz.com/github/veriKami/remark-deflist-revisited/tree/main/samples/worker?startScript=dev
[SB_a]: https://stackblitz.com/github/veriKami/remark-deflist-revisited/tree/main/samples/astro?startScript=dev

[Codeflow Badge]: https://developer.stackblitz.com/img/open_in_codeflow.svg
[Codeflow #]: https:///pr.new/veriKami/remark-deflist-patched?startScript=start

[StackBlitz Badge]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[StackBlitz #]: https://stackblitz.com/github/veriKami/remark-deflist-patched?startScript=start

[Codesandbox Badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[Codesandbox #]: https://codesandbox.io/p/github/veriKami/remark-deflist-patched

[Codespaces Badge]: https://github.com/codespaces/badge.svg
[Codespaces #]: https://codespaces.new/veriKami/remark-deflist-patched?quickstart=1

[Cloudflare Badge]: https://deploy.workers.cloudflare.com/button
[Cloudflare #]: https://deploy.workers.cloudflare.com/?url=https://github.com/veriKami/remark-deflist-patched
