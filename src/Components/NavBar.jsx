import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Watchlist", to: "/watchlist" },
  { name: "About", to: "/about" },
  { name: "Add Review", to: "/add-review" },
];

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 bg-black/70 backdrop-blur-md text-white w-full shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold tracking-wide">
            CinemaScope
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-950 text-yellow-400"
                      : "hover:bg-gray-900 hover:text-yellow-400"
                  }`
                }
                end={link.to === "/"}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          {/* Theme toggle & mobile menu button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-900 hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-amber-300 w-5 h-5" />
              ) : (
                <FaMoon className="text-blue-300 w-5 h-5" />
              )}
            </button>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={handleMenuToggle}
              aria-label="Open menu"
            >
              {menuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 pb-4">
            <div className="flex flex-col space-y-2 bg-black/80 rounded-lg shadow-lg p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "dark:bg-gray-800/70 bg-gray-500 text-yellow-400"
                        : "hover:bg-gray-900 hover:text-yellow-400"
                    }`
                  }
                  end={link.to === "/"}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
