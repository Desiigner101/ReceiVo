import React, { useState } from 'react';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import ReceiptDetails from '../../components/displayComponents/ReceiptDetails';
import mockReceipts from './mockReceipts.json';
import './VaultPage.css';

function VaultPage({ activePage, onNavigate }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  return (
    <div className="vault-wrapper">
      <TopBar />
      <div className="vault-body">
        <NavigationBar activePage={activePage} onNavigate={onNavigate} />
        <div className="vault-main">
          {selectedReceipt ? (
            <ReceiptDetails
              receipt={selectedReceipt}
              onBack={() => setSelectedReceipt(null)}
            />
          ) : (
            <>
              <h1>Digital Vault</h1>
              <p>{mockReceipts.length} receipts stored</p>
              <ReceiptsTable
                data={mockReceipts}
                onView={(receipt) => setSelectedReceipt(receipt)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VaultPage;