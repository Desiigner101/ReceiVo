import React, { useState } from 'react'
import HomePage from './pages/Home/HomePage'
import VaultPage from './pages/Vault/VaultPage'
import WarrantyPage from './pages/Warranty/WarrantyPage'
import NotificationPage from './pages/Notification/NotificationPage'
import './app.css'

export default function App() {
  const [activePage, setActivePage] = useState('Home')

  const renderPage = () => {
    switch (activePage) {
      case 'Home':        return <HomePage activePage={activePage} onNavigate={setActivePage} />
      case 'Vault':       return <VaultPage activePage={activePage} onNavigate={setActivePage} />
      case 'Warranty':    return <WarrantyPage activePage={activePage} onNavigate={setActivePage} />
      case 'Notification':return <NotificationPage activePage={activePage} onNavigate={setActivePage} />
      default:            return <HomePage activePage={activePage} onNavigate={setActivePage} />
    }
  }

  return <>{renderPage()}</>
}