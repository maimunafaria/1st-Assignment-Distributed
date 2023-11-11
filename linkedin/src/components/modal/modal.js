import React, { useState } from 'react';
import './modal.css'; 

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalStyles = {
    display: isOpen ? 'block' : 'none',
  };

  return (
    <div className="modal" style={modalStyles}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onClose}>&times;</span>
          <h3>{title}</h3>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
