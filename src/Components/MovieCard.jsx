import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import placeholder1 from "../assets/images/placeholder1.jpg";
import placeholder2 from "../assets/images/placeholder2.jpg";
import placeholder3 from "../assets/images/placeholder3.jpg";

const PLACEHOLDER_POSTERS = [placeholder1, placeholder2, placeholder3];
function getPoster(poster) {
  if (poster && poster !== "N/A") return poster;
  const idx = Math.floor(Math.random() * PLACEHOLDER_POSTERS.length);
  return PLACEHOLDER_POSTERS[idx];
}

const MovieCard = ({
  poster,
  title,
  year,
  rating,
  review,
  readMoreLink,
  trailerUrl,
  onWatchTrailer,
  index,
}) => {
  // Helper to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 inline ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    ));
  };

  return (
    <motion.div
      className="relative w-full h-auto max-w-xs bg-white/30 dark:bg-gray-900/40 rounded-xl shadow-lg overflow-hidden flex flex-col m-2 cursor-pointer backdrop-blur-md border border-white/20 hover:shadow-2xl transition-transform"
      whileHover={{
        scale: 1.06,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, type: "spring" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-11" />
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/40 backdrop-blur-md z-0" />
      <img
        src={getPoster(poster)}
        alt={title}
        className="w-full object-cover object-center z-10"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = PLACEHOLDER_POSTERS[0];
        }}
      />
      <div className="absolute bottom-0 p-4 flex flex-col flex-1 z-12">
        <h2 className="text-lg font-semibold mb-1 truncate text-white drop-shadow-lg">
          {title}
        </h2>
        <div className="flex items-center text-sm text-gray-200 mb-2">
          <span>{year}</span>
          <span className="mx-2">•</span>
          <span>{renderStars(rating)}</span>
        </div>
        <p className="text-gray-100 text-sm mb-4 line-clamp-3 flex-1 drop-shadow">
          {review}
        </p>
        <div className="mt-auto flex flex-col gap-2">
          <Link
            to={readMoreLink}
            className="w-full rounded-full bg-gradient-to-r from-accent-orange via-accent-amber to-accent-red text-white font-semibold py-2 px-4 shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200 text-center"
          >
            Read More
          </Link>
          {trailerUrl && (
            <button
              onClick={() => onWatchTrailer(trailerUrl)}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-red via-accent-orange to-accent-gold text-white font-semibold py-2 px-4 shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200"
            >
              <FaPlay className="inline-block" />
              Watch Trailer
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

MovieCard.propTypes = {
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rating: PropTypes.number,
  review: PropTypes.string,
  readMoreLink: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default MovieCard;
