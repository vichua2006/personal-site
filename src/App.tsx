import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "src/components/Sidebar";
import Spotlight from "src/components/Spotlight";
import Home from "src/pages/Home";
import About from "src/pages/About";
import Photos from "src/pages/Photos";
import Writing from "src/pages/Writing";
import PostContent from "src/pages/PostContent";
import Footer from "src/components/Footer";

const App = () => {
  const [selectedPage, updateSelectedPage] = useState<string>("Home");

  return (
    <Router>
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
        <div className="flex-1 mx-10 md:mx-[30%] mt-30 p-4 min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<PostContent />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
