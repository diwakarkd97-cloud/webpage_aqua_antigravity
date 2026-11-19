import React, { useEffect } from 'react';

/**
 * Reusable modal/drawer component.
 * Uses vanilla DOM listeners to lock background body scrolling when opened.
 */
export const Modal = ({ isOpen, onClose, title, children, isDrawer = false }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isDrawer ? 'modal-drawer-slide' : 'modal-dialog'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal interior
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
