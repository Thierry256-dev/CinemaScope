import React, { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import { fetchMovies, fetchPopularMovies } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import GenreFilterBar from "../Components/GenreFilterBar";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(null);

  const observer = useRef();

  // Fetch trailers for visible movies
  useEffect(() => {
    const fetchAllTrailers = async () => {
      if (!movies.length) return;
      const newTrailers = {};
      await Promise.all(
        movies.map(async (movie) => {
          if (trailers[movie.id]) return; // Don't refetch
          try {
            const res = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
              {
                params: {
                  api_key: import.meta.env.VITE_TMDB_API_KEY,
                  language: "en-US",
                },
              }
            );
            const trailer = (res.data.results || []).find(
              (vid) =>
                vid.type === "Trailer" && vid.site === "YouTube" && vid.key
            );
            if (trailer) {
              newTrailers[
                movie.id
              ] = `https://www.youtube.com/watch?v=${trailer.key}`;
            }
          } catch {
            // ignore errors for missing trailers
          }
        })
      );
      setTrailers((prev) => ({ ...prev, ...newTrailers }));
    };
    fetchAllTrailers();
    // eslint-disable-next-line
  }, [movies]);

  // Fetch movies (with infinite scroll)
  const fetchMoviesPage = useCallback(
    async (pageToFetch = 1, genreId = activeGenre, searchTerm = search) => {
      setLoadingMore(true);
      setError(null);
      try {
        let results = [];
        let totalPages = 1;
        if (searchTerm.trim() !== "") {
          const res = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                query: searchTerm,
                page: pageToFetch,
              },
            }
          );
          results = res.data.results || [];
          totalPages = res.data.total_pages;
        } else if (genreId) {
          const res = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                with_genres: genreId,
                sort_by: "popularity.desc",
                page: pageToFetch,
              },
            }
          );
          results = res.data.results || [];
          totalPages = res.data.total_pages;
        } else {
          const res = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                sort_by: "popularity.desc",
                page: pageToFetch,
              },
            }
          );
          results = res.data.results || [];
          totalPages = res.data.total_pages;
        }
        setMovies((prev) =>
          pageToFetch === 1 ? results : [...prev, ...results]
        );
        setHasMore(pageToFetch < totalPages);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeGenre, search]
  );

  // Initial load and when genre/search changes
  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchMoviesPage(1);
    // eslint-disable-next-line
  }, [activeGenre, search]);

  // Infinite scroll observer
  const lastMovieRef = useCallback(
    (node) => {
      if (loadingMore || loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore, loading, hasMore]
  );

  // Fetch next page when page changes
  useEffect(() => {
    if (page === 1) return;
    fetchMoviesPage(page);
    // eslint-disable-next-line
  }, [page]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(search.trim());
  };

  const handleGenreSelect = (genreId) => {
    setActiveGenre(genreId);
    setPage(1);
  };

  // Modal handlers
  const openTrailerModal = (trailerUrl) => {
    setModalTrailer(trailerUrl);
    setModalOpen(true);
  };
  const closeTrailerModal = () => {
    setModalOpen(false);
    setModalTrailer(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white font-outfit tracking-tight text-center">
        Now Showing
      </h1>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 flex flex-row gap-3 items-center justify-center"
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
          className="rounded-full font-semibold text-lg font-outfit bg-gradient-to-r from-accent-orange via-accent-amber to-accent-red text-white shadow-lg hover:shadow-accent-orange/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2"
        >
          <FaSearch className="inline-block mr-2" />
        </button>
      </form>
      <GenreFilterBar
        onGenreSelect={handleGenreSelect}
        activeGenre={activeGenre}
      />
      {loading && (
        <p className="text-lg text-gray-600 dark:text-gray-300 font-poppins text-center">
          Loading movies...
        </p>
      )}
      {error && (
        <p className="text-lg text-red-500 font-poppins text-center">{error}</p>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeGenre || search || "all"}
          className="flex flex-col md:grid gap-8 items-center justify-center grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          {movies.map((movie, idx) => {
            const isLast = idx === movies.length - 1;
            return (
              <motion.div
                key={movie.id}
                ref={isLast ? lastMovieRef : null}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <MovieCard
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : undefined
                  }
                  title={movie.title}
                  year={
                    movie.release_date ? movie.release_date.split("-")[0] : ""
                  }
                  rating={movie.vote_average}
                  review={movie.overview}
                  readMoreLink={`/movie/${movie.id}`}
                  trailerUrl={trailers[movie.id]}
                  onWatchTrailer={openTrailerModal}
                  index={idx}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-orange"></div>
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeTrailerModal}
        contentLabel="Trailer"
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
        overlayClassName="fixed inset-0 bg-black/70 z-40"
      >
        <div className="bg-black rounded-lg shadow-lg p-4 max-w-2xl w-full relative">
          <button
            onClick={closeTrailerModal}
            className="absolute top-2 right-2 text-white text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
          {modalTrailer && (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={modalTrailer.replace("watch?v=", "embed/")}
                title="Trailer"
                allowFullScreen
                className="w-full h-80 rounded-lg"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
