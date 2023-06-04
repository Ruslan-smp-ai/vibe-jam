import React, { useState } from 'react';
import './menu.css';
import home from "../../svg/home.svg";
import searchInactive from "../../svg/search-inactive.svg";
import searchActive from "../../svg/search.svg";
import story from "../../svg/history.svg";
import mediastack from "../../svg/mediastack.svg";
import navigate from "../../svg/navigator.svg";
import vip from "../../svg/vip.svg";
import { Link } from 'react-router-dom'

const Menu = ({ activeIcon, handleClick, isSearchActive, setIsSearchActive, isPlayerActive }) => {
    const menuClassName = `menu ${isPlayerActive ? 'player-is-active' : ''}`;
    const [activeMenuItem, setActiveMenuItem] = useState(1);
    const [buffer, setBuffer] = useState(1);
    const handleItemClick = (iconId) => {
      if (iconId === 2) {
        setActiveMenuItem(buffer);
        setIsSearchActive(!isSearchActive);
      } else {
        setIsSearchActive(false);
        setActiveMenuItem(iconId);
        setBuffer(iconId);
      }
      handleClick(iconId);
      
      console.log(buffer);
    };
  
    return (
      <div className={menuClassName}>
        <ul>
        <Link to="/">
          <li className={`menu-element ${activeMenuItem === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
            <img src={home} className="icon" alt="Home" />
          </li>
        </Link>
          <li className={`search-element ${activeMenuItem === 2 ? 'active' : ''}`} onClick={() => handleItemClick(2)}>
            <img src={isSearchActive ? searchActive : searchInactive} className="icon" alt="Search" />
          </li>
          <li className={`menu-element ${activeMenuItem === 3 ? 'active' : ''}`} onClick={() => handleItemClick(3)}>
            <img src={story} className="icon" alt="Story" />
          </li>
          <li className={`menu-element ${activeMenuItem === 4 ? 'active' : ''}`} onClick={() => handleItemClick(4)}>
            <img src={mediastack} className="icon" alt="Media Stack" />
          </li>
          <li className={`menu-element ${activeMenuItem === 5 ? 'active' : ''}`} onClick={() => handleItemClick(5)}>
            <img src={navigate} className="icon" alt="Navigate" />
          </li>
          <li className={`menu-element ${activeMenuItem === 6 ? 'active' : ''}`} onClick={() => handleItemClick(6)}>
            <img src={vip} className="icon" alt="VIP" />
          </li>
        </ul>
      </div>
    );
  };
  
  export default Menu;