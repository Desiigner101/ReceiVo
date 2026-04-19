import React, { useState } from 'react';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import ReceiptDetails from '../../components/displayComponents/ReceiptDetails';
import './VaultPage.css';

function VaultPage({ activePage, onNavigate, receipts, onDelete }) {
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
              <div className="vault-header">
                <div>
                  <h1 className="vault-page-title">Digital Vault</h1>
                  <p className="vault-page-subtitle">{receipts.length} receipts stored</p>
                </div>
              </div>
              <ReceiptsTable
                data={receipts}
                onView={(receipt) => setSelectedReceipt(receipt)}
                onDelete={onDelete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VaultPage;