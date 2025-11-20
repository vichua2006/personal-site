import Header from "src/components/Header";
import Experience from "src/components/Experience";
import SpotlightText from "src/components/SpotlightText";

const Home = () => {
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
        time as a climber for some rocks and a writer for this site. Also occasionally found to be
        geeking out at theatre{" "}
        <a
          href="https://www.martin.com/en/products/mac-aura"
          className="z-50 text-violet-400 underline underline-offset-4"
        >
          lighting fixtures
        </a>
        , DSA problems, and other people's personal websites.
      </p>

      <p className="my-4">
        Currently building some fun payment solutions at {" "}
        <a
          href="https://toolbx.com/"
          className="z-50 text-violet-400 underline underline-offset-4"
        >
          TOOLBX
        </a>
      </p>     

      <p className="my-4">
        Also a Backend Developer for{" "}
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
        <SpotlightText>
          (will eventually have things that only show when lit! still in progress
          🔧💪)
        </SpotlightText>
      </p>

      <hr className="border-gray-700 my-8" />

      <header>
        <div className="font-bold">Experience</div>
      </header>

      <Experience />
    </div>
  );
};

export default Home;
