import deCivLogo from "public/logos/de-civai-logo.png";
import htnLogo from "public/logos/hack-the-north-logo.png";
import unbLogo from "public/logos/unb-logo.png";
import wargLogo from "public/logos/warg.png";
import tmtLogo from "public/logos/tmt-w-logo.png";
import toolbxLogo from "public/logos/toolbx-logo.png";
// all banners should be approximately l:h = 5:1
import htnBanner from "public/banner/htn-banner.png";
import ucsbBanner from "public/banner/deciv-banner.png";
import wargBanner from "public/banner/warg-banner.png";
import unbBanner from "public/banner/unb-banner.png";
import tmtBanner from "public/banner/tmt-ppl-banner.png";
import toolbxBanner from "public/banner/toolbx-banner.png";


export const projects = [
  {
    icon: toolbxLogo,
    bgImage: toolbxBanner,
    title: "TOOLBX",
    description: "Ecommerce for Modern Building Suppliers",
    link: "https://toolbox.com/",
  },
  {
    icon: htnLogo,
    bgImage: htnBanner,
    title: "Hack the North",
    description: "Canada's Biggest Hackathon",
    link: "https://hackthenorth.com/",
  },
  {
    icon: tmtLogo,
    title: "Tom Morrison Theatre",
    bgImage: tmtBanner,
    description: "Rocking Sound and Lighting!",
    link: "https://www.facebook.com/fhstmt/"
  },
  {
    icon: wargLogo,
    title: "Waterloo Aerial Robotics Group",
    bgImage: wargBanner,
    description: "Drone Computer Vision",
    link: "https://www.uwarg.com/"
  },
  {
    icon: deCivLogo,
    title: "UC Santa Barabra",
    bgImage: ucsbBanner,
    description: "Research On the Artificial Citizen",
    link: "https://www.linkedin.com/company/de-civai/posts/?feedView=all",
  },
  {
    icon: unbLogo,
    title: "UNB Physics Department",
    bgImage: unbBanner,
    description: "Exploring Lasers and Weather",
    link: "https://www.unb.ca/",
  },
];