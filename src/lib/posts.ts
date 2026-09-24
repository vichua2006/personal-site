import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import frontMatter from "front-matter";

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function dateValue(date: string): number {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  if (!match) throw new Error(`Invalid post date: ${date}`);
  const [, month, day, year] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function readPost(slug: string): Post {
  const source = readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8");
  const { attributes, body } = frontMatter<Partial<PostMetadata>>(source);

  if (
    attributes.slug !== slug ||
    typeof attributes.title !== "string" ||
    typeof attributes.description !== "string" ||
    typeof attributes.date !== "string"
  ) {
    throw new Error(`Invalid frontmatter in ${slug}.md`);
  }

  dateValue(attributes.date);
  return {
    title: attributes.title,
    date: attributes.date,
    description: attributes.description,
    slug,
    content: body,
  };
}

export function getAllPosts(): Post[] {
  return readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => readPost(filename.slice(0, -3)))
    .sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

export function getPost(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const filename = `${slug}.md`;
  if (!readdirSync(postsDirectory).includes(filename)) return null;
  return readPost(slug);
}
