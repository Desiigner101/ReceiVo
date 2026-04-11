import React from 'react';
import './NavigationBar.css';

const NavigationBar = ({ activePage, onNavigate }) => {
  const navItems = [
    { label: 'Home', icon: '⊞' },
    { label: 'Vault', icon: '🛡' },
    { label: 'Warranty', icon: '⬡' },
    { label: 'Notification', icon: '🔔', badge: 2 },
  ];

  return (
    <div className="navbar">
      <p className="navbar-title">Navigation</p>
      <ul className="navbar-list">
        {navItems.map((item) => (
          <li
            key={item.label}
            className={`navbar-item ${activePage === item.label ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.label)}
          >
            <span className="navbar-icon">{item.icon}</span>
            <span className="navbar-label">{item.label}</span>
            {item.badge && (
              <span className="navbar-badge">{item.badge}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationBar;