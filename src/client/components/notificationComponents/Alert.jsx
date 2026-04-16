import React from 'react';
import './Alert.css';

const Alert = ({ type = 'success', title, desc, time, unread = false }) => {
  return (
    <div className={`alert-item ${type}`}>
      <div className="alert-icon">
        {type === 'success' ? '✓' : '!'}
      </div>
      <div className="alert-content">
        <p className="alert-title">{title}</p>
        <p className="alert-desc">{desc}</p>
        <span className="alert-time">{time}</span>
      </div>
      {unread && <div className="alert-dot" />}
    </div>
  );
};

export default Alert;