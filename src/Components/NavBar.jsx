import React from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Add Review", to: "/add-review" },
];

const NavBar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-gray-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-bold tracking-wide">
            CinemaScope
          </div>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-800 text-yellow-400"
                      : "hover:bg-gray-800 hover:text-yellow-400"
                  }`
                }
                end={link.to === "/"}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-amber-300 w-5 h-5" />
              ) : (
                <FaMoon className="text-blue-300 w-5 h-5" />
              )}
            </button>
            {/* Mobile menu button can go here */}
          </div>
        </div>
        {/* Mobile menu (hidden by default) */}
      </div>
    </nav>
  );
};

export default NavBar;
