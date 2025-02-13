import { GRAIN_EXTENSION, GRAIN_NAME } from "./constants";
import { log } from "./helpers";
import highlight, { HighlightView } from "./highlight";
// Helpers
// Highlighters
const highlightBlameView = () => {
  // TODO: Implement Blame View
  log("Blame View detected");
};
const highlightReadingView = async (container: Element) => {
  if (container.getAttribute("highlighted") === "true") return;
  log("Highlighting Reading View");
  const codeBlock = container.querySelector("textarea");
  if (!codeBlock) return;
  const code = codeBlock.textContent;
  if (!code) return;
  const parser = new DOMParser();
  const highlighted = await highlight(code, HighlightView.File);
  const html = parser.parseFromString(highlighted, "text/html");
  const lines = [...html.body.querySelectorAll("code > div")];
  // Replace lines
  const lineContainer = container.querySelector(
    'div.react-code-lines > div[inert="inert"]',
  );
  if (!lineContainer) return;
  for (const line of lines) {
    const lineBlock = document.getElementById(line.id);
    if (!lineBlock) continue;
    if (line.children.length === 0) continue;
    lineBlock.replaceChildren(...line.children);
  }
  // Mark as highlighted
  container.setAttribute("highlighted", "true");
};
export const highlightMarkdownView = async () => {
  const markdownContainers = document.querySelectorAll(".markdown-body");
  for (const container of markdownContainers) {
    if (container.getAttribute("highlighted") === "true") continue;
    log("Highlighting Markdown Block");
    // gr code blocks
    // TODO: Allow user to provide list of language identifiers
    const codeBlocks = [
      ...container.querySelectorAll(`pre[lang=\"${GRAIN_NAME}\"] > code`),
      ...container.querySelectorAll(`pre[lang=\"${GRAIN_EXTENSION}\"] > code`),
    ];
    for (const codeBlock of codeBlocks) {
      const content = codeBlock.textContent;
      if (!content) continue;
      const highlighted = await highlight(content);
      const parentElement = codeBlock.parentElement;
      if (!parentElement) continue;
      parentElement.outerHTML = highlighted;
    }
    // Mark as highlighted
    container.setAttribute("highlighted", "true");
  }
};
// Resolvers
export const resolveFileViewRoute = () => {
  // Ensure we are viewing a file
  const fileBreadCrumb = document.querySelector(
    'div[data-testid="breadcrumbs-filename"]',
  );
  if (!fileBreadCrumb) return;
  const breadCrumbText = fileBreadCrumb.textContent;
  if (!breadCrumbText || !breadCrumbText.endsWith(`.${GRAIN_EXTENSION}`))
    return;
  // Blame View
  if (window.location.pathname.includes("/blame/")) {
    highlightBlameView();
    return;
  }
  // Reading View
  const container = document.querySelector(
    "div#highlighted-line-menu-positioner",
  );
  if (container) {
    highlightReadingView(container);
    return;
  }
};
