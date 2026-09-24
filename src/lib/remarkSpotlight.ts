import type { Root } from "mdast";
import { visit } from "unist-util-visit";

type DirectiveNode = {
  type: string;
  name?: string;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
};

export function remarkSpotlight() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const directive = node as DirectiveNode;
      if (directive.name !== "spotlight") return;

      if (directive.type === "textDirective") {
        directive.data ??= {};
        directive.data.hName = "spotlight-inline";
      } else if (directive.type === "containerDirective") {
        directive.data ??= {};
        directive.data.hName = "spotlight-block";
      }
    });
  };
}
