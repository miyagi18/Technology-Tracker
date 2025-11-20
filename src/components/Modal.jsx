import React from 'react';

// Стили для модального окна (можно вынести в CSS)
const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  maxWidth: '90%',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
};

const modalHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  paddingBottom: '10px',
  marginBottom: '15px',
};

const closeButtonStyles = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#888',
};

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  // Останавливаем "всплытие" клика, чтобы клик по модалке
  // не закрывал ее (только клик по оверлею)
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={modalOverlayStyles} onClick={onClose}>
      <div style={modalContentStyles} onClick={handleContentClick}>
        <div style={modalHeaderStyles}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button style={closeButtonStyles} onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;