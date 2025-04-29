import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-white">
      <Link to="/">
        <div className="font-bold italic">Victor Huang</div>
      </Link>
    </header>
  );
};

export default Header;
