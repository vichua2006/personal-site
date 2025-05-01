import Header from "../components/Header";

const Home = () => {
  return ( //TODO: move this to app to standardize all pages
    <div className="mt-30 p-4 min-h-screen text-white">
      <Header />
      <p className="my-4">
        A CS student @UWaterloo, who currently have no idea what he's doing in life, 
        spending their spare time as a devoted rock climber, badminton player, amateur photographer, and a wannabe writer for this site.
      </p>
      <p className="my-4">
        Currently a Backend Developer for <a href="https://hackthenorth.com/" className="text-violet-400 underline underline-offset-4">Hack the North</a>,
        dreaming big to improve the experience of both hackers and organizers. ⚙️💙
      </p>
      <p className="my-4">
        Rather than working in the spotlight,
        I'd prefer to be the person creating it,
        switching out the blubs, tuning the colors, 
        focusing it, and shining it on stage.
      </p>
    </div>
  );
};

export default Home;
