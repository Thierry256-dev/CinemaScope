import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import { fetchMovies, fetchPopularMovies } from "../services/api";

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
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Now Showing</h1>
      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      {loading && <p className="text-gray-600">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
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
            readMoreLink={`/movies/${movie.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
