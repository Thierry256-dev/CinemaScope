import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const GenreFilterBar = ({ onGenreSelect, activeGenre }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          { params: { api_key: TMDB_API_KEY } }
        );
        setGenres(res.data.genres || []);
      } catch (err) {
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="w-full overflow-x-auto py-2 mb-6">
      <div className="flex space-x-3 min-w-max">
        <button
          onClick={() => onGenreSelect(null)}
          className={`px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-all duration-200
            ${
              activeGenre === null
                ? "bg-accent-orange text-white shadow"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent-orange hover:text-white"
            }`}
        >
          All
        </button>
        {loading ? (
          <span className="text-gray-500 dark:text-gray-400 px-4">
            Loading genres...
          </span>
        ) : (
          genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreSelect(genre.id)}
              className={`px-5 py-2 rounded-full font-poppins text-sm font-semibold transition-all duration-200
                ${
                  activeGenre === genre.id
                    ? "bg-accent-orange dark:text-white text-black shadow"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent-orange hover:text-white"
                }`}
            >
              {genre.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default GenreFilterBar;
