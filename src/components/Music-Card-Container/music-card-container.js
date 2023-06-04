import React, { useState, useContext } from 'react';
import './music-card-container.css';
import MusicCard from '../Music-Card/music-card';
import MoreBtn from '../More-Btn/more-btn';
import { MusicDataContext } from '../../contexts/MusicDataContext';
import { Link } from 'react-router-dom'
const MusicCardContainer = (props) => {
  const { ID, title, slice, handleCardClick, activeCard, isOrder, path, isChild, isMoreActive} = props;
  const musicData = useContext(MusicDataContext)[ID].slice(0, slice);
  const [toggle, setToggle] = useState(false);
  const containerClassName = `music-card-container ${isOrder? 'order' : ''}`;

  const handleOverlayToggle = (cardIndex) => {
    setToggle(!toggle);
    if (activeCard.cardIndex === cardIndex && activeCard.containerIndex === ID) {
      handleCardClick(cardIndex, musicData[cardIndex].title, musicData[cardIndex].author, musicData[cardIndex].imagePath,  musicData[cardIndex].musicPath, ID, false, toggle);
    } else {
      handleCardClick(cardIndex, musicData[cardIndex].title, musicData[cardIndex].author, musicData[cardIndex].imagePath, musicData[cardIndex].musicPath, ID, true, toggle);
    }
  };

  return (
    <div className="container-music-card">
      <h1>{title}</h1>
      <div className={containerClassName}>
        {musicData.map((music, index) => (
          <MusicCard
            small={isOrder ? true : false}
            key={music.title}
            title={music.title}
            author={music.author}
            imagePath={music.imagePath}
            showOverlay={true}
            onClick={handleCardClick}
            bufferIndex={index}
            isPaused={index === activeCard.cardIndex && activeCard.containerIndex === ID}
            onOverlayToggle={() => handleOverlayToggle(index)}
            ID={ID}
            activeCard={activeCard}
            likeIcon={isOrder ? true : undefined}
            moreIcon={isOrder ? true : undefined}
          />
        ))}
      </div>

      {!isMoreActive && <Link to={path}><MoreBtn /></Link>}
    </div>
  );
};

export default MusicCardContainer;