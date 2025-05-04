import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Spotlight from "./components/Spotlight";
import Home from "./pages/Home";
import { useState } from "react";
import About from './pages/About';
import Photos from './pages/Photos';
import Writing from './pages/Writing';
import PostContent from "./pages/PostContent";

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
        <div className="flex-1 ms-10 md:mx-[30%] mt-30 p-4 min-h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<PostContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
