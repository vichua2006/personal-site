import { useEffect, useState } from "react";
import { getAllPostMetadata } from "../utils/getPostData";
import { PostMetadata } from "../types/postMetadata";
import PostPreviewCard from "./PostPreviewCards";

const PostPreview = () => {
  const [metadata, setMetadata] = useState<PostMetadata[]>([]);

  useEffect(() => {
    getAllPostMetadata().then((data) => setMetadata(data));
  }, []);

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {metadata.map((data: PostMetadata) => {
          return (
            <PostPreviewCard
              key={data.slug}
              title={data.title}
              description={data.description}
              date={data.date}
              slug={data.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostPreview;
