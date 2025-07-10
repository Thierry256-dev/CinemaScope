import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.7,
      type: "spring",
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
};

const About = () => (
  <motion.div
    className="max-w-3xl mx-auto px-4 py-10"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.h1
      className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white font-outfit tracking-tight text-center"
      variants={itemVariants}
    >
      About CinemaScope
    </motion.h1>
    <motion.p
      className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 font-poppins text-center"
      variants={itemVariants}
    >
      <span className="font-semibold font-outfit">CinemaScope</span> is your
      go-to platform for discovering, reviewing, and sharing your thoughts on
      movies. Whether you're a casual viewer or a film enthusiast, CinemaScope
      makes it easy to find new films, read honest reviews, and contribute your
      own insights to the community.
    </motion.p>
    <motion.h2
      className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 dark:text-amber-300 font-outfit"
      variants={itemVariants}
    >
      Our Purpose
    </motion.h2>
    <motion.p
      className="mb-6 text-gray-700 dark:text-gray-300 font-poppins"
      variants={itemVariants}
    >
      CinemaScope was created to foster a vibrant community of movie lovers. Our
      goal is to provide a space where users can:
    </motion.p>
    <motion.ul
      className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 font-poppins"
      variants={itemVariants}
    >
      <li>Browse a curated list of movies with detailed information</li>
      <li>Read and write reviews to help others decide what to watch</li>
      <li>Rate movies and see what’s trending in the community</li>
    </motion.ul>
    <motion.h2
      className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 dark:text-amber-300 font-outfit"
      variants={itemVariants}
    >
      How It Works
    </motion.h2>
    <motion.ol
      className="list-decimal list-inside mb-6 text-gray-700 dark:text-gray-300 font-poppins"
      variants={itemVariants}
    >
      <li>Explore the Home page to see a grid of movies and their ratings.</li>
      <li>Click on any movie to view detailed information and full reviews.</li>
      <li>
        Want to share your thoughts? Head to the Add Review page and submit your
        own review using our simple form.
      </li>
      <li>
        All reviews are displayed instantly, helping others make informed
        choices.
      </li>
    </motion.ol>
    <motion.p
      className="text-gray-700 dark:text-gray-200 font-poppins text-center mb-4"
      variants={itemVariants}
    >
      Thank you for being a part of CinemaScope. Your opinions help shape the
      movie-watching experience for everyone!
    </motion.p>
    <motion.p
      className="text-xs text-gray-400 font-poppins text-center mt-8"
      variants={itemVariants}
    >
      Developed by Thierry
    </motion.p>
  </motion.div>
);

export default About;
