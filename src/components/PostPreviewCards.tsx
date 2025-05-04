import { Link } from "react-router-dom";
import { PostMetadata } from "../types/PostMetadata";

const PostPreviewCard = ({ title, date, description, slug }: PostMetadata) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <p className="text-sm text-gray-400">{date}</p>
        <Link
          to={`/writing/${slug}`}
        >
            <h3 className="text-md text-white font-medium hover:underline underline-offset-4">{title}</h3>
        </Link>
      </div>

      <div className="flex space-x-2 italic">{description}</div>
    </div>
  );
};

export default PostPreviewCard;
