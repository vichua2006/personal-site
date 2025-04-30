import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";

const links = {
  Home: "/",
  About: "/about",
  Photographs: "/photos",
  Writing: "/writing",
};

const externals = {
  Github: { url: "https://github.com/vichua2006/", icon: <FaGithub /> },
  LinkedIn: {
    url: "https://linkedin.com/in/victor-qibin-huang",
    icon: <FaLinkedin />,
  },
  Email: { url: "/", icon: <FaEnvelope /> }, // TODO: Update email link
  Resume: { url: "/", icon: <FaFileAlt /> }, // TODO: Update resume link
};

interface Prop {
  selectedPage: string;
  handlePageSelection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ selectedPage, handlePageSelection }: Prop) => {
  return (
    <nav className="hidden fixed md:block w-[25%] text-gray-300 p-4 min-h-screen">
      <ul className="absolute right-0 space-y-4 mt-30 ">
        {/* Iterate over internal links */}
        {Object.entries(links).map(([text, url]) => (
          <li key={text}>
            <Link
              to={url}
              className={`block text-gray-300 hover:text-white ${
                text === selectedPage ? "font-bold" : ""
              }`}
              onClick={() => handlePageSelection(text)}
            >
              {text}
            </Link>
          </li>
        ))}

        <hr className="border-gray-700 my-4" />

        {/* Iterate over external links */}
        {Object.entries(externals).map(([text, { url, icon }]) => (
          <li key={text} className="flex items-center ">
            <a
              href={url}
              className="flex items-center space-x-2 text-gray-300 text-sm hover:text-white"
            >
              {icon}
              <span>{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
