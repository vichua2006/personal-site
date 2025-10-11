import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { PostMetadata } from '../../src/types/PostMetadata';

interface PostProps {
  content: string | null;
  metadata: PostMetadata | null;
}

const PostContent = ({ content, metadata }: PostProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p className="italic">Loading ...</p>;
  }

  if (content === null || metadata === null) {
    return (
      <p className="italic bold text-white center">
        This post does not exist. Please go back to posts
      </p>
    );
  }

  return (
    <>
      <div className="markdown-container">
        <h2>{metadata.title}</h2>
        <p className="text-md text-gray-400 italic">{metadata.date}</p>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      {content.length > 1000 ? (
        <Link href="/writing" className="text-white flex items-center my-32">
          ← Back to all posts
        </Link>
      ) : null}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Import postSlugs
  const postSlugs = (await import('../../src/data/postSlugs')).default;
  
  const paths = postSlugs.map((slug: string) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Show 404 for non-existent posts
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Import server-side utilities
  const { getPostContentServer, getPostMetaDataServer } = await import('../../src/utils/getPostDataServer');
  
  const content = getPostContentServer(slug);
  const metadata = getPostMetaDataServer(slug);
  
  return {
    props: {
      content,
      metadata,
    },
  };
};

export default PostContent;
