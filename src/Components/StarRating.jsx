import React from "react";
import PropTypes from "prop-types";

/**
 * StarRating component for selecting or displaying a rating from 1 to 5 stars.
 * @param {number} value - Current rating value (1-5)
 * @param {function} onChange - Callback when a star is clicked (optional)
 * @param {boolean} readOnly - If true, disables interaction (optional)
 */
const StarRating = ({ value = 0, onChange, readOnly = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => !readOnly && onChange && onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          tabIndex={readOnly ? -1 : 0}
          disabled={readOnly}
        >
          <svg
            className={`w-7 h-7 ${
              value >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default StarRating;
