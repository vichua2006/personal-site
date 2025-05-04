import postSlugs from "../data/postSlugs";
import { PostMetadata } from "../types/postMetadata";
import matter from "gray-matter";

const fetchMarkdown = async (slug: string) => {
  const response = await fetch(`/posts/${slug}.md`);
  if (!response.ok) {
    // throw new Error("Failed to fetch the Markdown file");
    return null; // gets passed up to components for error checking
  }
  const text = await response.text();
  return text;
};

export const getPostMetadata = async () => {
  const posts = await Promise.all(
    postSlugs.map(async (slug: string) => {
      const response = await fetch(`/posts/${slug}.md`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${slug}.md`);
      }
      const fileContent = await response.text();
      const matterResult = matter(fileContent);
      const metadata: PostMetadata = {
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
        slug: slug,
      };

      return metadata;
    })
  );
  return posts;
};

export const getPostContent = async (slug: string) => {
  const fileContent = await fetchMarkdown(slug);
  if (!fileContent) return null;
  const matterResult = matter(fileContent);
  return matterResult.content;
};
