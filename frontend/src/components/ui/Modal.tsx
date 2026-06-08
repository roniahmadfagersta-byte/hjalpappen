import React, { useEffect } from 'react';
import Card from './Card';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <Card
        className="modal-content"
        variant="glass-heavy"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <Button
            variant="glass"
            size="sm"
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Stäng"
          >
            ✕
          </Button>
        </div>
        <div className="modal-body">{children}</div>
        {footerActions && <div className="modal-footer">{footerActions}</div>}
      </Card>
    </div>
  );
};

export default Modal;
