
import MovieCard from './MovieCard';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 30px;
  grid-column: 1 / -1;
  color: #666;
`;

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <EmptyMessage>No movies found.</EmptyMessage>
    );
  }
  
  return (
    <GridContainer>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </GridContainer>
  );
};

export default MovieGrid;
