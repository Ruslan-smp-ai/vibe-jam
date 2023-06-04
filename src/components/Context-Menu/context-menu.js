import React from 'react';
import './context-menu.css';
const ContextMenu = ({ x, y, onClose, onCopyLink, onShowQRCode }) => {
  return (
    <ul className="context-menu" style={{ bottom: window.innerHeight - y, left: x }}>
      <li onClick={onCopyLink}>Copy link</li>
      <li onClick={onShowQRCode}>Show QR-code</li>
    </ul>
  );
};

export default ContextMenu;