import React, { useEffect, useState } from "react";
import "./WizeModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const WizeModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose && onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className="wize-modal-overlay" onClick={handleClose}>
          <div
            className="wize-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WizeModal;
