import React, { useState } from 'react';
import './colors.css'
import './ReceiptsTable.css';

export const ReceiptsTable = ({ data, onView }) => {
  const receipts = data || [];

  return (
    <div id="receipts-table-container" className="receipts-table-container">
      <table id="receipts-table" className="receipts-table" border="1">
        <thead id="table-header" className="table-header">
          <tr id="header-row" className="header-row">
            <th id="receipt-header" className="receipt-header">RECEIPT</th>
            <th id="store-header" className="store-header">STORE</th>
            <th id="category-header" className="category-header">CATEGORY</th>
            <th id="date-header" className="date-header">DATE</th>
            <th id="amount-header" className="amount-header">AMOUNT</th>
            <th id="warranty-header" className="warranty-header">WARRANTY</th>
            <th id="action-header" className="action-header">ACTION</th>
          </tr>
        </thead>
        <tbody id="table-body" className="table-body">
          {receipts.map((receipt) => (
            <tr id={`receipt-row-${receipt.id}`} key={receipt.id} className="receipt-row">
              <td id={`receipt-cell-${receipt.id}`} className="receipt-cell">{receipt.receipt}</td>
              
              <td id={`store-cell-${receipt.id}`} className="store-cell">
                <span className="store-name">{receipt.store}</span>
              </td>
              
              <td id={`category-cell-${receipt.id}`} className="category-cell">
                <span className={`category-pill ${receipt.category.toLowerCase()}`}>
                  {receipt.category}
                </span>
              </td>
              
              <td id={`date-cell-${receipt.id}`} className="date-cell">{receipt.date}</td>
              
              <td id={`amount-cell-${receipt.id}`} className="amount-cell">₱{receipt.amount.toFixed(2)}</td>
              
              <td id={`warranty-cell-${receipt.id}`} className="warranty-cell">
                <span className={`warranty-pill ${receipt.warranty.toLowerCase()}`}>
                  {receipt.warranty}
                </span>
              </td>
              
              <td id={`action-cell-${receipt.id}`} className="action-cell">
                <div id={`action-buttons-${receipt.id}`} className="action-buttons">
                  <button 
                    id={`view-btn-${receipt.id}`} 
                    className="btn btn-view"
                    onClick={() => onView && onView(receipt)}
                  >👁</button>
                  <button id={`edit-btn-${receipt.id}`} className="btn btn-edit">✎</button>
                  <button id={`delete-btn-${receipt.id}`} className="btn btn-delete">🗑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};