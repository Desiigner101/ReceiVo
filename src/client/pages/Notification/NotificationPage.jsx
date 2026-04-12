import React, { useState } from 'react';
import './NotificationPage.css';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import Alert from '../../components/notificationComponents/Alert';

const mockWarrantyNotifs = [
  {
    id: 1,
    type: 'warning',
    title: 'Warranty Expiring Soon',
    desc: 'Blood Pressure Monitor expires in 32 days (May 10, 2026)',
    time: 'Apr 8, 2026 · 9:00 AM · via Flow Designer',
    unread: true,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Warranty Expiring Soon',
    desc: 'Digital Thermometer expires in 12 days (Apr 20, 2026)',
    time: 'Apr 8, 2026 · 8:00 AM · via Flow Designer',
    unread: true,
  },
  {
    id: 3,
    type: 'success',
    title: 'Receipt Uploaded Successfully',
    desc: '#RCV-0024 from Mercury Drug has been saved to your vault.',
    time: 'Apr 6, 2026 · 3:21 PM',
    unread: false,
  },
  {
    id: 4,
    type: 'success',
    title: 'Receipt Uploaded Successfully',
    desc: '#RCV-0023 from Watsons has been saved to your vault.',
    time: 'Apr 3, 2026 · 1:14 PM',
    unread: false,
  },
];

const NotificationPage = () => {
  const [activePage, setActivePage] = useState('Notification');
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(mockWarrantyNotifs);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'read') return !n.unread;
    return true;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="notif-wrapper">
      <TopBar />
      <div className="notif-body">
        <NavigationBar activePage={activePage} onNavigate={setActivePage} />

        <div className="notif-main">
          <div className="notif-card">

            <div className="notif-header-row">
              <div>
                <h1 className="notif-title">Notifications</h1>
                <p className="notif-subtitle">{unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}</p>
              </div>
              <div className="notif-action-buttons">
                <button
                  className={`notif-btn ${activeTab === 'unread' ? 'active' : ''}`}
                  onClick={() => setActiveTab('unread')}
                >
                  Unread
                </button>
                <button
                  className={`notif-btn ${activeTab === 'read' ? 'active' : ''}`}
                  onClick={() => setActiveTab('read')}
                >
                  Read
                </button>
                <button className="notif-btn primary" onClick={markAllRead}>
                  Mark All Read
                </button>
              </div>
            </div>

            <div className="notif-tabs">
              <button
                className={`notif-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All({notifications.length})
              </button>
              <button
                className={`notif-tab ${activeTab === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread({unreadCount})
              </button>
              <button
                className={`notif-tab ${activeTab === 'read' ? 'active' : ''}`}
                onClick={() => setActiveTab('read')}
              >
                Read({notifications.length - unreadCount})
              </button>
            </div>

            {filteredNotifs.length === 0 ? (
              <div className="notif-empty">
                <div className="notif-empty-icon">🔔</div>
                <p className="notif-empty-text">No notifications</p>
                <p className="notif-empty-subtext">You don't have any notifications yet.</p>
              </div>
            ) : (
              <div className="notif-cards-grid">
                {filteredNotifs.map(notif => (
                  <Alert
                    key={notif.id}
                    type={notif.type}
                    title={notif.title}
                    desc={notif.desc}
                    time={notif.time}
                    unread={notif.unread}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;