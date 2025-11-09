import { useEffect, useState } from "react";
import { getAllPostMetadata } from "src/utils/getPostData";
import { PostMetadata } from "src/types/PostMetadata";
import PostPreviewCard from "src/components/PostPreviewCards";

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
