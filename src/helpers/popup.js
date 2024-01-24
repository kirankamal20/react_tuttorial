import React from 'react';
import './popup.css'

function AddNewItemModal({ isOpen, handleClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Add New Item</h2>
        {/* Add form elements or content for adding a new item */}
      </div>
    </div>
  );
}

export default AddNewItemModal;
