
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import MovieGrid from '../components/MovieGrid';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BackdropContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  overflow: hidden;
  margin: -20px 0 0 -20px;
  width: calc(100% + 40px);
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Backdrop = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
  }
`;

const MovieInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-top: -100px;
  z-index: 1;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-top: -50px;
  }
`;

const PosterContainer = styled.div`
  width: 300px;
  height: 450px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 180px;
    height: 270px;
    margin-left: 20px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  color: white;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    color: var(--text-color);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Tagline = styled.p`
  font-style: italic;
  margin-bottom: 15px;
  opacity: 0.8;
`;

const DetailsRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Detail = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

const StarIcon = styled.span`
  color: #FFD700;
`;

const Overview = styled.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    color: var(--text-color);
  }
`;

const ContentSection = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  color: var(--primary-color);
  font-size: 1.5rem;
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`;

const CastMember = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CastImage = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

const CastInfo = styled.div`
  padding: 10px;
`;

const CastName = styled.div`
  font-weight: 600;
`;

const CastCharacter = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VideoContainer = styled.div`
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #fff0f0;
  border-left: 4px solid #ff3b30;
  margin-bottom: 20px;
`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addReview, getMovieReviews } = useMovieContext();
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const handleReviewSubmit = (review) => {
    addReview(review);
  };
  
  const movieReviews = movie ? getMovieReviews(movie.id.toString()) : [];
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }
  
  if (!movie) {
    return <ErrorMessage>Movie not found.</ErrorMessage>;
  }
  
  const backdropPath = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1400x800?text=No+Backdrop+Available';
  
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
  
  const directors = movie.credits?.crew.filter(person => person.job === 'Director') || [];
  const cast = movie.credits?.cast.slice(0, 6) || [];
  const trailers = movie.videos?.results.filter(video => 
    video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  ).slice(0, 2) || [];
  
  const recommendations = movie.recommendations?.results.slice(0, 6) || [];
  
  return (
    <MovieContainer>
      <BackdropContainer>
        <Backdrop imageUrl={backdropPath} />
      </BackdropContainer>
      
      <MovieInfo>
        <PosterContainer>
          <Poster src={posterPath} alt={movie.title} />
        </PosterContainer>
        
        <InfoContainer>
          <Title>{movie.title} ({movie.release_date?.split('-')[0] || 'N/A'})</Title>
          
          {movie.tagline && <Tagline>"{movie.tagline}"</Tagline>}
          
          <DetailsRow>
            {movie.genres?.map(genre => (
              <Link key={genre.id} to={`/genre/${genre.id}`} style={{ textDecoration: 'none' }}>
                <Detail>{genre.name}</Detail>
              </Link>
            ))}
            
            {movie.runtime > 0 && (
              <Detail>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Detail>
            )}
            
            {movie.release_date && (
              <Detail>Release: {new Date(movie.release_date).toLocaleDateString()}</Detail>
            )}
          </DetailsRow>
          
          <Rating>
            <StarIcon>★</StarIcon>
            <strong>{movie.vote_average?.toFixed(1)}/10</strong> ({movie.vote_count} votes)
          </Rating>
          
          <Overview>
            <h3>Overview</h3>
            <p>{movie.overview || 'No overview available.'}</p>
          </Overview>
          
          <DetailsRow>
            {directors.length > 0 && (
              <Detail>
                <strong>Director:</strong> {directors.map(d => d.name).join(', ')}
              </Detail>
            )}
            
            {movie.production_companies?.length > 0 && (
              <Detail>
                <strong>Studios:</strong> {movie.production_companies.map(c => c.name).join(', ')}
              </Detail>
            )}
          </DetailsRow>
        </InfoContainer>
      </MovieInfo>
      
      {cast.length > 0 && (
        <ContentSection>
          <SectionTitle>Cast</SectionTitle>
          <CastGrid>
            {cast.map(person => (
              <CastMember key={person.id}>
                <CastImage 
                  src={person.profile_path 
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                  } 
                  alt={person.name} 
                />
                <CastInfo>
                  <CastName>{person.name}</CastName>
                  <CastCharacter>{person.character}</CastCharacter>
                </CastInfo>
              </CastMember>
            ))}
          </CastGrid>
        </ContentSection>
      )}
      
      {trailers.length > 0 && (
        <ContentSection>
          <SectionTitle>Trailers & Videos</SectionTitle>
          <VideoGrid>
            {trailers.map(video => (
              <VideoContainer key={video.id}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoContainer>
            ))}
          </VideoGrid>
        </ContentSection>
      )}
      
      {recommendations.length > 0 && (
        <ContentSection>
          <SectionTitle>Recommendations</SectionTitle>
          <MovieGrid movies={recommendations} />
        </ContentSection>
      )}
      
      <ContentSection>
        <ReviewForm movieId={movie.id.toString()} onReviewSubmit={handleReviewSubmit} />
        <ReviewList reviews={movieReviews} />
      </ContentSection>
    </MovieContainer>
  );
};

export default MovieDetails;
