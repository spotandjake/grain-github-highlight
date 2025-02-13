import { GRAIN_EXTENSION } from "./constants";
import { log } from "./helpers";
import { resolveFileViewRoute, highlightMarkdownView } from "./github";
// Inject extension
let firstTime = true;
const main = async () => {
  const isFile = window.location.pathname.includes("/blob/");
  const isGrainFile =
    isFile && window.location.pathname.endsWith(`.${GRAIN_EXTENSION}`);
  const isMarkdownFile = isFile && window.location.pathname.endsWith(".md");
  if (isGrainFile) {
    resolveFileViewRoute();
  } else if (
    window.location.pathname.includes("/tree/") ||
    window.location.pathname.includes("/issues/") ||
    isMarkdownFile
  ) {
    await highlightMarkdownView();
  } else if (window.location.pathname.includes("/pull/")) {
    await highlightMarkdownView();
  } else {
    // Handles Main Page
    await highlightMarkdownView();
    // TODO: Handle commit view
    // TODO: Handle Blame view
    // TODO: Handle PR Review view
    log("Unknown page detected");
  }
  // We need to poll because of react routing
  firstTime = false;
  setTimeout(main, firstTime ? 300 : 2250);
};
main();
