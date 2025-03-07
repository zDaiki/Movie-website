
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CarouselSlide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.active ? '1' : '0')};
  pointer-events: ${props => (props.active ? 'auto' : 'none')};
`;

const BackdropImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
  }
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  color: white;
  max-width: 50%;
  z-index: 1;
  
  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    max-width: 80%;
  }
`;

const MovieTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MovieOverview = styled.p`
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    -webkit-line-clamp: 2;
    font-size: 0.9rem;
  }
`;

const ViewDetailsButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0190b9;
  }
`;

const CarouselNavigation = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
  gap: 10px;
  z-index: 2;
`;

const NavDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => (props.active ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => (props.active ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.8)')};
  }
`;

const Carousel = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  if (!movies || movies.length === 0) {
    return null;
  }
  
  return (
    <CarouselContainer>
      {movies.map((movie, index) => (
        <CarouselSlide key={movie.id} active={index === currentSlide}>
          <BackdropImage 
            imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          />
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieOverview>{movie.overview}</MovieOverview>
            <ViewDetailsButton to={`/movie/${movie.id}`}>
              View Details
            </ViewDetailsButton>
          </MovieInfo>
        </CarouselSlide>
      ))}
      
      <CarouselNavigation>
        {movies.map((_, index) => (
          <NavDot 
            key={index} 
            active={index === currentSlide} 
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </CarouselNavigation>
    </CarouselContainer>
  );
};

export default Carousel;
