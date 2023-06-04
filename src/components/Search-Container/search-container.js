import React from 'react';
import './search-container.css';
import closeSearch from '../../svg/close-search.svg';

const Search = ({ activeIcon, isSearchActive, setIsSearchActive, handleClick, isOrderActive }) => {

  const handleButtonClick = () => {
    setIsSearchActive(false);
    handleClick(null);
  };

  return (
    <div className={`search-container ${activeIcon === 2 && isSearchActive ? 'search-is-active' : ''}  ${isOrderActive? 'order-is-active' : ''}`}>
      <input type='text' placeholder="What are you looking for, Ruslan?" />
      <img src={closeSearch} className="closebtn" onClick={handleButtonClick} />
    </div>
  );
};

export default Search;