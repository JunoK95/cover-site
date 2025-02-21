import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import { NavigationOverlay } from './layouts/NavigationOverlay';

function App() {
  return (
    <>
      <NavigationOverlay>
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/skills' element={<SkillsPage />} />
          </Routes>
        </AnimatePresence>
      </NavigationOverlay>
    </>
  );
}

export default App;
