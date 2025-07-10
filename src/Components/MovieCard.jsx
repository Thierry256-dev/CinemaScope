import React from "react";
import PropTypes from "prop-types";
import placeholder1 from "../assets/images/placeholder1.jpg";
import placeholder2 from "../assets/images/placeholder2.jpg";
import placeholder3 from "../assets/images/placeholder3.jpg";

/**
 * MovieCard component displays a movie poster, title, year, rating, review, and a 'Read more' link.
 * @param {Object} props
 * @param {string} props.poster - URL of the movie poster
 * @param {string} props.title - Movie title
 * @param {number|string} props.year - Release year
 * @param {number} props.rating - Rating out of 5
 * @param {string} props.review - Short review text
 * @param {string} props.readMoreLink - URL for the 'Read more' link
 */

const PLACEHOLDER_POSTERS = [placeholder1, placeholder2, placeholder3];

function getPoster(poster) {
  if (poster && poster !== "N/A") return poster;
  // Pick a random placeholder for variety
  const idx = Math.floor(Math.random() * PLACEHOLDER_POSTERS.length);
  return PLACEHOLDER_POSTERS[idx];
}

const MovieCard = ({ poster, title, year, rating, review, readMoreLink }) => {
  // Helper to render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 inline ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    ));
  };

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform hover:scale-105 duration-200 m-2">
      <img
        src={getPoster(poster)}
        alt={title}
        className="w-full h-60 object-cover object-center"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = PLACEHOLDER_POSTERS[0];
        }}
      />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{year}</span>
          <span className="mx-2">•</span>
          <span>{renderStars(rating)}</span>
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
          {review}
        </p>
        <a
          href={readMoreLink}
          className="text-blue-600 hover:underline text-sm font-medium mt-auto"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rating: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  readMoreLink: PropTypes.string.isRequired,
};

export default MovieCard;
