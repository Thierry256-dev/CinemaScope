import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";

const API_URL = "https://api.example.com/movies"; // Replace with your actual API endpoint

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Now Showing</h1>
      {loading && <p className="text-gray-600">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            poster={movie.poster}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            review={movie.review}
            readMoreLink={`/movies/${movie.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
