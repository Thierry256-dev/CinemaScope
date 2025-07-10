import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./Components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import { AnimatePresence, motion } from "framer-motion";
import "./index.css"; // Import the global CSS file for Tailwind and other styles

function Layout({ children, darkMode, toggleDarkMode }) {
  return (
    <div
      className={
        darkMode ? "dark bg-gray-950 min-h-screen" : "bg-white min-h-screen"
      }
    >
      <div className="transition-colors duration-500">
        <NavBar />
        <div className="flex justify-end p-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded font-semibold shadow text-white"
            style={{
              background: darkMode
                ? "linear-gradient(90deg, #ff7849, #ffbf00, #ff4b5c)"
                : "linear-gradient(90deg, #ffbf00, #ff7849, #ff4b5c)",
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AppRoutes />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <MovieProvider>
      <Router>
        <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </MovieProvider>
  );
}

export default App;
