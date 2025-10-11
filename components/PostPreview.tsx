import { PostMetadata } from "../src/types/PostMetadata";
import PostPreviewCard from "./PostPreviewCards";

interface PostPreviewProps {
  posts: PostMetadata[];
}

const PostPreview = ({ posts }: PostPreviewProps) => {
  return (
    <div className="mt-4">
      <div className="space-y-4">
        {posts.map((data: PostMetadata) => {
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
