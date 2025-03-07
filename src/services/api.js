
import axios from 'axios';

// TMDB API configuration
// In a production app, you would store this in an environment variable
const API_KEY = 'f312ac2cb63002f508d52fd432cea28d'; // Use this sample key
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Home page: Get featured movies (popular, now playing)
// Sample fallback data in case API fails
const sampleMovies = [
  {
    id: 1,
    title: "Sample Movie 1",
    overview: "This is a sample movie when the API is unavailable.",
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.5,
    release_date: "2023-01-01"
  },
  {
    id: 2,
    title: "Sample Movie 2",
    overview: "Another placeholder movie for demonstration.",
    poster_path: null,
    backdrop_path: null,
    vote_average: 7.9,
    release_date: "2023-02-15"
  },
  {
    id: 3,
    title: "Sample Movie 3",
    overview: "A third example movie to display when API is down.",
    poster_path: null,
    backdrop_path: null,
    vote_average: 9.0,
    release_date: "2023-03-30"
  },
  {
    id: 4,
    title: "Sample Movie 4",
    overview: "Fourth placeholder for API failures.",
    poster_path: null,
    backdrop_path: null,
    vote_average: 6.8,
    release_date: "2023-04-10"
  },
  {
    id: 5,
    title: "Sample Movie 5",
    overview: "Fifth placeholder movie with sample data.",
    poster_path: null,
    backdrop_path: null,
    vote_average: 8.1,
    release_date: "2023-05-22"
  }
];

export const getFeaturedMovies = async () => {
  try {
    const response = await tmdbAPI.get('/movie/popular');
    return response.data.results.slice(0, 5); // Take only top 5 for carousel
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    // Return sample data instead of throwing error
    return sampleMovies;
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
    // Return mock data with pagination structure
    return {
      page: page,
      results: sampleMovies,
      total_pages: 1,
      total_results: sampleMovies.length
    };
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
    // Return mock data with pagination structure
    return {
      page: page,
      results: sampleMovies,
      total_pages: 1,
      total_results: sampleMovies.length
    };
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
    // Filter sample movies based on query to simulate search
    const filteredMovies = sampleMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return {
      page: page,
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length
    };
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
