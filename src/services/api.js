import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual API base URL
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

// Fetch movies from OMDB API by title
export const fetchMovies = async (title) => {
  // OMDB API example
  // Replace 'YOUR_OMDB_API_KEY' with your actual OMDB API key
  const OMDB_API_KEY = "YOUR_OMDB_API_KEY";
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      s: title,
      apikey: OMDB_API_KEY,
      type: "movie",
    },
  });
  // OMDB returns results in response.data.Search
  return response.data.Search || [];
};

export default api;
