import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (q) => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: TMDB_API_KEY,
          query: q,
          page: 1,
        },
      });
      setSuggestions(res.data.results?.slice(0, 6) || []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setShowDropdown(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 350);
  };

  const handleSelect = (movie) => {
    setShowDropdown(false);
    setQuery("");
    setSuggestions([]);
    navigate(`/movie/${movie.id}`);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 120);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
          placeholder="Search for a movie..."
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-base md:text-lg font-poppins focus:outline-none focus:ring-2 focus:ring-accent-orange bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
        />
        <FaSearch className="absolute right-4 text-gray-400 pointer-events-none" />
      </div>
      {showDropdown && (suggestions.length > 0 || loading) && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-30 max-h-72 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-300">
              Loading...
            </div>
          ) : (
            suggestions.map((movie) => (
              <button
                key={movie.id}
                onMouseDown={() => handleSelect(movie)}
                className="w-full text-left px-4 py-2 hover:bg-accent-orange/10 dark:hover:bg-accent-orange/20 transition-colors flex items-center gap-3"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-8 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-8 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
                )}
                <span className="font-poppins text-gray-900 dark:text-white">
                  {movie.title}
                </span>
                <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  {movie.release_date?.split("-")[0]}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
