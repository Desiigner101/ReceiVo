import React, { useState, useEffect } from 'react';
import './ReceiptDetails.css';
import { fetchAttachmentUrl, downloadAttachment } from '../../api/api';
import { FileClaimButton } from '../FileClaimButton';
const ReceiptDetails = ({ receipt, onBack }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const rawImageUrl = receipt?.u_image_url || receipt?.image_url || null;

  useEffect(() => {
    if (!rawImageUrl) return;
    let objectUrl;
    fetchAttachmentUrl(rawImageUrl)
      .then(url => { 
        objectUrl = url; 
        setBlobUrl(url); 
      })
      .catch(err => console.error('❌ Image load failed:', err));
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [rawImageUrl]);

  if (!receipt) return null;

  console.log('RECEIPT DATA:', JSON.stringify(receipt, null, 2));

  const receiptNum = receipt.u_receipt_number || receipt.receipt || '—';
  const store = receipt.u_store || receipt.store || '—';
  const category = receipt.u_category || receipt.category || '—';
  const date = receipt.u_purchase_date || receipt.u_date || receipt.date || '—';
  const amount = parseFloat(receipt.u_amount || receipt.amount) || 0;
  const invoiceNumber = receipt.u_invoice_number || receipt.invoiceNumber || null;
  const purpose = receipt.u_purpose || receipt.purpose || null;
  const notes = receipt.u_notes || receipt.notes || null;
  const imageUrl = receipt.u_image_url || receipt.image_url || null;
  const imageName = receipt.u_image_name || null;
  const currency = receipt.u_currency || receipt.currency || 'PHP';
  const warranty = receipt.u_warranty || receipt.warranty || 'None';
  const warrantyEndDate = receipt.u_warranty_end_date || null;
  const warrantyDuration = receipt.u_warranty_duration || null;
  const brand = receipt.u_brand || null;
  const productName = receipt.u_product_name || null;
  const serialNumber = receipt.u_serial_number || null;
  const tags = receipt.u_tags || null;
  const claimType = receipt.u_intended_claim_type || null;
  const notificationRules = receipt.u_notification_rules || null;

  const safeParseArray = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [String(parsed)];
    } catch {
      return val.split(',').map(s => s.trim()).filter(Boolean);
    }
  };

  const parsedClaims = safeParseArray(claimType);
  const parsedTags = safeParseArray(tags);
  const parsedNotifications = safeParseArray(notificationRules);

  return (
    <div className="receipt-details-wrapper">

      <div className="receipt-details-header">
        <div className="receipt-details-header-left">
          <h1 className="vault-title">Digital Vault</h1>
          <p className="vault-subtitle">
            <span className="breadcrumb-back" onClick={onBack}>←</span>
            <span className="breadcrumb-text" onClick={onBack} style={{cursor:'pointer'}}>Digital Vault</span>
            <span className="breadcrumb-sep"> / </span>
            <span className="breadcrumb-current">{receiptNum}</span>
          </p>
        </div>
        <div className="receipt-details-header-right">
      <button
        className="btn-download-receipt"
        onClick={() => {
          if (!blobUrl || !imageName) return;
          
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = imageName || `receipt_${store.toLowerCase().replace(/ /g, '_')}.jpg`;
          a.click(); 
        }}
      >
        ↓ Download proof
      </button>

        </div>
      </div>

      <div className="receipt-details-body">
        <div className="receipt-details-left">
          <div className="receipt-image-card">
            {blobUrl  ? (
              <img
                src={blobUrl}
                alt="Receipt"
                className="receipt-image-preview"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div className="receipt-image-placeholder">
                <div className="receipt-icon">📄</div>
              </div>
            )}
            <p className="receipt-filename">
              {imageName || `receipt_${store.toLowerCase().replace(/ /g, '_')}.jpg`}
            </p>
            <FileClaimButton 
            receipt={receipt} 
            onClaim={handleAfterClaim} 
          />
          <button> hello there </button>
          </div>
          {/* <button
            className="btn-view-full"
            onClick={() => blobUrl  && window.open(blobUrl , '_blank')}
          >
            View Full Image
          </button> */}


<button
  className="btn-view-full"
  onClick={() => {
    if (!blobUrl) return;
    const win = window.open();
    win.document.write(`<img src="${blobUrl}" style="max-width:100%;"/>`);
  }}
>
  View Full Image
</button>
        </div>

        {}
        <div className="receipt-details-right">
          <div className="receipt-info-card">

            {}
            <div className="receipt-info-section">
              <h3 className="section-title">Transaction Details</h3>

              <div className="receipt-info-field">
                <span className="field-label">RECEIPT ID</span>
                <span className="field-value receipt-id">{receiptNum}</span>
              </div>
              <div className="receipt-divider" />

              <div className="receipt-info-field">
                <span className="field-label">STORE NAME</span>
                <span className="field-value">{store}</span>
              </div>
              <div className="receipt-divider" />

              <div className="receipt-info-field">
                <span className="field-label">CATEGORY</span>
                <span className={`category-pill ${category.toLowerCase().replace(/ /g, '_')}`}>
                  {category}
                </span>
              </div>
              <div className="receipt-divider" />

              <div className="receipt-info-field">
                <span className="field-label">PURCHASE DATE</span>
                <span className="field-value">{date}</span>
              </div>
              <div className="receipt-divider" />

              <div className="receipt-info-field">
                <span className="field-label">TOTAL AMOUNT</span>
                <span className="field-value amount">
                  {amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {invoiceNumber && (
                <>
                  <div className="receipt-divider" />
                  <div className="receipt-info-field">
                    <span className="field-label">INVOICE NUMBER</span>
                    <span className="field-value">{invoiceNumber}</span>
                  </div>
                </>
              )}

              {purpose && (
                <>
                  <div className="receipt-divider" />
                  <div className="receipt-info-field">
                    <span className="field-label">PURPOSE</span>
                    <span className="field-value">{purpose}</span>
                  </div>
                </>
              )}
            </div>
            {warranty && warranty !== 'None' && (
              <div className="linked-warranty-card">
                <div className="linked-warranty-header">
                  <span className="linked-warranty-title">Warranty Details</span>
                  <span className={`status-pill status-${warranty.toLowerCase()}`}>{warranty}</span>
                </div>

                {productName && (
                  <div className="receipt-info-field">
                    <span className="field-label">PRODUCT</span>
                    <span className="field-value">{productName}</span>
                  </div>
                )}
                {brand && (
                  <div className="receipt-info-field">
                    <span className="field-label">BRAND</span>
                    <span className="field-value">{brand}</span>
                  </div>
                )}
                {serialNumber && (
                  <div className="receipt-info-field">
                    <span className="field-label">SERIAL NO.</span>
                    <span className="field-value">{serialNumber}</span>
                  </div>
                )}
                {warrantyDuration && (
                  <div className="receipt-info-field">
                    <span className="field-label">DURATION</span>
                    <span className="field-value">{warrantyDuration} days</span>
                  </div>
                )}
                {warrantyEndDate && (
                  <div className="receipt-info-field">
                    <span className="field-label">EXPIRES</span>
                    <span className="field-value">{warrantyEndDate}</span>
                  </div>
                )}
              </div>
            )}
            {parsedClaims?.length > 0 && (
              <div className="receipt-info-section">
                <h3 className="section-title">Intended Claim Type</h3>
                <div className="claim-type-list">
                  {parsedClaims.map((claim, i) => (
                    <span key={i} className="claim-pill">{claim}</span>
                  ))}
                </div>
              </div>
            )}
            {parsedTags?.length > 0 && (
              <div className="receipt-info-section">
                <h3 className="section-title">Tags</h3>
                <div className="tags-list">
                  {parsedTags.map((tag, i) => (
                    <span key={i} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {notes && (
              <div className="receipt-info-section">
                <h3 className="section-title">Notes</h3>
                <p className="receipt-notes">{notes}</p>
              </div>
            )}
            <div className="receipt-info-section">
              <h3 className="section-title">Notification Preferences</h3>
              <div className="notification-options">
                {parsedNotifications?.length > 0 ? (
                  parsedNotifications.map((rule, i) => (
                    <label key={i} className="notification-item">
                      <input type="checkbox" defaultChecked={true} readOnly />
                      <span>{rule}</span>
                    </label>
                  ))
                ) : (
                  <>
                    <label className="notification-item">
                      <input type="checkbox" defaultChecked={true} />
                      <span>Alert me 3 days before return window closes</span>
                    </label>
                    <label className="notification-item">
                      <input type="checkbox" defaultChecked={false} />
                      <span>Alert me 14 days before PhilHealth/HMO filing deadline</span>
                    </label>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetails;