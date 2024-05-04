import React, { InputHTMLAttributes } from "react";

interface WizeInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const WizeInput: React.FC<WizeInputProps> = ({ type, ...rest }) => {
  return <input type={type} {...rest} />;
};

export default WizeInput;
