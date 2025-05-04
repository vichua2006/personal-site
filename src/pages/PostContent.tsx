import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostContent, getPostMetaData } from "../utils/getPostData";
import { Link } from "react-router-dom";
import { PostMetadata } from "../types/PostMetadata";
import postSlugs from "../data/postSlugs";

const PostContent = () => {
  const { slug } = useParams(); // Access the dynamic parameter

  if (!postSlugs.includes(slug!)) {
    return (
      <p className="italic bold text-white center">
        This post does not exist. Please go back to posts
      </p>
    );
  }

  const [mkdContent, setMkdContent] = useState<string | null>("");
  const [metadata, setMetadata] = useState<PostMetadata | null>(null);

  useEffect(() => {
    getPostContent(slug!).then((content) => setMkdContent(content));
    getPostMetaData(slug!).then((data) => setMetadata(data));
  }, []);

  if (mkdContent === "") {
    return <p className="italic">Loading ...</p>;
  }

  return (
    <>
      {mkdContent === null ? (
        <p className="italic">This post does not exist</p>
      ) : (
        <>
          <div className="markdown-container">
            <h2>{metadata?.title}</h2>
            <p className="text-md text-gray-400 italic">{metadata?.date}</p>
            <ReactMarkdown>{mkdContent}</ReactMarkdown>
          </div>
          {mkdContent.length > 1000 ? ( // parent link for longer posts
            <Link to="/writing" className="text-white flex items-center my-32">
              ← Back to all posts
            </Link>
          ) : null}
        </>
      )}
    </>
  );
};

export default PostContent;
