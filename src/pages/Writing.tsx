import { useEffect } from "react";
import PostPreview from "../components/PostPreview";

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
        Some are blog entries, some are technical docs, some are little stories, and some are poem-ish fragments of thought.
      </p>

      <p className="my-8 italic">
        Wish you some entertaining discoveries, enjoy.
      </p>



      <header>
        <div className="font-bold mt-16">Entries</div>
      </header>

      <hr className="border-gray-700 my-4" />

      <PostPreview />
    </div>
  );
};

export default Writing;
