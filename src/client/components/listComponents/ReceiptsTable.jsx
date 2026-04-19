import React, { useState, useEffect } from 'react';
import './ReceiptsTable.css';
import { deleteReceipt } from '../../api/receiptService';

const STORES = [
  'All Store', 'Mercury Drug', 'Watsons', 'SM Appliance', 'Abenson',
  'Power Mac Center', 'The Medical City', "St. Luke's", 'Generika',
  'Southstar Drug', 'Ace Hardware', 'SM Department Store', 'Robinsons',
  'Shopee', 'Lazada', 'Other'
];

const WARRANTY_STATUSES = ['All', 'Active', 'Expiring Soon', 'Expired', 'None'];

// Safely parse amounts that may arrive as "1,500.00", "₱500", or a plain number
const parseAmount = (raw) => {
  if (raw === null || raw === undefined || raw === '') return 0;
  const cleaned = String(raw).replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

// Normalize for comparison: trim + lowercase
const norm = (s) => String(s || '').trim().toLowerCase();

// Short label shown inside the pill — does NOT affect what is stored or filtered
const getCategoryLabel = (cat) => {
  const map = {
    'electronics / appliance with warranty': 'Device',
    'medicine / pharmacy':                   'Meds',
    'medical service / hospital':            'Medical',
    'general purchase / return':             'General',
    'home / furniture':                      'Home',
    'online order':                          'Online',
  };
  return map[norm(cat)] || cat;
};

// CSS class key derived from the stored value
const getCategoryKey = (cat) => norm(cat).replace(/[^a-z0-9]+/g, '_');

export const ReceiptsTable = ({ data, onView, itemLimit, onDelete }) => {
  const allReceipts = data || [];
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [store, setStore] = useState('All Store');
  const [category, setCategory] = useState('');   // '' = All; holds full stored DB value
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [warrantyStatus, setWarrantyStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Debug: log what categories are actually in the data
  useEffect(() => {
    if (!allReceipts.length) return;
    const unique = [...new Set(allReceipts.map(r => r.u_category || r.category || '(empty)'))];
    console.log('[ReceiptsTable] u_category values in data:', unique);
  }, [allReceipts]);

  // Build category dropdown from actual data — always matches DB values exactly
  const categoryOptions = [
    { label: 'All Category', value: '' },
    ...[...new Set(
      allReceipts.map(r => (r.u_category || r.category || '').trim()).filter(Boolean)
    )].sort().map(v => ({ label: getCategoryLabel(v), value: v }))
  ];

  const getWarrantyStatus = (receipt) => {
    const warrantyEndDate = receipt.u_warranty_end_date || null;
    if (warrantyEndDate) {
      const today = new Date();
      const expiry = new Date(warrantyEndDate);
      const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
      if (daysLeft < 0) return 'Expired';
      if (daysLeft <= 30) return 'Expiring Soon';
      return 'Active';
    }
    const w = (receipt.u_warranty || '').toLowerCase();
    if (w === 'active') return 'Active';
    if (w === 'expired') return 'Expired';
    if (w === 'expiring') return 'Expiring Soon';
    return 'None';
  };

  const filteredReceipts = allReceipts.filter(receipt => {
    const receiptStore    = receipt.u_store || receipt.store || '';
    const receiptCategory = (receipt.u_category || receipt.category || '').trim();
    const receiptDate     = receipt.u_purchase_date || receipt.u_date || receipt.date || '';
    const receiptAmount   = parseAmount(receipt.u_amount ?? receipt.amount);
    const receiptWarranty = getWarrantyStatus(receipt);

    if (store !== 'All Store' && norm(receiptStore) !== norm(store)) return false;
    if (category !== '' && norm(receiptCategory) !== norm(category)) return false;
    if (dateFrom && receiptDate && receiptDate < dateFrom) return false;
    if (dateTo   && receiptDate && receiptDate > dateTo)   return false;
    if (minAmount !== '' && receiptAmount < parseAmount(minAmount)) return false;
    if (maxAmount !== '' && receiptAmount > parseAmount(maxAmount)) return false;
    if (warrantyStatus !== 'All' && receiptWarranty !== warrantyStatus) return false;

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      const amountFormatted = receiptAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 });
      const searchableFields = [
        receipt.u_receipt_number  || receipt.receipt || '',
        receiptStore,
        receiptCategory,
        receiptDate,
        amountFormatted,
        String(receiptAmount),
        receipt.u_purpose         || '',
        receipt.u_brand           || '',
        receipt.u_product_name    || '',
        receipt.u_serial_number   || '',
        receipt.u_invoice_number  || '',
        receipt.u_warranty_duration ? `${receipt.u_warranty_duration} days` : '',
        receipt.u_warranty_end_date || '',
        receiptWarranty,
      ];
      if (!searchableFields.some(f => f.toLowerCase().includes(q))) return false;
    }

    return true;
  });

  const receipts = itemLimit ? filteredReceipts.slice(0, itemLimit) : filteredReceipts;

  const clearFilters = () => {
    setSearchText('');
    setStore('All Store');
    setCategory('');
    setDateFrom('');
    setDateTo('');
    setMinAmount('');
    setMaxAmount('');
    setWarrantyStatus('All');
  };

  const hasActiveFilters =
    searchText.trim() ||
    store !== 'All Store' ||
    category !== '' ||
    dateFrom || dateTo ||
    minAmount !== '' || maxAmount !== '' ||
    warrantyStatus !== 'All';

  const handleDeleteClick = (receipt) => setConfirmDelete(receipt);

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete.sys_id || confirmDelete.id;
    try {
      await deleteReceipt(id);
      if (onDelete) onDelete(id);
      setConfirmDelete(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      {confirmDelete && (
        <div className="delete-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-icon">🗑</div>
            <h3 className="delete-modal-title">Delete Receipt?</h3>
            <p className="delete-modal-message">
              Are you sure you want to delete{' '}
              <strong>{confirmDelete.u_receipt_number || confirmDelete.receipt || 'this receipt'}</strong>?
              {' '}This cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <button className="delete-modal-cancel" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="delete-modal-confirm" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="receipts-table-container">

        {!itemLimit && (
          <div className="search-bar-row">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by receipt no., store, category, amount, product, brand, serial no.…"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              {searchText && (
                <button className="search-clear-btn" onClick={() => setSearchText('')}>✕</button>
              )}
            </div>
          </div>
        )}

        {!itemLimit && (
          <div className="filter-toggle-row">
            <span className="filter-results">
              Showing {receipts.length} of {allReceipts.length} receipts
              {hasActiveFilters && <span className="filter-active-badge">Filtered</span>}
            </span>
            <div className="filter-toggle-actions">
              {hasActiveFilters && (
                <button className="filter-clear-inline-btn" onClick={clearFilters}>✕ Clear all</button>
              )}
              <button
                className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(p => !p)}
              >
                ⚙ {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>
        )}

        {!itemLimit && showFilters && (
          <div className="filter-panel">
            <div className="filter-grid">

              <div className="filter-group">
                <label className="filter-label">Store</label>
                <select className="filter-select" value={store} onChange={e => setStore(e.target.value)}>
                  {STORES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Date From</label>
                <input type="date" className="filter-input" value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)} />
              </div>

              <div className="filter-group">
                <label className="filter-label">Date To</label>
                <input type="date" className="filter-input" value={dateTo}
                  onChange={e => setDateTo(e.target.value)} />
              </div>

              <div className="filter-group">
                <label className="filter-label">Min Amount (₱)</label>
                <input type="number" className="filter-input" placeholder="0"
                  value={minAmount} onChange={e => setMinAmount(e.target.value)} />
              </div>

              <div className="filter-group">
                <label className="filter-label">Max Amount (₱)</label>
                <input type="number" className="filter-input" placeholder="999,999"
                  value={maxAmount} onChange={e => setMaxAmount(e.target.value)} />
              </div>

              <div className="filter-group">
                <label className="filter-label">Warranty Status</label>
                <div className="filter-warranty-pills">
                  {WARRANTY_STATUSES.map(s => (
                    <button
                      key={s}
                      className={`filter-warranty-pill ${warrantyStatus === s ? 'active' : ''}`}
                      onClick={() => setWarrantyStatus(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>
            <div className="filter-actions">
              <button className="filter-clear-btn" onClick={clearFilters}>✕ Clear Filters</button>
            </div>
          </div>
        )}

        <table className="receipts-table">
          <thead className="table-header">
            <tr className="header-row">
              <th className="receipt-header">RECEIPT</th>
              <th className="store-header">STORE</th>
              <th className="category-header">CATEGORY</th>
              <th className="date-header">DATE</th>
              <th className="amount-header">AMOUNT</th>
              <th className="warranty-header">WARRANTY</th>
              <th className="action-header">ACTION</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {receipts.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-empty">
                  {hasActiveFilters ? 'No receipts match your search or filters.' : 'No receipts found.'}
                </td>
              </tr>
            ) : receipts.map((receipt) => {
              const id           = receipt.sys_id || receipt.id;
              const receiptNum   = receipt.u_receipt_number || receipt.receipt || '—';
              const storeName    = receipt.u_store    || receipt.store    || '—';
              const categoryRaw  = receipt.u_category || receipt.category || '—';
              const date         = receipt.u_purchase_date || receipt.u_date || receipt.date || '—';
              const amount       = parseAmount(receipt.u_amount ?? receipt.amount);
              const warrantyEndDate  = receipt.u_warranty_end_date || null;
              const warrantyDuration = receipt.u_warranty_duration || null;
              const ws    = getWarrantyStatus(receipt);
              const wsKey = ws.toLowerCase().replace(/ /g, '_');

              return (
                <tr key={id} className="receipt-row">
                  <td className="receipt-cell">{receiptNum}</td>
                  <td className="store-cell">
                    <div className="store-dot-row">
                      <span className="store-dot" />
                      <span className="store-name">{storeName}</span>
                    </div>
                  </td>
                  <td className="category-cell">
                    {/* Short display label for the pill; full name stored in DB */}
                    <span className={`category-pill cat_${getCategoryKey(categoryRaw)}`}>
                      {getCategoryLabel(categoryRaw)}
                    </span>
                  </td>
                  <td className="date-cell">{date}</td>
                  <td className="amount-cell">
                    ₱{amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="warranty-cell">
                    {ws === 'None' ? (
                      <span className="warranty-pill none">None</span>
                    ) : (
                      <div className="warranty-info">
                        <span className={`warranty-pill ${wsKey}`}>{ws}</span>
                        <div className="warranty-dates">
                          {warrantyDuration && (
                            <span className="warranty-date-value">
                              <span className="warranty-date-label">Duration: </span>
                              {warrantyDuration} days
                            </span>
                          )}
                          {warrantyEndDate && (
                            <span className="warranty-date-value">
                              <span className="warranty-date-label">Exp: </span>
                              {warrantyEndDate}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="action-cell">
                    <div className="action-buttons">
                      <button className="btn btn-view"   onClick={() => onView && onView(receipt)}>👁</button>
                      <button className="btn btn-edit">✎</button>
                      <button className="btn btn-delete" onClick={() => handleDeleteClick(receipt)}>🗑</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};