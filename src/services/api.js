import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Updated to TMDB API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Search movies by title
export const searchMovies = async (title) => {
  const response = await api.get(`/movies`, { params: { title } });
  return response.data;
};

// Fetch movie details by ID
export const fetchMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response.data;
};

// Optionally post a review
export const postReview = async (review) => {
  const response = await api.post(`/movies`, review);
  return response.data;
};

// Fetch movies from TMDB API by title
export const fetchMovies = async (title) => {
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: TMDB_API_KEY,
          query: title || "avengers",
        },
      }
    );
    if (
      response.status === 204 ||
      !response.data ||
      !Array.isArray(response.data.results)
    ) {
      console.warn(
        "No results found or invalid response for the given title:",
        title
      );
      return [];
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch popular movies from TMDB API
export const fetchPopularMovies = async () => {
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    if (
      response.status === 204 ||
      !response.data ||
      !Array.isArray(response.data.results)
    ) {
      console.warn("No popular movies found or invalid response.");
      return [];
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export default api;
