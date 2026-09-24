import Link from "next/link";

const Header = () => {
  return (
    <header className="text-white">
      <Link href="/">
        <div className="font-bold italic">Victor Huang</div>
      </Link>
    </header>
  );
};

export default Header;
