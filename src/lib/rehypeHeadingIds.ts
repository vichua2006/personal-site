import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

function headingText(node: Element["children"][number]): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") {
    if (node.tagName === "img") return String(node.properties.alt ?? "");
    return node.children.map(headingText).join("");
  }
  return "";
}

export function headingId(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-") || "section";
}

export function rehypeHeadingIds() {
  return (tree: Root) => {
    const usedIds = new Set<string>();
    visit(tree, "element", (node) => {
      if (node.properties.id) usedIds.add(String(node.properties.id));
    });

    visit(tree, "element", (node) => {
      if (!/^h[1-6]$/.test(node.tagName) || node.properties.id) return;
      const base = headingId(node.children.map(headingText).join(""));
      let id = base;
      let suffix = 0;
      while (usedIds.has(id)) id = `${base}-${++suffix}`;
      usedIds.add(id);
      node.properties.id = id;
    });
  };
}
