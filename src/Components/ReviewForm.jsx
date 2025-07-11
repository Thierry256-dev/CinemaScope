import React, { useState } from "react";

const initialState = {
  name: "",
  year: "",
  rating: 0,
  review: "",
};

const ReviewForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Movie name is required";
    if (!form.year.trim()) newErrors.year = "Year is required";
    if (!form.rating) newErrors.rating = "Rating is required";
    if (!form.review.trim()) newErrors.review = "Review is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) onSubmit(form);
      setForm(initialState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Movie Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Year<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
            errors.year
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
          min="1888"
          max={new Date().getFullYear()}
        />
        {errors.year && (
          <p className="text-red-500 text-xs mt-1">{errors.year}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Rating<span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleRating(star)}
              className="focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <svg
                className={`w-7 h-7 ${
                  form.rating >= star
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-700"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Review<span className="text-red-500">*</span>
        </label>
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          rows={4}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-orange bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
            errors.review
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-700"
          }`}
        />
        {errors.review && (
          <p className="text-red-500 text-xs mt-1">{errors.review}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-accent-red via-accent-orange to-accent-gold text-white font-semibold py-2 px-4 shadow-card hover:shadow-lg hover:brightness-110 transition-colors duration-200"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
