import React, { useState } from "react";
import ReviewForm from "../Components/ReviewForm";

const API_URL = "https://api.themoviedb.org/3"; // TMDB API base URL

const AddReview = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      let data = null;
      try {
        data = await res.json();
      } catch (jsonErr) {
        // If no JSON, just continue
        data = null;
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 dark:text-white font-outfit tracking-tight text-center">
        Add a Movie Review
      </h1>
      {success && (
        <div className="mb-4 text-green-600 font-medium font-poppins text-center">
          Review submitted successfully!
        </div>
      )}
      {error && (
        <div className="mb-4 text-red-500 font-poppins text-center">
          {error}
        </div>
      )}
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 md:p-8">
        <ReviewForm onSubmit={handleSubmit} />
      </div>
      {submitting && (
        <div className="mt-4 text-gray-500 font-poppins text-center">
          Submitting...
        </div>
      )}
    </div>
  );
};

export default AddReview;
