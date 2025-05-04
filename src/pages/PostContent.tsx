import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostContent } from "../utils/getPostData";
import { Link } from "react-router-dom";

const PostContent = () => {
  const { slug } = useParams(); // Access the dynamic parameter
  const [mkdContent, setMkdContent] = useState<string | null>("");

  useEffect(() => {
    getPostContent(slug!).then((content) => setMkdContent(content));
  }, []);

  if (mkdContent === "") {
    return <p className="italic">Loading ...</p>;
  }

  return (
    <>
      <div className="markdown-container text-white">
        {mkdContent === null ? (
          <p className="italic">This post does not exist</p>
        ) : (
          <ReactMarkdown>{mkdContent}</ReactMarkdown>
        )}
      </div>
      <Link
        to="/writing"
        className="text-white flex items-center mb-4"
      >
        ← Back to all posts
      </Link>
    </>
  );
};

export default PostContent;
