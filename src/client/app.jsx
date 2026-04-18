import React, { useState, useEffect } from 'react'
import HomePage from './pages/Home/HomePage'
import VaultPage from './pages/Vault/VaultPage'
import WarrantyPage from './pages/Warranty/WarrantyPage'
import NotificationPage from './pages/Notification/NotificationPage'
import Toast from './components/globalComponents/Toast'
import './app.css'

const RECEIPT_API = '/api/1984201/receipt'

export default function App() {
  const [activePage, setActivePage] = useState('Home')
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetch(RECEIPT_API)
      .then(res => res.json())
      .then(data => { setReceipts(data); setLoading(false); })
      .catch(() => setLoading(false))
  }, [])

  const addReceipt = (newReceipt) => {
    fetch(RECEIPT_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReceipt)
    })
      .then(res => res.json())
      .then(data => {
        setReceipts(prev => [{ ...newReceipt, id: data.id }, ...prev])
        showToast('Receipt saved successfully!')
      })
      .catch(() => showToast('Failed to save receipt.', 'error'))
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Montserrat, sans-serif', color: '#00BFA5', fontSize: 18 }}>
      Loading...
    </div>
  )

  const renderPage = () => {
    switch (activePage) {
      case 'Home':         return <HomePage activePage={activePage} onNavigate={setActivePage} receipts={receipts} onAddReceipt={addReceipt} />
      case 'Vault':        return <VaultPage activePage={activePage} onNavigate={setActivePage} receipts={receipts} />
      case 'Warranty':     return <WarrantyPage activePage={activePage} onNavigate={setActivePage} />
      case 'Notification': return <NotificationPage activePage={activePage} onNavigate={setActivePage} />
      default:             return <HomePage activePage={activePage} onNavigate={setActivePage} receipts={receipts} onAddReceipt={addReceipt} />
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