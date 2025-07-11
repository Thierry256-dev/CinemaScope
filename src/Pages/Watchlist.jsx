import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../Components/MovieCard";
import { motion, AnimatePresence } from "framer-motion";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white font-outfit tracking-tight text-center">
        My Watchlist
      </h1>
      {watchlist.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-300 font-poppins text-center">
          Your watchlist is empty.
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {watchlist.map((movie, idx) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <MovieCard
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : undefined
                  }
                  title={movie.title}
                  year={
                    movie.release_date ? movie.release_date.split("-")[0] : ""
                  }
                  rating={movie.vote_average}
                  review={movie.overview}
                  readMoreLink={`/movie/${movie.id}`}
                  trailerUrl={movie.trailerUrl}
                  movieObj={movie}
                  index={idx}
                />
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="mt-2 w-full rounded-full bg-gradient-to-r from-accent-red via-accent-orange to-accent-gold text-white font-semibold py-2 px-4 shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200"
                >
                  Remove from Watchlist
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Watchlist;
