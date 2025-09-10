//: eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
        "node_modules/",
        "coverage/",
        "dist/",
        "lib/",
        "demo/",
        "deno/",
        "**/__*",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node
    },
  },
  tseslint.configs.recommended,
]);
