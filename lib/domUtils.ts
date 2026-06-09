/**
 * Recursively parses DOM nodes under an element and wraps words in text nodes
 * with a span tag (.blur-word) for animations, while leaving layout tags
 * (e.g. <br />, <span>) and styling classes completely intact.
 */
export function splitTextIntoWords(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue || "";
    if (text.trim() === "") return;
    const parent = node.parentNode;
    if (!parent) return;

    const fragment = document.createDocumentFragment();
    // Split by spaces but preserve whitespace sequences
    const words = text.split(/(\s+)/);

    words.forEach((w) => {
      if (w.trim() === "") {
        fragment.appendChild(document.createTextNode(w));
      } else {
        const span = document.createElement("span");
        span.className = "blur-word";
        span.textContent = w;
        fragment.appendChild(span);
      }
    });

    parent.replaceChild(fragment, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    // Don't process script, style, or already split elements
    if (element.tagName === "SCRIPT" || element.tagName === "STYLE" || element.classList.contains("blur-word")) {
      return;
    }
    const children = Array.from(node.childNodes);
    children.forEach((child) => {
      splitTextIntoWords(child);
    });
  }
}
