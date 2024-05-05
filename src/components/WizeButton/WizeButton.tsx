import React from "react";

interface WizeButtonProps {
  onClick?: () => void; // Make onClick optional
  children: React.ReactNode;
}

const WizeButton: React.FC<WizeButtonProps> = ({ onClick, children }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default WizeButton;
