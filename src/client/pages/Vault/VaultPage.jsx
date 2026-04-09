import React from 'react';
import { ReceiptsTable } from "./components/ReceiptsTable";
import mockReceipts from './mockReceipts.json';

function VaultPage() {
  const totalRecords = mockReceipts.length; 
  return (
    <div style={{ margin: 0, textAlign: "left"}}>
      <h1>Digital Vault</h1>
      
      <p>
        {totalRecords} receipts stored
      </p>
      
      <ReceiptsTable data={mockReceipts} />
    </div>
  );
}

export default VaultPage;
