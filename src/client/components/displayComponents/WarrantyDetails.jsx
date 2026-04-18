import React from 'react';
import './WarrantyDetails.css';
import mockWarranty from '../../pages/Warranty/mockWarranties.json';

const WarrantyDetails = ({ warranty, onBack }) => {
    if (!warranty) return null;

    return (
        <div className="warranty-details-wrapper">
            <div className="warranty-details-breadcrumb">
                <span className="wd-breadcrumb-back" onClick={onBack}>←</span>
                <span className="wd-breadcrumb-text">Warranty Vault</span>
                <span className="wd-breadcrumb-sep">/</span>
                <span className="wd-breadcrumb-current">{warranty.itemName}</span>
            </div>

            <div className="warranty-details-card">
                <div className="wd-header">
                    <div>
                        <h2 className="wd-item-name">{warranty.itemName}</h2>
                        <p className="wd-linked-receipt-label">#{warranty.linkedReceipt}</p>
                    </div>
                    <span className={`wd-status-pill wd-status-${warranty.status.toLowerCase()}`}>
                        {warranty.status}
                    </span>
                </div>

                <div className="wd-fields">
                    <div className="wd-field">
                        <span className="wd-label">LINKED RECEIPT</span>
                        <span className="wd-value wd-receipt-link">#{warranty.linkedReceipt}</span>
                    </div>
                    <div className="wd-field">
                        <span className="wd-label">EXPIRY DATE</span>
                        <span className="wd-value">{warranty.expiryDate}</span>
                    </div>
                    <div className="wd-field">
                        <span className="wd-label">DAYS LEFT</span>
                        <span className={`wd-days wd-days-${warranty.status.toLowerCase()}`}>
                            {warranty.status === 'Expired' ? 'Expired' : `${warranty.daysLeft} days`}
                        </span>
                    </div>
                    <div className="wd-field">
                        <span className="wd-label">ALERT</span>
                        <span className="wd-value">
                            {warranty.alertEnabled ? '🔔 Enabled' : '🔕 Disabled'}
                        </span>
                    </div>
                    <div className="wd-field">
                        <span className="wd-label">STATUS</span>
                        <span className={`wd-status-pill wd-status-${warranty.status.toLowerCase()}`}>
                            {warranty.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarrantyDetails;