import { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Spotlight from "./Spotlight";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [selectedPage, updateSelectedPage] = useState<string>("Home");

  return (
    <>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div className="hidden md:block">
          <Spotlight />
        </div>
        {/* Sidebar */}
        <Sidebar
          selectedPage={selectedPage}
          handlePageSelection={updateSelectedPage}
        />

        {/* Main Content Area */}
        <div className="flex-1 ms-10 md:mx-[30%] mt-30 p-4 min-h-screen ">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
