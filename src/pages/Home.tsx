import { useState, useEffect } from "react";
import Header from "../components/Header";
import Experience from "../components/Experience";

const Home = () => {
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    // setSpotlightPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Attach mousemove listener to track spotlight position
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    //TODO: move this to app to standardize all pages
    <div className="mt-30 p-4 min-h-screen text-white">
      <Header />
      <p className="my-4">
        A CS student @UWaterloo, who currently have no idea what he's doing in
        life, spending spare time as a devoted rock climber, badminton player,
        amateur photographer, and a wannabe writer for this site.
        Also occasionally found to be geeking out at theatre lighting fixtures.
      </p>
      <p className="my-4">
        Currently a Backend Developer for{" "}
        <a
          href="https://hackthenorth.com/"
          className="text-violet-400 underline underline-offset-4"
        >
          Hack the North
        </a>
        , building to help craft an event where both hackers and organizers can dream big.
        ⚙️💙
      </p>

      <p className="my-4">
        This site is a collection of my creations organized hapharzardly into
        several categories. Feel free to take a look around.
      </p>

      <br></br>

      <p className="hidden md:block my-4">
        P.S. <i>try turning the light on</i>
      </p>
      <p className="text-sm italic">(will eventually have things that only show when lit! still in progress 🔧💪)</p>

      <hr className="border-gray-700 my-8" />

      <header>
        <div className="font-bold">Experience</div>
      </header>

      <blockquote className="p-4 my-4 border-s-4 border-violet-800/40 dark:bg-violet-950/20">
        <p className="italic leading-relaxed text-white">
          Rather than basking in the warm spotlight glow,
        </p>
        <p className="italic leading-relaxed text-white">
          I choose to be the quiet hand that lights the stage ablaze.
        </p>
      </blockquote>
      <div style={{
        clipPath: `circle(150px at ${spotlightPosition.x}px ${spotlightPosition.y}px)`,
      }}>
        {/* <p className="italic">hmm but this really ain't that bad ;)</p> */}
      </div>

      <Experience />
    </div>
  );
};

export default Home;
