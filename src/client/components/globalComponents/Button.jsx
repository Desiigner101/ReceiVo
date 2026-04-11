import React from 'react';
import './Button.css';

const Button = ({ label, icon, onClick, variant = 'primary' }) => {
  return (
    <button type="button" className={`btn btn-${variant}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;