
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  padding: 15px 20px;
  color: white;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
`;

const Logo = styled(Link)`
  color: var(--light-text);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
`;

const NavLink = styled(Link)`
  color: var(--light-text);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 20px 0 0 20px;
  border: none;
  outline: none;
  width: 200px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const SearchButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          <span>MovieMania</span>
        </Logo>
        
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search?type=trending">Trending Movies</NavLink>
          <NavLink to="/search?type=popular">Popular</NavLink>
        </Nav>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchContainer>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
