import React from "react";

interface WizeButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const WizeButton: React.FC<WizeButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default WizeButton;
