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
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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

function getInitialTheme() {
  if (typeof window !== "undefined" && window.localStorage) {
    const stored = window.localStorage.getItem("theme");
    if (stored) return stored === "dark";
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    return mql.matches;
  }
  return true;
}

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
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
