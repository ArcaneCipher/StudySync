import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = ""}) => {
  return (
    <button className={`btn ${variant} ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
