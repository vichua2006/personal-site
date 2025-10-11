import Link from "next/link";

interface ProjectCardProps {
  icon: string; // URL or path to the icon
  bgImage: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard = ({
  icon,
  bgImage,
  title,
  description,
  link
}: ProjectCardProps) => {
  return (
    <Link
      href={link} 
      className="z-50"
    >
      <div className="relative flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Icon */}
        <img
          src={icon}
          alt={`${title} icon`}
          className="w-16 h-16 rounded-md mr-4 z-10"
        />

        {/* Text Content */}
        <div className="z-10">
          <h3 className="text-md text-white">{title}</h3>
          <p className="text-sm text-gray-400">
            {description}
          </p>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0)), url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
