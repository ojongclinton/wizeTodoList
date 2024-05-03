import React from "react";

interface WizeButtonProps {
  onClick: () => void;
}

const WizeButton: React.FC<WizeButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>CLICK!</button>;
};

export default WizeButton;
