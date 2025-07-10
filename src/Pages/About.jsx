import React from "react";

const About = () => (
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white font-outfit tracking-tight text-center">
      About ReelReview
    </h1>
    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 font-poppins text-center">
      <span className="font-semibold font-outfit">ReelReview</span> is your
      go-to platform for discovering, reviewing, and sharing your thoughts on
      movies. Whether you're a casual viewer or a film enthusiast, ReelReview
      makes it easy to find new films, read honest reviews, and contribute your
      own insights to the community.
    </p>
    <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 dark:text-amber-300 font-outfit">
      Our Purpose
    </h2>
    <p className="mb-6 text-gray-700 dark:text-gray-300 font-poppins">
      ReelReview was created to foster a vibrant community of movie lovers. Our
      goal is to provide a space where users can:
    </p>
    <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 font-poppins">
      <li>Browse a curated list of movies with detailed information</li>
      <li>Read and write reviews to help others decide what to watch</li>
      <li>Rate movies and see what’s trending in the community</li>
    </ul>
    <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800 dark:text-amber-300 font-outfit">
      How It Works
    </h2>
    <ol className="list-decimal list-inside mb-6 text-gray-700 dark:text-gray-300 font-poppins">
      <li>Explore the Home page to see a grid of movies and their ratings.</li>
      <li>Click on any movie to view detailed information and full reviews.</li>
      <li>
        Want to share your thoughts? Head to the Add Review page and submit your
        own review using our simple form.
      </li>
      <li>
        All reviews are displayed instantly, helping others make informed
        choices.
      </li>
    </ol>
    <p className="text-gray-700 dark:text-gray-200 font-poppins text-center">
      Thank you for being a part of ReelReview. Your opinions help shape the
      movie-watching experience for everyone!
    </p>
  </div>
);

export default About;
