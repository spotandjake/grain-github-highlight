import {
  createHighlighterCore,
  type HighlighterCore,
  type ShikiTransformer,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import githubDark from "@shikijs/themes/github-dark-default";
import grainSyntax from "./grain.json" assert { type: "json" };

let highlighter: undefined | HighlighterCore;

export enum HighlightView {
  General,
  File,
}
export default async (code: string, view = HighlightView.General) => {
  if (highlighter == undefined) {
    highlighter = await createHighlighterCore({
      // TODO: Allow customization
      langs: [grainSyntax as any],
      themes: [githubDark],
      engine: createJavaScriptRegexEngine(),
    });
  }
  const transformers: ShikiTransformer[] = [];
  switch (view) {
    case HighlightView.File:
      transformers.push({
        line(hastNode, line) {
          hastNode.tagName = "div";
          hastNode.properties["id"] = `LC${line}`;
          this.addClassToHast(hastNode, "react-code-text");
          this.addClassToHast(
            hastNode,
            "react-code-line-contents-no-virtualization",
          );
          this.addClassToHast(hastNode, "react-file-line");
          this.addClassToHast(hastNode, "html-div");
          return hastNode;
        },
      });
      break;
    case HighlightView.General:
      transformers.push({
        pre(hastNode) {
          hastNode.properties["style"] = "";
          return hastNode;
        },
      });
      break;
  }
  return highlighter.codeToHtml(code, {
    // TODO: Allow customization
    lang: "Grain",
    // TODO: Decide on a theme
    theme: "github-dark-default",
    transformers: transformers,
  });
};
