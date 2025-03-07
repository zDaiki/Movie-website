
import { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    // Load reviews from localStorage if available
    const savedReviews = localStorage.getItem('movieReviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
  }, [reviews]);
  
  const addReview = (review) => {
    setReviews(prevReviews => [...prevReviews, review]);
  };
  
  const getMovieReviews = (movieId) => {
    return reviews.filter(review => review.movieId === movieId);
  };
  
  // Add other global state and functions as needed
  
  const value = {
    reviews,
    addReview,
    getMovieReviews,
  };
  
  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
