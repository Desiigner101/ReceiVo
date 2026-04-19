import React from 'react';
import './NavigationBar.css';

const NAV_ITEMS = [
  { label: 'Home', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { label: 'Vault', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  )},
  { label: 'Notification', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  )},
];

const NavigationBar = ({ activePage, onNavigate, unreadCount = 0 }) => {
  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    badge: item.label === 'Notification' && unreadCount > 0 ? unreadCount : null,
  }));

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <div className="navbar-brand-dot" />
        <p className="navbar-title">Navigation</p>
      </div>

      <ul className="navbar-list">
        {navItems.map((item) => {
          const isActive = activePage === item.label;
          return (
            <li
              key={item.label}
              className={`navbar-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate && onNavigate(item.label)}
            >
              {isActive && <span className="navbar-active-bar" />}
              <span className="navbar-icon">{item.icon}</span>
              <span className="navbar-label">{item.label}</span>
              {item.badge && (
                <span className="navbar-badge">{item.badge}</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="navbar-footer">
        <div className="navbar-footer-avatar">R</div>
        <div className="navbar-footer-info">
          <p className="navbar-footer-name">ReceiVo</p>
          <p className="navbar-footer-sub">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;