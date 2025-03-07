
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PosterContainer = styled.div`
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
`;

const CardContent = styled.div`
  padding: 12px;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Year = styled.p`
  color: #777;
  font-size: 0.8rem;
`;

const MovieCard = ({ movie }) => {
  const posterPath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  
  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <PosterContainer>
          <Poster src={posterPath} alt={movie.title} />
          {movie.vote_average > 0 && (
            <Rating>{movie.vote_average.toFixed(1)}</Rating>
          )}
        </PosterContainer>
        <CardContent>
          <Title>{movie.title}</Title>
          <Year>{releaseYear}</Year>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
