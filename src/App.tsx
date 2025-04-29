import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
// import About from './pages/About';
// import Photos from './pages/Photos';
// import Writing from './pages/Writing';

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 ms-10 md:mx-[30%]">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/photos" element={<Photos />} /> */}
            {/* <Route path="/writing" element={<Writing />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
