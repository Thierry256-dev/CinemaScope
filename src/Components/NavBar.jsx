import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Add Review", to: "/add-review" },
];

const NavBar = () => {
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
          {/* Mobile menu button */}
          <div className="md:hidden">
            {/* You can add a hamburger menu here for mobile if needed */}
          </div>
        </div>
        {/* Mobile menu (hidden by default) */}
        {/* For a full mobile menu, add state and toggle logic here */}
      </div>
    </nav>
  );
};

export default NavBar;
