import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // reset to top of page
    window.scrollTo(0, 0);

    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="text-white">
      <div className="font-bold mb-4 ">About</div>
      <blockquote className="p-4 my-4 border-s-4 border-violet-800/40 dark:bg-violet-950/20">
        <p className="italic leading-relaxed text-white">
          Rather than basking in the warm spotlight glow,
        </p>
        <p className="italic leading-relaxed text-white">
          I choose to be the quiet hand that lights the stage ablaze.
        </p>
      </blockquote>

      <p className="my-4">
        If being a theatre technician has taught me anything in life, it's that
        helping others shine brings twice the joy—because when the actors
        perform their best, the audience shares in that magic. There's
        something deeply fulfilling about working behind the scenes to make
        everything run smoothly.
      </p>

      <p className="my-4">
        Today, I strive to carry that same spirit into software development:
        building systems and tools that may not always be seen, but are
        essential in enabling others to succeed, connect, and create something
        meaningful.
      </p>

      <p className="my-8 italic">
        hmm, it looks a little dark down there...
      </p>
    </div>
  );
};

export default About;
