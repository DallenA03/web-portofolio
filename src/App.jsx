import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import ExperienceDetail from "./pages/ExperienceDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
