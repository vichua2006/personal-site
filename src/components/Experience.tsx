import ProjectCard from "../components/ProjectCards";
import deCivLogo from "../../public/logos/de_civai_logo.png";
import htnLogo from "../../public/logos/hack_the_north_logo.png";
import unbLogo from "../../public/logos/unb_logo.png";
import wargLogo from "../../public/logos/warg.png";
import tmtLogo from "../../public/logos/tmt-w-logo.png";
import atlcLogo from "../../public/logos/atlc_logo.png";
// all banners should be approximately l:h = 5:1
import htnBanner from "../../public/banner/htn-banner.png";
import ucsbBanner from "../../public/banner/deciv-banner.png";
import wargBanner from "../../public/banner/warg-banner.png";
import unbBanner from "../../public/banner/unb-banner.png";
import tmtBanner from "../../public/banner/tmt-ppl-banner.png";
import atlcBanner from "../../public/banner/atlc-banner.png";

const projects = [
  {
    icon: htnLogo,
    bgImage: htnBanner,
    title: "Hack the North",
    description: "Canada's Biggest Hackathon",
  },
  {
    icon: tmtLogo,
    title: "Tom Morrison Theatre",
    bgImage: tmtBanner,
    description: "Rocking Sound and Lighting!",
  },
  {
    icon: wargLogo,
    title: "Waterloo Aerial Robotics Group",
    bgImage: wargBanner,
    description: "Drone Computer Vision",
  },
  {
    icon: deCivLogo,
    title: "UC Santa Barabra",
    bgImage: ucsbBanner,
    description: "Research On the Artificial Citizen",
  },
  {
    icon: unbLogo,
    title: "UNB Physics Department",
    bgImage: unbBanner,
    description: "Exploring Lasers and Weather",
  },
  {
    icon: atlcLogo,
    title: "Atlantic Star Math Club",
    bgImage: atlcBanner,
    description: "Yappin' bout Math",
  },
];

const Experience = () => {
  return (
    <div className="mt-4">
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            icon={project.icon}
            bgImage={project.bgImage} 
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;