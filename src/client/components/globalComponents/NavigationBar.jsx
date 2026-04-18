import React from 'react';
import './NavigationBar.css';

// 1. Add unreadCount as a prop here (defaulting to 0)
const NavigationBar = ({ activePage, onNavigate, unreadCount = 0 }) => {
  const navItems = [
    { label: 'Home', icon: '⊞' },
    { label: 'Vault', icon: '🛡' },
    { label: 'Warranty', icon: '⬡' },
    // 2. Replace the hardcoded '2' with our dynamic unreadCount
    // This also hides the badge completely if the count is 0!
    { label: 'Notification', icon: '🔔', badge: unreadCount > 0 ? unreadCount : null },
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