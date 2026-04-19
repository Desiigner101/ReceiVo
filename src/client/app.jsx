import React, { useState, useEffect } from 'react'
import HomePage from './pages/Home/HomePage'
import VaultPage from './pages/Vault/VaultPage'
import NotificationPage from './pages/Notification/NotificationPage'
import Toast from './components/globalComponents/Toast'
import { fetchReceipts } from './api/receiptService'

import './app.css'

export default function App() {
  const [activePage, setActivePage] = useState('Home')
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchReceipts()
      .then(list => {
        setReceipts(list)
        setLoading(false)
      })
      .catch(() => {
        setReceipts([])
        setLoading(false)
      })
  }, [])

  const addReceipt = () => {
    fetchReceipts()
      .then(list => setReceipts(list))
      .catch(() => {})
    showToast('Receipt saved successfully!')
  }

  const deleteReceiptFromState = (sysId) => {
    setReceipts(prev => prev.filter(r => (r.sys_id || r.id) !== sysId));
    showToast('Receipt deleted successfully!', 'success');
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Montserrat, sans-serif', color: '#00BFA5', fontSize: 18 }}>
      Loading...
    </div>
  )
  const renderPage = () => {
    switch (activePage) {
      case 'Home':         return <HomePage activePage={activePage} onNavigate={setActivePage} receipts={receipts} onAddReceipt={addReceipt} onDelete={deleteReceiptFromState} />
      case 'Vault':        return <VaultPage activePage={activePage} onNavigate={setActivePage} receipts={receipts} onDelete={deleteReceiptFromState} />
      case 'Notification': return <NotificationPage activePage={activePage} onNavigate={setActivePage} />
      default:             return <HomePage activePage={activePage} onNavigate={setActivePage} receipts={receipts} onAddReceipt={addReceipt} onDelete={deleteReceiptFromState} />
    }
  }
  return (
    <>
      {renderPage()}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}