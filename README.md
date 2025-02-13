# Github Grain Highlight
This is a small chrome extension that enables syntax highlighting on Github.com for [grain lang](https://grain-lang.org/).

## Installing
I am currently in the process of having this extension published to the chrome web store, in the meantime you can either download and build from source or copy the `extension.zip` artifact from the latest github actions run, once you have an packed extension you can go to manage your extensions in chrome and upload it as a packed extension.

## Building
```bash
npm ci # Install dependencies
npm run build # Build the extension
npm run pack # Pack the extension into a zip
```


## How it works
This extension works completely locally, it injects a content script that identifies grain code both in markdown codeblocks and grain files and uses [Shiki](https://shiki.style/) to perform syntax highlighting.

### Other languages
While this extension currently is built specifically for grain it should be fairly easy to adjust to any other language with a textmate grammar, if you're interested in this feel free to open an issue.

# TODO
+ Automate chrome web store release