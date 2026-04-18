const TABLE_NAME = 'x_1984201_receivo_notification';
const TABLE_API = `/api/now/table/${TABLE_NAME}`;

const getCsrfToken = () => {
  return window.g_ck || window.gel?.('sysparm_ck') || '';
};

const getHeaders = () => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-UserToken': getCsrfToken(),
  'X-Requested-With': 'XMLHttpRequest'
});

export const fetchNotifications = async () => {
  // Fetching with display_value=true formats the dates and choice fields nicely
  const url = `${TABLE_API}?sysparm_order_by_desc=sys_created_on&sysparm_display_value=true`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include'
    });

    if (!res.ok) {
      console.error('Failed to fetch notifications:', await res.text());
      return [];
    }

    const data = await res.json();
    const records = Array.isArray(data.result) ? data.result : [];

    // Map the ServiceNow fields to match your existing React props exactly
    return records.map(record => ({
      id: record.sys_id,
      type: record.type?.toLowerCase() || 'info', // 'success', 'warning'
      title: record.title,
      desc: record.description,
      time: record.sys_created_on, 
      unread: record.unread === 'true' // ServiceNow returns booleans as strings in display_value mode
    }));
  } catch (error) {
    console.error('Network error fetching notifications:', error);
    return [];
  }
};

export const markAllAsRead = async (unreadIds) => {
  if (!unreadIds || unreadIds.length === 0) return;

  try {
    // Send a PATCH request for every unread notification to set unread = false
    const promises = unreadIds.map(id => 
      fetch(`${TABLE_API}/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ unread: false })
      })
    );

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error('Failed to mark notifications as read:', error);
    return false;
  }
};