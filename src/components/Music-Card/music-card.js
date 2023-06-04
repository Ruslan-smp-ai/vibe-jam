import React, { useState } from 'react';
import './music-card.css';
import moreOrder from '../../svg/more-order.svg'
const MusicCard = (props) => {
  const { title, author, imagePath, small, moreIcon, children, onClick, isPaused, onOverlayToggle, musicPath, bufferIndex, ID } = props;
  const cardClassName = `music-card ${small ? 'small' : ''} ${isPaused ? 'active-card' : ''}`;
  const MAX_CHARACTERS = small ? 50 : 15;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const handleOverlayClick = () => {
    if (onClick) {
      onClick(bufferIndex, title, author, imagePath, musicPath, ID);
    }
    if (onOverlayToggle) {
      onOverlayToggle(bufferIndex);
    }
  };
  return (
    <div className={cardClassName}>
      <div className='container-info'>
        <img src={imagePath} alt={title} onClick={handleOverlayClick} />
        <div className='text-block'>
          <p>{truncateText(title, MAX_CHARACTERS)}</p>
          <p className='author'>{author}</p>
        </div>
      </div>
      <div className='container-info'>
      {moreIcon && <img className='order-icons' src={moreOrder} alt="More" />}
      </div>
      {children}
    </div>
  );
};

export default MusicCard;