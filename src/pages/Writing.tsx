import { useEffect } from "react";

const Writing = () => {
  useEffect(() => {
    // Disable scrolling
    // document.body.style.overflow = "hidden";

    // reset to top of page
    window.scrollTo(0, 0);

    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="text-white">
      <div className="font-bold mb-4 ">Writing</div>
      <p className="my-4">
        A collection of interesting pieces of writing from my Obsidian Vault.
        Some are technical docs, some are little stories, and some are poem-ish fragments of thought.
      </p>

      <p className="my-8">
        Wish you some entertaining discoveries, enjoy!
      </p>

      <p className="my-8 italic">
        work in progress, stay tuned! (markdown rendering ugh)
      </p>
    </div>
  );
};

export default Writing;
