import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

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
  movieObj,
}) => {
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } =
    useFavorites();

  const isFavorite = favorites.some((m) => m.id === movieObj.id);
  const isWatchlist = watchlist.some((m) => m.id === movieObj.id);

  return (
    <div className="relative bg-light-card dark:bg-gray-900/80 rounded-xl shadow-card backdrop-blur-md overflow-hidden flex flex-col h-full transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <img
        src={poster}
        alt={title}
        className="w-full object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <motion.button
          whileTap={{ scale: 0.7, rotate: 12 }}
          onClick={() => toggleFavorite(movieObj)}
          className="text-red-500 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow"
          aria-label="Add to favorites"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.7, rotate: -12 }}
          onClick={() => toggleWatchlist(movieObj)}
          className="text-amber-500 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow"
          aria-label="Add to watchlist"
        >
          {isWatchlist ? <FaBookmark /> : <FaRegBookmark />}
        </motion.button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute bottom-0 flex-1 flex flex-col p-4">
        <h2 className="text-xl md:text-2xl font-outfit font-bold text-white/85 mb-1">
          {title}
        </h2>
        <div className="flex items-center text-gray-300 text-sm mb-2">
          <span className="mr-2">{year}</span>
          <span className="ml-auto font-semibold">
            {rating?.toFixed(1) ?? "N/A"}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{review}</p>
        <div className="flex flex-col">
          <Link
            to={readMoreLink}
            className="w-full rounded-full bg-gradient-to-r from-accent-orange via-accent-amber to-accent-red text-white font-semibold shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200 text-center"
          >
            Read More
          </Link>
          {trailerUrl && (
            <button
              onClick={() => onWatchTrailer(trailerUrl)}
              className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-accent-red via-accent-orange to-accent-gold text-white font-semibold py-2 px-4 shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200"
            >
              <FaPlay className="inline-block" />
              Watch Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
