import React, { createContext, useContext, useReducer } from "react";

const MovieContext = createContext();

const initialState = [];

function movieReducer(state, action) {
  switch (action.type) {
    case "ADD_MOVIE":
      return [...state, action.payload];
    case "REMOVE_MOVIE":
      return state.filter((movie) => movie.id !== action.payload);
    default:
      return state;
  }
}

export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(movieReducer, initialState);

  const addMovie = (movie) => {
    dispatch({ type: "ADD_MOVIE", payload: movie });
  };

  const removeMovie = (id) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
