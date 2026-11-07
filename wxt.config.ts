import { defineConfig } from "wxt";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

export default defineConfig({
  outDir: "dist",
  manifestVersion: 3,
  manifest: ({ browser }) => ({
    name: "Grain Syntax Highlighter",
    description: "Grain Source Code Highlighting on Github.com",
    icons: {
      16: "/icons/icon.png",
      32: "/icons/icon.png",
      48: "/icons/icon.png",
      128: "/icons/icon.png",
    },
    permissions:
      browser === "firefox" ? ["scripting"] : ["offscreen", "scripting"],
    host_permissions: ["https://github.com/*"],
    content_security_policy: {
      extension_pages:
        "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
    },
    browser_specific_settings: {
      gecko: {
        // TODO: Change this for proper release
        id: "spotandjake@grain-lang.org",
        strict_min_version: "121.0",
        data_collection_permissions: {
          required: ["none"],
        },
      },
    }
  }),
  hooks: {
    'build:before': async () => {
      const publicDir = path.resolve("./public");
      // Vendor `highlights.scm` to `./public/highlights.scm` so that it can be loaded by the extension at runtime.
      const highlightsScmPath = fileURLToPath(import.meta.resolve("tree-sitter-grain/queries/highlights.scm"));
      await fs.copyFile(highlightsScmPath, path.join(publicDir, "highlights.scm"));
      // Vendor `tree-sitter-grain.wasm` to `./public/tree-sitter-grain.wasm` so that it can be loaded by the extension at runtime.
      const wasmRoot = fileURLToPath(import.meta.resolve("tree-sitter-grain/tree-sitter-grain.wasm"));
      await fs.copyFile(wasmRoot, path.join(publicDir, "tree-sitter-grain.wasm"));

      // Vendor `web-tree-sitter.wasm` to `./public/web-tree-sitter.wasm` so that it can be loaded by the extension at runtime.
      const webTreeSitterWasmPath = fileURLToPath(import.meta.resolve("web-tree-sitter/web-tree-sitter.wasm"));
      await fs.copyFile(webTreeSitterWasmPath, path.join(publicDir, "web-tree-sitter.wasm"));
    },
  },
});
