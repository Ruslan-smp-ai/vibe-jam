import React, { useContext } from 'react';
import './search-container.css';
import closeSearch from '../../svg/close-search.svg';
import { MusicDataContext } from '../../contexts/MusicDataContext';
import { useNavigate } from 'react-router-dom'

const Search = ({ activeIcon, isSearchActive, setIsSearchActive, handleClick, isOrderActive }) => {
  const { setSearchTerm, performSearch } = useContext(MusicDataContext);
  let navigate = useNavigate();

  const handleButtonClick = () => {
    setIsSearchActive(false);
    handleClick(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      performSearch();
      navigate('search-results');
    }
  };

  return (
    <div className={`search-container ${activeIcon === 2 && isSearchActive ? 'search-is-active' : ''}  ${isOrderActive ? 'order-is-active' : ''}`}>
      <input type='text' placeholder="What are you looking for, Ruslan?" onKeyPress={handleKeyPress} onChange={(event) => setSearchTerm(event.target.value)} />
      <img src={closeSearch} className="closebtn" onClick={handleButtonClick} />
    </div>
  );
};

export default Search;