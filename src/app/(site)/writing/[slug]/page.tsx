import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import ArticleHeading from "src/components/ArticleHeading";
import { SpotlightBlock, SpotlightInline } from "src/components/SpotlightText";
import { getAllPosts, getPost } from "src/lib/posts";
import { remarkSpotlight } from "src/lib/remarkSpotlight";
import { headingId, rehypeHeadingIds } from "src/lib/rehypeHeadingIds";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

const markdownComponents = {
  h1: ({ children, id }) => <ArticleHeading as="h1" id={id}>{children}</ArticleHeading>,
  h2: ({ children, id }) => <ArticleHeading id={id}>{children}</ArticleHeading>,
  h3: ({ children, id }) => <ArticleHeading as="h3" id={id}>{children}</ArticleHeading>,
  h4: ({ children, id }) => <ArticleHeading as="h4" id={id}>{children}</ArticleHeading>,
  h5: ({ children, id }) => <ArticleHeading as="h5" id={id}>{children}</ArticleHeading>,
  h6: ({ children, id }) => <ArticleHeading as="h6" id={id}>{children}</ArticleHeading>,
  "spotlight-inline": ({ children }: { children?: React.ReactNode }) => (
    <SpotlightInline>{children}</SpotlightInline>
  ),
  "spotlight-block": ({ children }: { children?: React.ReactNode }) => (
    <SpotlightBlock>{children}</SpotlightBlock>
  ),
  spotlight: ({ children }: { children?: React.ReactNode }) => (
    <SpotlightBlock>{children}</SpotlightBlock>
  ),
} as Components;

export default async function PostPage({ params }: PageProps) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <div className="markdown-container">
        <ArticleHeading id={`article-${headingId(post.title)}`}>{post.title}</ArticleHeading>
        <p className="text-md text-gray-400 italic">{post.date}</p>
        <ReactMarkdown
          remarkPlugins={[remarkDirective, remarkSpotlight]}
          rehypePlugins={[rehypeRaw, rehypeHeadingIds]}
          components={markdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      {post.content.length > 1000 ? (
        <Link href="/writing" className="text-gray-400 hover:text-gray-200 flex items-center my-32">
          ← Back to all posts
        </Link>
      ) : null}
    </>
  );
}
