import React, { useState, useEffect } from 'react';
import './NotificationPage.css';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import Alert from '../../components/notificationComponents/Alert';
import { fetchNotifications, markAllAsRead } from '../../api/notificationService';

const NotificationPage = ({ activePage, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async (isInitialLoad = false) => {
    // Only show the loading screen on the very first load to prevent UI blinking
    if (isInitialLoad) setLoading(true);
    
    const data = await fetchNotifications();
    setNotifications(data);
    
    if (isInitialLoad) setLoading(false);
  };

  // --- PHASE 4: Real-Time Polling ---
  useEffect(() => {
    // 1. Initial Load
    loadData(true);

    // 2. Start polling every 10 seconds (10000 ms)
    const pollInterval = setInterval(() => {
      loadData(false);
    }, 10000);

    // 3. Cleanup the interval if the user navigates away from the page
    return () => clearInterval(pollInterval);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'read') return !n.unread;
    return true;
  });

  // --- PHASE 5: Mark as Read in Database ---
  const markAllRead = async () => {
    // 1. Get all IDs that are currently unread
    const unreadIds = notifications.filter(n => n.unread).map(n => n.id);
    if (unreadIds.length === 0) return;

    // 2. Optimistic UI Update (Instantly clear the badges so it feels snappy)
    setNotifications(notifications.map(n => ({ ...n, unread: false })));

    // 3. Update the ServiceNow database in the background
    await markAllAsRead(unreadIds);
  };

  return (
    <div className="notif-wrapper">
      <TopBar />
      <div className="notif-body">
        <NavigationBar activePage={activePage} onNavigate={onNavigate} unreadCount={unreadCount} />

        <div className="notif-main">
          <div className="notif-card">

            <div className="notif-header-row">
              <div>
                <h1 className="notif-title">Notifications</h1>
                <p className="notif-subtitle">{unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}</p>
              </div>
              <div className="notif-action-buttons">
                {/* Redundant buttons removed as requested! */}
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

            {loading ? (
              <div className="notif-empty">
                <p className="notif-empty-text">Loading notifications...</p>
              </div>
            ) : filteredNotifs.length === 0 ? (
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