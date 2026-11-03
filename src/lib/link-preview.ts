import { getPreviewFromContent } from "link-preview-js";
import { cache } from "react";

function httpUrl(value: string | undefined, base: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, base);
    return ["http:", "https:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

// Only used for author-supplied links in Server Components. Static exports
// fetch previews at build time; visitors don't need a preview API or script.
export const getLinkPreviewData = cache(async (href: string) => {
  const hostname = new URL(href).hostname.replace(/^www\./, "");
  const fallback = {
    title: hostname,
    siteName: hostname,
    description: "",
    image: undefined as string | undefined,
  };

  try {
    const response = await fetch(href, {
      cache: "force-cache",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const preview = await getPreviewFromContent(
      {
        url: response.url || href,
        headers: { "content-type": response.headers.get("content-type") || "text/html" },
        data: await response.text(),
      },
      {
        imagesPropertyType: "og",
        onResponse: (metadata, doc) => {
          const article = doc("article, [itemprop='articleBody'], .entry").first();
          let content = article.length ? article : doc("main, [role='main'], #content, .entry-content, .post-content").first();
          // Older pages may have no semantic content wrapper.
          if (!content.length) content = doc("h1").last().parent();
          metadata.title ||= doc("meta[name='twitter:title']").attr("content") || content.find("h1").first().text();
          metadata.description ||= doc("meta[name='twitter:description']").attr("content") || content.find("p")
            .toArray()
            .map((element) => doc(element).text().trim())
            .find((text) => text.length > 40);

          if (!metadata.images.length) {
            const image = doc("meta[name='twitter:image']").attr("content") || article.find("img[src]").first().attr("src");
            if (image) metadata.images = [image];
          }
          return metadata;
        },
      },
    );

    if (!("title" in preview)) return fallback;
    return {
      title: preview.title?.trim() || hostname,
      siteName: preview.siteName?.trim() || hostname,
      description: preview.description?.replace(/\s+/g, " ").trim() || "",
      image: httpUrl(preview.images[0], response.url || href),
    };
  } catch (error) {
    console.warn(`Could not load link preview for ${href}:`, error instanceof Error ? error.message : error);
    return fallback;
  }
});
