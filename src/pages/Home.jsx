
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFeaturedMovies, getTrendingMovies, getPopularMovies } from '../services/api';
import Carousel from '../components/Carousel';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--primary-color);
`;

const ErrorMessage = styled.div`
  padding: 20px;
  background-color: #fff0f0;
  border-left: 4px solid #ff3b30;
  margin-bottom: 20px;
`;

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data concurrently
        const [featured, trending, popular] = await Promise.all([
          getFeaturedMovies(),
          getTrendingMovies(),
          getPopularMovies()
        ]);
        
        setFeaturedMovies(featured);
        setTrendingMovies(trending.results);
        setPopularMovies(popular.results);
        setError(null);
      } catch (error) {
        console.error('Error loading home page data:', error);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {featuredMovies.length > 0 && (
        <Carousel movies={featuredMovies} />
      )}
      
      <Section>
        <SectionHeader>
          <SectionTitle>Trending This Week</SectionTitle>
        </SectionHeader>
        <MovieGrid movies={trendingMovies.slice(0, 6)} />
      </Section>
      
      <Section>
        <SectionHeader>
          <SectionTitle>Popular Movies</SectionTitle>
        </SectionHeader>
        <MovieGrid movies={popularMovies.slice(0, 6)} />
      </Section>
    </div>
  );
};

export default Home;
