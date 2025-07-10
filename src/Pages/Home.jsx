import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { fetchMovies, fetchPopularMovies } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let results = [];
      if (search.trim() === "") {
        results = await fetchPopularMovies();
      } else {
        results = await fetchMovies(search);
      }
      if (!results.length) throw new Error("No movies found");
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchPopularMovies();
        setMovies(results);
      } catch (err) {
        setError("Failed to load popular movies");
      } finally {
        setLoading(false);
      }
    };
    loadInitialMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white font-outfit tracking-tight text-center">
        Now Showing
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 flex flex-col sm:flex-row gap-3 items-center justify-center"
      >
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="flex-1 w-full sm:w-auto border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-base md:text-lg font-poppins focus:outline-none focus:ring-2 focus:ring-accent-orange bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
        />
        <button
          type="submit"
          className="rounded-full px-6 py-2 md:px-8 md:py-3 font-semibold text-lg font-outfit bg-gradient-to-r from-accent-orange via-accent-amber to-accent-red text-white shadow-lg hover:shadow-accent-orange/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
        >
          Search
        </button>
      </form>
      {loading && (
        <p className="text-lg text-gray-600 dark:text-gray-300 font-poppins text-center">
          Loading movies...
        </p>
      )}
      {error && (
        <p className="text-lg text-red-500 font-poppins text-center">{error}</p>
      )}
      <AnimatePresence mode="wait">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie, idx) => (
            <MovieCard
              key={movie.id}
              poster={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : undefined
              }
              title={movie.title}
              year={movie.release_date ? movie.release_date.split("-")[0] : ""}
              rating={movie.vote_average}
              review={movie.overview}
              readMoreLink={`/movie/${movie.id}`}
              index={idx}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
