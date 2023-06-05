import React, { useState } from 'react';
import './music-card.css';
import moreOrder from '../../svg/more-order.svg'
import { useEffect, useRef } from 'react';
import ContextMenu from '../Context-Menu/context-menu';
const MusicCard = (props) => {
  const { title, author, imagePath, small, moreIcon, children, onClick, isPaused, onOverlayToggle, musicPath, bufferIndex, ID } = props;
  const cardClassName = `music-card ${small ? 'small' : ''} ${isPaused ? 'active-card' : ''}`;
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const contextMenuRef = useRef();
  const MAX_CHARACTERS = small ? 50 : 15;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (contextMenuVisible && !contextMenuRef.current.contains(e.target)) {
        setContextMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [contextMenuVisible]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuPosition({ x: clientX, y: clientY });
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleEnableNext = () => {
    // Логика для отображения QR-кода
    handleCloseContextMenu();
  };

  const handleRemoveFromQueue = () => {
    // Логика для отображения QR-кода
    handleCloseContextMenu();
  };


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
        {moreIcon && <img className='order-icons' onContextMenu={handleContextMenu} onClick={handleContextMenu} src={moreOrder} alt="More" />}
        {contextMenuVisible && (
          <div ref={contextMenuRef}>
            <ContextMenu
              x={contextMenuPosition.x}
              y={contextMenuPosition.y}
              onClose={handleCloseContextMenu}
              isOrder
              onEnableNext={handleEnableNext}
              onRemoveFromQueue={handleRemoveFromQueue}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default MusicCard;