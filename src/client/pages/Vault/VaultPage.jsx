import React, { useState } from 'react';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import mockReceipts from './mockReceipts.json';
import './VaultPage.css';

function VaultPage({ activePage, onNavigate }) {
  return (
    <div className="vault-wrapper">
      <TopBar />
      <div className="vault-body">
        <NavigationBar activePage={activePage} onNavigate={onNavigate} />
        <div className="vault-main">
          <h1>Digital Vault</h1>
          <p>{mockReceipts.length} receipts stored</p>
          <ReceiptsTable data={mockReceipts} />
        </div>
      </div>
    </div>
  )
}

export default VaultPage