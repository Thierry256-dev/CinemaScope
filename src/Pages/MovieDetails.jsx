import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../Components/StarRating";
import placeholder1 from "../assets/images/placeholder1.jpg";
import placeholder2 from "../assets/images/placeholder2.jpg";
import placeholder3 from "../assets/images/placeholder3.jpg";

const API_URL = "https://api.example.com/movies"; // Replace with your actual API endpoint

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
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
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
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={getPoster(movie.poster)}
          alt={movie.title}
          className="w-full md:w-64 h-80 object-cover rounded-lg shadow"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_POSTERS[0];
          }}
        />
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {movie.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-2">
            <span className="mr-2">{movie.year}</span>
            <StarRating value={movie.rating} readOnly />
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-1">Review</h2>
            <p className="text-gray-800 whitespace-pre-line">{movie.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
