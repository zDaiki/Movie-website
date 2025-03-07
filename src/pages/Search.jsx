
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { searchMovies, getTrendingMovies, getPopularMovies } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchHeader = styled.div`
  margin-bottom: 20px;
`;

const SearchTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--primary-color);
`;

const SearchInfo = styled.p`
  color: #666;
`;

const SearchForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    opacity: 0.9;
  }
`;

const EmptyResults = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #fff0f0;
  border-left: 4px solid #ff3b30;
  margin-bottom: 20px;
`;

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';
  const type = queryParams.get('type') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Determine the page title based on the type parameter
  const getPageTitle = () => {
    if (type === 'trending') return 'Trending Movies';
    if (type === 'popular') return 'Popular Movies';
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    return 'Movie Search';
  };
  
  const fetchMovies = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      let data;
      
      if (type === 'trending') {
        data = await getTrendingMovies(page);
      } else if (type === 'popular') {
        data = await getPopularMovies(page);
      } else if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else {
        // No query and no type, show empty state
        setMovies([]);
        setTotalPages(0);
        setIsLoading(false);
        return;
      }
      
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB API has a max of 500 pages
      setCurrentPage(data.page);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to run when the URL parameters change
  useEffect(() => {
    setSearchQuery(initialQuery);
    setCurrentPage(1);
    fetchMovies(1);
  }, [initialQuery, type]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update the URL with the search query
      window.history.pushState(
        {}, 
        '', 
        `${window.location.pathname}?query=${encodeURIComponent(searchQuery)}`
      );
      fetchMovies(1);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>{getPageTitle()}</SearchTitle>
        {!type && (
          <SearchForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="Search for movies by title, actor, or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </SearchForm>
        )}
        
        {movies.length > 0 && (
          <SearchInfo>
            Showing {movies.length} results {totalPages > 1 ? `(page ${currentPage} of ${totalPages})` : ''}
          </SearchInfo>
        )}
      </SearchHeader>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {isLoading ? (
        <LoadingSpinner />
      ) : movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <EmptyResults>
          {initialQuery 
            ? `No results found for "${initialQuery}". Try a different search term.` 
            : 'Enter a search term to find movies.'}
        </EmptyResults>
      )}
    </SearchContainer>
  );
};

export default Search;
