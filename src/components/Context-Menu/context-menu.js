import React from 'react';
import './context-menu.css';

const ContextMenu = ({ x, y, onClose, onCopyLink, onShowQRCode, isOrder, onEnableNext, onRemoveFromQueue }) => {
  const menuStyles = {
    bottom: window.innerHeight - y,
    left: x,
    ...(isOrder && { right: window.innerWidth - x, left: 'auto' })
  };

  return (
    <ul className="context-menu" style={menuStyles}>
      {!isOrder && (
        <>
          <li onClick={onCopyLink}>Copy link</li>
          <li onClick={onShowQRCode}>Show QR-code</li>
        </>
      )}
      {isOrder && (
        <>
          <li onClick={onEnableNext}>Enable Next</li>
          <li onClick={onRemoveFromQueue}>Remove from Queue</li>
        </>
      )}
    </ul>
  );
};

export default ContextMenu;