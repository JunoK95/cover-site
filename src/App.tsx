import "./App.css";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SkillsPage from "./pages/SkillsPage/SkillsPage";
import { NavigationOverlay } from "./layouts/NavigationOverlay";
// import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ContactPage from "./pages/ContactPage/ContactPage";

function App() {
  const location = useLocation();
  return (
    <>
      <NavigationOverlay>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            {/* <Route path="/projects" element={<ProjectsPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </NavigationOverlay>
    </>
  );
}

export default App;
