import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../index.css";

// You should place a video file in public/ or use a royalty-free video URL
const VIDEO_SRC = "/background-cinema.mp4"; // This file exists in public/

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 * i, duration: 0.7, type: "spring" },
  }),
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-cinzel">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute bg-black/80 inset-0 z-10" />
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-wide font-cinzel"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          CinemaScope
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-amber-200 mb-8 font-outfit"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Dive into the world of movies. Discover, review, and share your
          favorites.
        </motion.p>
        <motion.button
          className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-orange via-accent-amber to-accent-red text-white text-lg font-semibold shadow-lg hover:scale-105 transition-transform font-montserrat"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleExplore}
        >
          Explore Movies
        </motion.button>
      </div>
      {/* Footer - Developer credit */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-xs text-gray-300 font-poppins opacity-80 select-none pointer-events-none">
        Developed by Thierry
      </div>
    </div>
  );
};

export default LandingPage;
