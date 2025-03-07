
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMoviesByGenre, getGenres } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GenreHeader = styled.div`
  margin-bottom: 20px;
`;

const GenreTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--primary-color);
`;

const GenreDescription = styled.p`
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #fff0f0;
  border-left: 4px solid #ff3b30;
  margin-bottom: 20px;
`;

const Genre = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch genre name
  useEffect(() => {
    const fetchGenreName = async () => {
      try {
        const genres = await getGenres();
        const genre = genres.find(g => g.id.toString() === genreId);
        if (genre) {
          setGenreName(genre.name);
        } else {
          setError('Genre not found');
        }
      } catch (error) {
        console.error('Error fetching genre details:', error);
        setError('Failed to load genre information');
      }
    };
    
    fetchGenreName();
  }, [genreId]);
  
  // Fetch movies by genre
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getMoviesByGenre(genreId, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        setError(null);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, [genreId, currentPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <GenreContainer>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <GenreHeader>
            <GenreTitle>{genreName} Movies</GenreTitle>
            {movies.length > 0 && (
              <GenreDescription>
                Showing {movies.length} results {totalPages > 1 ? `(page ${currentPage} of ${totalPages})` : ''}
              </GenreDescription>
            )}
          </GenreHeader>
          
          <MovieGrid movies={movies} />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </GenreContainer>
  );
};

export default Genre;
