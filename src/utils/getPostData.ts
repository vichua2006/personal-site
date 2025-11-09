import postSlugs from "src/data/postSlugs";
import { PostMetadata } from "src/types/PostMetadata";
import frontMatter from "front-matter";

const fetchMarkdown = async (slug: string) => {
  const response = await fetch(`/posts/${slug}.md`);
  if (!response.ok) {
    // throw new Error("Failed to fetch the Markdown file");
    return null; // gets passed up to components for error checking
  }
  const text = await response.text();
  const { attributes, body } = frontMatter(text);
  return {
    metadata: attributes, // Front matter metadata
    content: body, // Markdown content
  };
};

export const getAllPostMetadata = async () => {
  const posts = await Promise.all(
    postSlugs.map(async (slug: string) => {
      return getPostMetaData(slug);
    })
  );
  return posts as PostMetadata[];
};

export const getPostContent = async (slug: string) => {
  const fileContent = await fetchMarkdown(slug);
  if (!fileContent) return null;
  return fileContent.content;
};

export const getPostMetaData = async (slug: string) => {
  const fileContent = await fetchMarkdown(slug);
  if (!fileContent) return null;
  return fileContent.metadata as PostMetadata;
};
