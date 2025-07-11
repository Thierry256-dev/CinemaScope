import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import StarRating from "../Components/StarRating";
import placeholder1 from "../assets/images/placeholder1.jpg";
import placeholder2 from "../assets/images/placeholder2.jpg";
import placeholder3 from "../assets/images/placeholder3.jpg";
import { fetchMovieById } from "../services/api";

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

const PLACEHOLDER_POSTERS = [placeholder1, placeholder2, placeholder3];

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
        const data = await fetchMovieById(id);
        // TMDB returns an object with a 'success' property if not found
        if (!data || data.success === false || data.status_code) {
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  function getPoster(posterPath) {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    }
    // Pick a random placeholder for variety
    const idx = Math.floor(Math.random() * PLACEHOLDER_POSTERS.length);
    return PLACEHOLDER_POSTERS[idx];
  }

  if (loading)
    return (
      <div className="p-8 text-lg text-gray-600 dark:text-gray-300 font-poppins text-center">
        Loading movie details...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-lg text-red-500 font-poppins text-center">
        {error}
      </div>
    );
  if (!movie)
    return (
      <div className="p-8 text-lg text-gray-600 dark:text-gray-300 font-poppins text-center">
        Movie not found.
      </div>
    );

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-10 bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-8">
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
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 dark:text-white font-outfit tracking-tight">
            {movie.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-300 mb-2 font-poppins">
            <span className="mr-2">{movie.release_date?.split("-")[0]}</span>
            <StarRating value={movie.vote_average / 2} readOnly />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres &&
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full bg-accent-orange/20 text-accent-orange text-xs font-semibold font-poppins"
                >
                  {genre.name}
                </span>
              ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg md:text-xl font-semibold mb-1 font-outfit text-amber-400">
              Overview
            </h2>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line font-poppins">
              {movie.overview}
            </p>
          </div>
        </motion.div>
      </div>
      <RelatedMovies movieId={id} />
    </motion.div>
  );
};

const RelatedMovies = ({ movieId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
              page: 1,
            },
          }
        );
        setRelated(res.data.results || []);
      } catch {
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchRelated();
  }, [movieId]);

  if (loading) return null;
  if (!related.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold font-outfit mb-4 text-gray-900 dark:text-white">
        Related Movies
      </h2>
      <motion.div
        className="flex gap-4 overflow-x-auto pb-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
      >
        {related.map((movie) => (
          <motion.div
            key={movie.id}
            className="min-w-[180px] max-w-[180px] bg-light-card dark:bg-gray-900/80 rounded-lg shadow-card flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
            whileHover={{ scale: 1.07 }}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "/placeholder.jpg"
              }
              alt={movie.title}
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-3">
              <h3 className="text-base font-semibold font-outfit text-gray-900 dark:text-white truncate">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {movie.release_date?.split("-")[0]}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MovieDetails;
