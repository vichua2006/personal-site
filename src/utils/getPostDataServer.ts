import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import postSlugs from '../data/postSlugs';
import { PostMetadata } from '../types/PostMetadata';

// Server-side function to read markdown files
const readMarkdownFile = (slug: string) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'posts', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = frontMatter(fileContents);
    return {
      metadata: attributes,
      content: body,
    };
  } catch (error) {
    console.error(`Error reading file for slug: ${slug}`, error);
    return null;
  }
};

export const getAllPostMetadataServer = () => {
  const posts = postSlugs.map((slug: string) => {
    return getPostMetaDataServer(slug);
  }).filter(Boolean); // Remove any null results
  return posts as PostMetadata[];
};

export const getPostContentServer = (slug: string) => {
  const fileContent = readMarkdownFile(slug);
  if (!fileContent) return null;
  return fileContent.content;
};

export const getPostMetaDataServer = (slug: string) => {
  const fileContent = readMarkdownFile(slug);
  if (!fileContent) return null;
  return fileContent.metadata as PostMetadata;
};
