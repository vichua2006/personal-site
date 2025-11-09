import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaBars, FaTimes, FaLink } from "react-icons/fa";
import { useState } from "react";

const links = {
  Home: "/",
  About: "/about",
  Writing: "/writing",
};

const externals = {
  Arena: { url: "https://www.are.na/victor-huang/channels", icon: <FaLink /> },
  Github: { url: "https://github.com/vichua2006/", icon: <FaGithub /> },
  LinkedIn: {
    url: "https://linkedin.com/in/victor-qibin-huang",
    icon: <FaLinkedin />,
  },
  Email: { url: "mailto:victor.huang1@uwaterloo.ca", icon: <FaEnvelope /> },
  Resume: { url: "/resume.pdf", icon: <FaFileAlt /> },
};

interface Prop {
  selectedPage: string;
  handlePageSelection: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ selectedPage, handlePageSelection }: Prop) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (text: string) => {
    handlePageSelection(text);
    setIsMobileMenuOpen(false); // Close mobile menu when link is clicked
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 right-4 z-60 p-2 text-gray-300 hover:text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Desktop sidebar */}
      <nav className="hidden fixed md:block w-[25%] text-gray-300 p-4 min-h-screen">
        <ul className="absolute right-0 space-y-4 mt-30">
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
            <li key={text} className="flex items-center">
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

      {/* Mobile overlay */}
      <div
        className={`
          md:hidden fixed inset-0 z-40
          transition-all duration-300
          ${isMobileMenuOpen ? "bg-black/60 opacity-100 pointer-events-auto" : "bg-black/0 opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile sidebar */}
      <nav
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-gray-900 text-gray-300 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="space-y-6 mt-16">
          {/* Iterate over internal links */}
          {Object.entries(links).map(([text, url]) => (
            <li key={text}>
              <Link
                to={url}
                className={`block text-gray-300 hover:text-white text-lg ${
                  text === selectedPage ? "font-bold text-white" : ""
                }`}
                onClick={() => handleLinkClick(text)}
              >
                {text}
              </Link>
            </li>
          ))}

          <hr className="border-gray-700 my-6" />

          {/* Iterate over external links */}
          {Object.entries(externals).map(([text, { url, icon }]) => (
            <li key={text} className="flex items-center">
              <a
                href={url}
                className="flex items-center space-x-3 text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {icon}
                <span>{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
