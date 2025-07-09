
const Footer = () => (
  <footer className="w-full text-center py-8 text-gray-400 text-sm bg-gray-950">
    <span>
      Developed by Victor Huang &copy; {new Date().getFullYear()} |{" "}
      <span className="inline-flex items-center gap-2 align-middle">
        <a href="https://cs.uwatering.com/#https://victorhuang.vercel.app/?nav=prev" className="text-gray-400">←</a>
        <a href="https://cs.uwatering.com/#https://victorhuang.vercel.app/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cs.uwatering.com/icon.white.svg"
            alt="CS Webring"
            className="w-6 h-auto opacity-80 inline"
          />
        </a>
        <a href="https://cs.uwatering.com/#https://victorhuang.vercel.app/?nav=next" className="text-gray-400">→</a>
      </span>
    </span>
  </footer>
);

export default Footer; 