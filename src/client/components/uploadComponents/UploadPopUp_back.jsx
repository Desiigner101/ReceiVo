import React, { useState } from 'react';
import './UploadPopUp.css';
import { addReceiptWithImage } from '../../api/receiptService';

const STORES = [
  'Mercury Drug', 'Watsons', 'SM Appliance', 'Abenson', 'Power Mac Center',
  'The Medical City', "St. Luke's", 'Generika', 'Southstar Drug', 'Ace Hardware',
  'SM Department Store', 'Robinsons', 'Shopee', 'Lazada', 'Other'
];

const BRANDS = [
  'Samsung', 'Apple', 'LG', 'Sony', 'Panasonic', 'Asus', 'Lenovo',
  'HP', 'Dell', 'Acer', 'Fujidenzo', 'Hanabishi', 'TCL', 'Devant', 'Other'
];

const WARRANTY_DURATIONS = [
  '7 Days (Replacement Only)', '15 Days', '30 Days', '6 Months',
  '1 Year (Standard)', '2 Years', '3 Years', '5 Years',
  '10 Years (Compressor/Motor)', 'Lifetime Warranty', 'Custom'
];

const CURRENCIES = ['PHP', 'USD', 'EUR', 'JPY', 'SGD', 'AUD', 'GBP', 'CAD', 'HKD', 'KRW'];

// These are the exact strings saved to u_category in the database
const CATEGORIES = [
  'General Purchase / Return',
  'Medicine / Pharmacy',
  'Medical Service / Hospital',
  'Electronics / Appliance with Warranty',
  'Home / Furniture',
  'Online Order'
];

const CLAIM_TYPES = [
  'For Store Return / Refund',
  'For Warranty Claim',
  'For PhilHealth Reimbursement',
  'For HMO Reimbursement',
  'For Business Expense / BIR',
  'Just Keeping for Records'
];

const NOTIFICATION_PREFS = [
  'Alert me 7 days before warranty expires',
  'Alert me 3 days before return window closes',
  'Alert me 14 days before PhilHealth/HMO filing deadline'
];

const WARRANTY_DURATION_DAYS_MAP = {
  '7 Days (Replacement Only)': 7,
  '15 Days': 15,
  '30 Days': 30,
  '6 Months': 180,
  '1 Year (Standard)': 365,
  '2 Years': 730,
  '3 Years': 1095,
  '5 Years': 1825,
  '10 Years (Compressor/Motor)': 3650,
  'Lifetime Warranty': 36500,
};

const UploadPopUp = ({ onClose, onAddReceipt }) => {
  const [files, setFiles] = useState([]);
  const [photoConfirmed, setPhotoConfirmed] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [store, setStore] = useState('');
  const [otherStore, setOtherStore] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PHP');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  const [category, setCategory] = useState('');
  const [claimTypes, setClaimTypes] = useState([]);

  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [otherBrand, setOtherBrand] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [warrantyProvider, setWarrantyProvider] = useState('');
  const [warrantyDuration, setWarrantyDuration] = useState('');
  const [customDurationValue, setCustomDurationValue] = useState('');
  const [customDurationUnit, setCustomDurationUnit] = useState('Days');
  const [warrantyEndDate, setWarrantyEndDate] = useState('');

  const [notificationPrefs, setNotificationPrefs] = useState([]);
  const [errors, setErrors] = useState({});

  const isElectronics = category === 'Electronics / Appliance with Warranty';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, files: 'File too large. Please compress or upload a smaller image.' }));
      return;
    }
    setErrors(prev => ({ ...prev, files: null }));
    setFiles([file]);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles([file]);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleClaimType = (type) => {
    setClaimTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleNotifPref = (pref) => {
    setNotificationPrefs(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required.';
    } else if (new Date(purchaseDate) > new Date()) {
      newErrors.purchaseDate = 'Purchase date must be today or earlier.';
    }

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }

    if (isElectronics && !productName.trim()) {
      newErrors.productName = 'Product name/model is required for warranty tracking.';
    }

    if (warrantyEndDate && purchaseDate && new Date(warrantyEndDate) < new Date(purchaseDate)) {
      newErrors.warrantyEndDate = 'Warranty end date must be after purchase date.';
    }

    if (errors.files) newErrors.files = errors.files;
    if (!store) newErrors.store = 'Please select a store.';
    if (!category) newErrors.category = 'Please select a category.';
    if (claimTypes.length === 0) newErrors.claimTypes = 'Please select at least one claim type.';
    if (files.length > 0 && !photoConfirmed) newErrors.photoConfirmed = 'Please confirm the photo is clear and readable.';
    if (isElectronics && !warrantyProvider) newErrors.warrantyProvider = 'Please select who provides the warranty.';
    if (isElectronics && !warrantyDuration) newErrors.warrantyDuration = 'Please select a warranty duration.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const finalStore = store === 'Other' ? otherStore : store;
    const finalBrand = brand === 'Other' ? otherBrand : brand;

    const payload = {
      u_amount:         parseFloat(amount),
      u_category:       category,          // ← full name stored as-is, e.g. 'Medicine / Pharmacy'
      u_store:          finalStore,
      u_purchase_date:  purchaseDate,
      u_receipt_number: invoiceNumber,
      u_invoice_number: invoiceNumber,

      u_brand:          isElectronics ? finalBrand   : undefined,
      u_product_name:   isElectronics ? productName  : undefined,
      u_serial_number:  isElectronics ? serialNumber : undefined,
      u_warranty_provider: isElectronics ? warrantyProvider : undefined,

      ...(isElectronics && warrantyDuration ? {
        u_warranty_duration_days:
          warrantyDuration === 'Custom'
            ? parseInt(customDurationValue || 0)
            : WARRANTY_DURATION_DAYS_MAP[warrantyDuration] ?? undefined,
      } : {}),

      u_warranty_end_date:    isElectronics ? warrantyEndDate : undefined,
      u_intended_claim_type:  JSON.stringify(claimTypes),
      u_notification_rules:   JSON.stringify(notificationPrefs),
    };

    // Strip undefined / null / empty-string fields before sending
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== null && v !== undefined && v !== '')
    );

    try {
      const result = await addReceiptWithImage(cleanPayload, files?.[0]);
      if (result.success) {
        console.log('Saved:', result.sysId);
        onClose();
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>

        <div className="form-header">
          <h2>Upload Receipt</h2>
          <button className="close-button" type="button" onClick={onClose}>×</button>
        </div>

        <div className="form-body">

          {/* ── SECTION 1: Receipt Image ── */}
          <div className="form-section">
            <h3 className="section-title">Receipt Image</h3>
            <div
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Receipt preview" className="upload-preview" />
              ) : (
                <>
                  <div className="upload-icon">↑</div>
                  <p className="upload-text">Attach receipt image</p>
                  <p className="upload-subtext">JPG, PNG, HEIC only — max 20MB</p>
                </>
              )}
              {files.length > 0 && <p className="upload-filename">📎 {files[0].name}</p>}
              <input
                id="file-input"
                type="file"
                accept=".png,.jpg,.jpeg,.heic"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            {errors.files && <p className="field-error">{errors.files}</p>}
            {files.length > 0 && (
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={photoConfirmed}
                  onChange={e => setPhotoConfirmed(e.target.checked)}
                />
                Text is clear and readable in the photo.
              </label>
            )}
            {errors.photoConfirmed && <p className="field-error">{errors.photoConfirmed}</p>}
          </div>

          {/* ── SECTION 2: Transaction Details ── */}
          <div className="form-section">
            <h3 className="section-title">Transaction Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Store / Merchant Name *</label>
                <select className="form-input" value={store} onChange={e => setStore(e.target.value)}>
                  <option value="">Select Store</option>
                  {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.store && <p className="field-error">{errors.store}</p>}
              </div>
              {store === 'Other' && (
                <div className="form-group">
                  <label>Specify Store *</label>
                  <input type="text" className="form-input" placeholder="Enter store name"
                    value={otherStore} onChange={e => setOtherStore(e.target.value)} />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Purchase Date *</label>
                <input type="date" className="form-input"
                  max={new Date().toISOString().split('T')[0]}
                  value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} />
                {errors.purchaseDate && <p className="field-error">{errors.purchaseDate}</p>}
              </div>
              <div className="form-group">
                <label>Receipt / Invoice Number</label>
                <input type="text" className="form-input" placeholder="Alphanumeric"
                  value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Total Amount *</label>
                <input type="number" className="form-input" placeholder="0.00" min="0" step="0.01"
                  value={amount} onChange={e => setAmount(e.target.value)} />
                {errors.amount && <p className="field-error">{errors.amount}</p>}
              </div>
              <div className="form-group">
                <label>Currency *</label>
                <select className="form-input" value={currency} onChange={e => setCurrency(e.target.value)}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── SECTION 3: Purchase Purpose ── */}
          <div className="form-section">
            <h3 className="section-title">Purchase Purpose</h3>

            <div className="form-group">
              <label>Receipt Category *</label>
              <div className="radio-group">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="radio-label">
                    <input type="radio" name="category" value={cat}
                      checked={category === cat}
                      onChange={() => setCategory(cat)} />
                    {cat}
                  </label>
                ))}
              </div>
              {errors.category && <p className="field-error">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label>Intended Claim Type * (select all that apply)</label>
              <div className="checkbox-group">
                {CLAIM_TYPES.map(type => (
                  <label key={type} className="checkbox-label">
                    <input type="checkbox"
                      checked={claimTypes.includes(type)}
                      onChange={() => toggleClaimType(type)} />
                    {type}
                  </label>
                ))}
              </div>
              {errors.claimTypes && <p className="field-error">{errors.claimTypes}</p>}
            </div>
          </div>

          {/* ── SECTION 4: Warranty Details (conditional) ── */}
          {isElectronics && (
            <div className="form-section">
              <h3 className="section-title">Warranty Details</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Product Name / Model *</label>
                  <input type="text" className="form-input" placeholder="e.g. Samsung Galaxy S25 Ultra"
                    value={productName} onChange={e => setProductName(e.target.value)} />
                  {errors.productName && <p className="field-error">{errors.productName}</p>}
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <select className="form-input" value={brand} onChange={e => setBrand(e.target.value)}>
                    <option value="">Select Brand</option>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {brand === 'Other' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Specify Brand</label>
                    <input type="text" className="form-input" placeholder="Enter brand name"
                      value={otherBrand} onChange={e => setOtherBrand(e.target.value)} />
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Serial Number</label>
                  <input type="text" className="form-input" placeholder="Case-sensitive"
                    value={serialNumber} onChange={e => setSerialNumber(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Warranty Provided By *</label>
                <div className="radio-group">
                  {['Store Warranty Only', 'Manufacturer Warranty Only', 'Both Store + Manufacturer'].map(opt => (
                    <label key={opt} className="radio-label">
                      <input type="radio" name="warrantyProvider" value={opt}
                        checked={warrantyProvider === opt}
                        onChange={() => setWarrantyProvider(opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.warrantyProvider && <p className="field-error">{errors.warrantyProvider}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Warranty Duration *</label>
                  <select className="form-input" value={warrantyDuration}
                    onChange={e => setWarrantyDuration(e.target.value)}>
                    <option value="">Select Duration</option>
                    {WARRANTY_DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.warrantyDuration && <p className="field-error">{errors.warrantyDuration}</p>}
                </div>

                {warrantyDuration === 'Custom' && (
                  <div className="form-group">
                    <label>Custom Duration</label>
                    <div className="input-row">
                      <input type="number" className="form-input" placeholder="1-3650" min="1" max="3650"
                        value={customDurationValue} onChange={e => setCustomDurationValue(e.target.value)} />
                      <select className="form-input" value={customDurationUnit}
                        onChange={e => setCustomDurationUnit(e.target.value)}>
                        <option value="Days">Days</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Warranty End Date (Manual Override)</label>
                  <input type="date" className="form-input"
                    min={purchaseDate}
                    value={warrantyEndDate} onChange={e => setWarrantyEndDate(e.target.value)} />
                  {errors.warrantyEndDate && <p className="field-error">{errors.warrantyEndDate}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── SECTION 5: Notification Preferences ── */}
          <div className="form-section">
            <div className="form-group">
              <label>Notification Preferences</label>
              <div className="checkbox-group">
                {NOTIFICATION_PREFS.map(pref => (
                  <label key={pref} className="checkbox-label">
                    <input type="checkbox"
                      checked={notificationPrefs.includes(pref)}
                      onChange={() => toggleNotifPref(pref)} />
                    {pref}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadPopUp;