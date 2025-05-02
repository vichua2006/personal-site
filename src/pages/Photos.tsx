import { useEffect } from "react";

const Photo = () => {
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
      <div className="font-bold mb-4 ">Photography</div>
      <p className="my-8 italic">
        work in progress, stay tuned! (photo layouts feel very annoying)
      </p>
    </div>
  );
};

export default Photo;
