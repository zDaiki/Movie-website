
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: white;
  padding: 30px 20px;
  margin-top: 40px;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--secondary-color);
`;

const FooterLink = styled(Link)`
  color: var(--light-text);
  text-decoration: none;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>DaikiMovies</FooterTitle>
          <p>Yoh Website ma dami dami movie herna paicha rey hai</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Explore</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/search?type=trending">Trending Movies</FooterLink>
          <FooterLink to="/search?type=popular">Popular Movies</FooterLink>
          <FooterLink to="/search">Search</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Popular Genres</FooterTitle>
          <FooterLink to="/genre/28">Action</FooterLink>
          <FooterLink to="/genre/35">Comedy</FooterLink>
          <FooterLink to="/genre/18">Drama</FooterLink>
          <FooterLink to="/genre/27">Horror</FooterLink>
          <FooterLink to="/genre/10749">Romance</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} DaikiMovies. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
