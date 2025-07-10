import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import AddReview from "../Pages/AddReview";
import MovieDetails from "../Pages/MovieDetails";
import LandingPage from "../Components/LandingPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/add-review" element={<AddReview />} />
    <Route path="/movie/:id" element={<MovieDetails />} />
  </Routes>
);

export default AppRoutes;
