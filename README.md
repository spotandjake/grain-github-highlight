# Github Grain Highlight

Grain Highlight is a small chrome/firefox extension enabling syntax highlighting for [Grain](https://grain-lang.org/) on github.

## Getting Started

There currently exist two options for installing the extension:
1) Through the [Chrome Web Store](https://chromewebstore.google.com/detail/grain-syntax-highlighter/feljoccdillnkkbkpjanfabndijdndgp)
2) Building from source:

```bash
git clone https://github.com/spotandjake/grain-github-highlight --recurse-submodules
npm ci # Install the dependencies
npm run build # Build the extension
npm run pack # Package the extension
```

## Commands
* `npm run clean` - Cleans up build artifacts
* `npm run format` - Run's the formatter on the code base
* `npm run lint` - Checks the formatting on the code base
* `npm run build` - Build the extension
* `npm run pack` - Packages the extension to `./dist/` for both Chrome and Firefox
* `npm run pack:chrome` - Packages to `./dist/github-grain-highlight-*-chrome.zip`
* `npm run pack:firefox` - Packages to `./dist/github-grain-highlight-*-firefox.zip`
* `npm run dev` - Develop with Chrome
* `npm run dev:firefox` - Develop with firefox.

## How it works
The extension operates entirely on the client. It injects a content script that searches `github.com` domains for Grain code, across snippets, markdown blocks and `.gr` files.

Highlighting is done with [Treelight](https://github.com/matoous/treelight) using the Grain grammar and queries vendored from [`tree-sitter-grain`](https://github.com/Kara-Zor-El/tree-sitter-grain) in `public/`

Highlighting runs via [Treelight](https://github.com/matoous/treelight) (`@treelight/browser`) with the Grain grammar/queries in `public/`

In **Chrome**, highlighting runs in an extension using the [offscreen document api](https://developer.chrome.com/docs/extensions/reference/api/offscreen).

In **Firefox**, highlighting runs in an event page (Firefox has no Offscreen API).

# TODO
+ Automate chrome web store / Firefox add-ons release
