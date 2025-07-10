import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import StarRating from "../Components/StarRating";
import placeholder1 from "../assets/images/placeholder1.jpg";
import placeholder2 from "../assets/images/placeholder2.jpg";
import placeholder3 from "../assets/images/placeholder3.jpg";

const API_URL = "https://api.themoviedb.org/3"; // TMDB API base URL

const posterVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: "spring" } },
};
const infoVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, type: "spring", delay: 0.2 },
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(
          `${API_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");
        let data = null;
        try {
          data = await res.json();
        } catch (jsonErr) {
          // If no JSON, just continue
          data = null;
        }
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const PLACEHOLDER_POSTERS = [placeholder1, placeholder2, placeholder3];

  function getPoster(poster) {
    if (poster && poster !== "N/A") return poster;
    // Pick a random placeholder for variety
    const idx = Math.floor(Math.random() * PLACEHOLDER_POSTERS.length);
    return PLACEHOLDER_POSTERS[idx];
  }

  if (loading)
    return <div className="p-8 text-gray-600">Loading movie details...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!movie) return <div className="p-8 text-gray-600">Movie not found.</div>;

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-8 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-md mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <motion.img
          src={getPoster(movie.poster_path)}
          alt={movie.title}
          className="w-full md:w-64 h-80 object-cover rounded-lg shadow"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_POSTERS[0];
          }}
          variants={posterVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="flex-1 flex flex-col"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {movie.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-2">
            <span className="mr-2">{movie.release_date?.split("-")[0]}</span>
            <StarRating value={movie.vote_average / 2} readOnly />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">Overview</h2>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
              {movie.overview}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;
