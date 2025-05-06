import { useEffect } from "react";
import Header from "../components/Header";
import Experience from "../components/Experience";

const Home = () => {
  // TODO: refactor to properly display hidden text
  // const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    // setSpotlightPosition({ x: e.clientX, y: e.clientY });
    e;
  };


  useEffect(() => {
    // Attach mousemove listener to track spotlight position
    window.addEventListener("mousemove", handleMouseMove);

    // reset to top of page
    // window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="text-white z-50">
      <Header />
      <p className="my-4">
        A CS student @{" "}
        <a
          href="https://uwaterloo.ca/"
          className="z-50 text-violet-400 underline underline-offset-4"
        >
          UWaterloo
        </a>
        , spending spare
        time as a devoted rock climber, badminton player, amateur photographer,
        and a wannabe writer for this site. Also occasionally found to be
        geeking out at theatre{" "}
        <a
          href="https://www.martin.com/en/products/mac-aura"
          className="z-50 text-violet-400 underline underline-offset-4"
        >
          lighting fixtures.
        </a>
      </p>
      <p className="my-4">
        Currently a Backend Developer for{" "}
        <a
          href="https://hackthenorth.com/"
          className="z-50 text-violet-400 underline underline-offset-4"
        >
          Hack the North
        </a>
        , building to help craft an event where both hackers and organizers can
        dream big. ⚙️💙
      </p>

      <p className="my-4">
        This site is a collection of my creations organized hapharzardly into
        several categories. Feel free to take a look around.
      </p>

      <br></br>

      <p className="hidden md:block my-4">
        P.S. <i>try turning the light on</i>
      </p>
      <p className="text-sm italic">
        (will eventually have things that only show when lit! still in progress
        🔧💪)
      </p>

      <hr className="border-gray-700 my-8" />

      <header>
        <div className="font-bold">Experience</div>
      </header>
{/* 
      <div
        style={{
          clipPath: `circle(150px at ${spotlightPosition.x}px ${spotlightPosition.y}px)`,
        }}
      >
        <p className="italic">hmm but this really ain't that bad ;)</p>
      </div> */}

      <Experience />
    </div>
  );
};

export default Home;
