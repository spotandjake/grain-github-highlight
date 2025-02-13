# Github Grain Highlight
This is a small chrome extension that enables syntax highlighting on Github.com for [grain lang](https://grain-lang.org/).


## How it works
This extension works completely locally, it injects a content script that identifies grain code both in markdown codeblocks and grain files and uses [Shiki](https://shiki.style/) to perform syntax highlighting.

# TODO
+ Automated github workflows
  + Run linting
  + Release as github artifact extension.zip
  + Release to chrome web store????
+ Publish