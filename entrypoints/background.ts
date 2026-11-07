export default defineBackground(async () => {
  // Dynamically import the correct background script based on the browser environment
  if (import.meta.env.FIREFOX) {
    const { setupBrowserHighlight } = await import("../src/background.firefox");
    setupBrowserHighlight();
  } else {
    const { setupBrowserHighlight } = await import("../src/background.chrome");
    setupBrowserHighlight();
  }
});
