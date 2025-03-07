
import axios from 'axios';

// TMDB API configuration
// In a production app, you would store this in an environment variable
const API_KEY = '3e52e2f5350456c5c8394a6a7fc7a6d3'; // This is a dummy key, replace with your own
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Home page: Get featured movies (popular, now playing)
export const getFeaturedMovies = async () => {
  try {
    const response = await tmdbAPI.get('/movie/popular');
    return response.data.results.slice(0, 5); // Take only top 5 for carousel
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    throw error;
  }
};

// Get trending movies
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbAPI.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbAPI.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Search for movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbAPI.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbAPI.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,recommendations',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for movie ID ${movieId}:`, error);
    throw error;
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdbAPI.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    throw error;
  }
};

// Get all genres
export const getGenres = async () => {
  try {
    const response = await tmdbAPI.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export default {
  getFeaturedMovies,
  getTrendingMovies,
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMoviesByGenre,
  getGenres,
};
