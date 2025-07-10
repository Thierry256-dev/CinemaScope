import React, { useState } from "react";
import ReviewForm from "../Components/ReviewForm";

const API_URL = "https://api.example.com/movies"; // Replace with your actual API endpoint

const AddReview = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      // Example: POST to backend
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Add a Movie Review
      </h1>
      {success && (
        <div className="mb-4 text-green-600 font-medium">
          Review submitted successfully!
        </div>
      )}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <ReviewForm onSubmit={handleSubmit} />
      {submitting && <div className="mt-4 text-gray-500">Submitting...</div>}
    </div>
  );
};

export default AddReview;
