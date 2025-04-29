import { Link } from "react-router-dom";

const links = {
  Home: "/",
  About: "/about",
  Photographs: "/photos",
  Writing: "/writing",
};

const externals = {
  Github: "https://github.com/vichua2006/",
  LinkedIn: "https://linkedin.com/in/victor-qibin-huang",
  Email: "/", //TODO:
  Resume: "/", // TODO:
};

function Sidebar() {
  return (
    <nav className="hidden fixed md:block w-[25%] text-gray-300 p-4 min-h-screen">
      <ul className="absolute right-0 space-y-4 mt-30 ">
        {/* Iterate over internal links */}
        {Object.entries(links).map(([text, url]) => (
          <li key={text}>
            <Link
              to={url}
              className="block text-gray-300 hover:text-white font-semibold"
            >
              {text}
            </Link>
          </li>
        ))}

        <hr className="border-gray-700 my-4" />

        {/* Iterate over external links */}
        {Object.entries(externals).map(([text, url]) => (
          <li key={text}>
            <a
              href={url}
              className="block text-gray-300 text-sm hover:text-white"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
