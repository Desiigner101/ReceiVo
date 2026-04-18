import React from 'react';
import './ReceiptDetails.css';
import mockWarranties from '../../pages/Warranty/mockWarranties.json';

const ReceiptDetails = ({ receipt, onBack }) => {
    if (!receipt) return null;

    const linkedWarranty = mockWarranties.find(
        w => w.linkedReceipt === receipt.receipt
    );

    return (
        <div className="receipt-details-wrapper">
            <div className="receipt-details-breadcrumb">
                <span className="breadcrumb-back" onClick={onBack}>←</span>
                <span className="breadcrumb-text">Digital Vault</span>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">#{receipt.receipt}</span>
            </div>

            <div className="receipt-details-body">
                <div className="receipt-details-left">
                    <div className="receipt-image-card">
                        <div className="receipt-image-placeholder">
                            <div className="receipt-icon">📄</div>
                        </div>
                        <p className="receipt-filename">
                            receipt_{receipt.store.toLowerCase().replace(/ /g, '_')}.jpg
                        </p>
                    </div>
                    <button className="btn-view-full">View Full Image</button>
                </div>

                <div className="receipt-details-right">
                    <div className="receipt-info-card">

                        {/* Transaction Details */}
                        <div className="receipt-info-section">
                            <h3 className="section-title">Transaction Details</h3>
                            <div className="receipt-info-field">
                                <span className="field-label">RECEIPT ID</span>
                                <span className="field-value receipt-id">#{receipt.receipt}</span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">INVOICE NUMBER</span>
                                <span className="field-value">{receipt.invoiceNumber || '—'}</span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">STORE / MERCHANT NAME</span>
                                <span className="field-value">{receipt.store}</span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">PURCHASE DATE</span>
                                <span className="field-value">{receipt.date}</span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">TOTAL AMOUNT</span>
                                <span className="field-value amount">
                                    {receipt.currency || 'PHP'} {receipt.amount.toFixed(2)}
                                </span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">CATEGORY</span>
                                <span className={`category-pill ${receipt.category.toLowerCase()}`}>
                                    {receipt.category}
                                </span>
                            </div>
                            <div className="receipt-info-field">
                                <span className="field-label">WARRANTY STATUS</span>
                                <span className={`status-pill status-${receipt.warranty.toLowerCase()}`}>
                                    {receipt.warranty}
                                </span>
                            </div>
                            {receipt.purpose && (
                                <div className="receipt-info-field">
                                    <span className="field-label">PURPOSE</span>
                                    <span className="field-value">{receipt.purpose}</span>
                                </div>
                            )}
                        </div>

                        {/* Claim Type */}
                        {receipt.claimType?.length > 0 && (
                            <div className="receipt-info-section">
                                <h3 className="section-title">Claim Type</h3>
                                <div className="claim-type-list">
                                    {receipt.claimType.map((claim, index) => (
                                        <span key={index} className="claim-pill">{claim}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}
                        {receipt.tags?.length > 0 && (
                            <div className="receipt-info-section">
                                <h3 className="section-title">Tags</h3>
                                <div className="tags-list">
                                    {receipt.tags.map((tag, index) => (
                                        <span key={index} className="tag-pill">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {receipt.notes && (
                            <div className="receipt-info-section">
                                <h3 className="section-title">Notes</h3>
                                <p className="receipt-notes">{receipt.notes}</p>
                            </div>
                        )}

                        {/* Linked Warranty */}
                        {linkedWarranty && (
                            <div className="receipt-info-section">
                                <h3 className="section-title">Linked Warranty</h3>
                                <div className="linked-warranty-card">
                                    <div className="linked-warranty-header">
                                        <span className="linked-warranty-title">{linkedWarranty.itemName}</span>
                                        <span className={`status-pill status-${linkedWarranty.status.toLowerCase()}`}>
                                            {linkedWarranty.status}
                                        </span>
                                    </div>
                                    <p className="linked-warranty-expiry">
                                        Expires: {linkedWarranty.expiryDate} · {linkedWarranty.daysLeft} days remaining
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Notification Preferences */}
                        <div className="receipt-info-section">
                            <h3 className="section-title">Notification Preferences</h3>
                            <div className="notification-options">
                                <label className="notification-item">
                                    <input
                                        type="checkbox"
                                        defaultChecked={receipt.notifications?.warrantyAlert7Days ?? true}
                                    />
                                    <span>Alert me 7 days before warranty expires</span>
                                </label>
                                <label className="notification-item">
                                    <input
                                        type="checkbox"
                                        defaultChecked={receipt.notifications?.returnWindowAlert3Days ?? true}
                                    />
                                    <span>Alert me 3 days before return window closes</span>
                                </label>
                                <label className="notification-item">
                                    <input
                                        type="checkbox"
                                        defaultChecked={receipt.notifications?.philhealthAlert14Days ?? false}
                                    />
                                    <span>Alert me 14 days before PhilHealth/HMO filing deadline</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptDetails;