import React, { useState, useEffect } from 'react';
import './HomePage.css';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import KPI from '../../components/displayComponents/KPI';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import ReceiptDetails from '../../components/displayComponents/ReceiptDetails';
import UploadPopUp_back from '../../components/uploadComponents/UploadPopUp_back';

const KPI_STORAGE_KEY = 'receipts_kpi_snapshot';

export default function HomePage({ activePage, onNavigate, receipts, onAddReceipt, onDelete }) {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const totalReceipts = receipts.length;
  const activeWarranties = receipts.filter(r => (r.u_warranty || r.warranty) === 'Active').length;
  const expiringSoon = receipts.filter(r => (r.u_warranty || r.warranty) === 'Expiring Soon').length;
  const expired = receipts.filter(r => (r.u_warranty || r.warranty) === 'Expired').length;
  const allValid = expiringSoon === 0 && expired === 0;

  useEffect(() => {
    try {
      const snapshot = {
        totalReceipts,
        activeWarranties,
        expiringSoon,
        expired,
        allValid,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(KPI_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (err) {
      console.error('Failed to persist KPIs:', err);
    }
  }, [totalReceipts, activeWarranties, expiringSoon, expired, allValid]);

  const kpis = { totalReceipts, activeWarranties, expiringSoon, expired, allValid };

  if (selectedReceipt) {
    return (
      <div className="homepage-wrapper">
        <TopBar />
        <div className="homepage-body">
          <NavigationBar activePage={activePage} onNavigate={onNavigate} />
          <div className="homepage-main">
            <ReceiptDetails
              receipt={selectedReceipt}
              onBack={() => setSelectedReceipt(null)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-wrapper">
      <TopBar />
      <div className="homepage-body">
        <NavigationBar activePage={activePage} onNavigate={onNavigate} />
        <div className="homepage-main">

          <div className="homepage-header">
            <div>
              <h1 className="homepage-title">Dashboard</h1>
              <p className="homepage-date">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'
                })}
              </p>
            </div>
            <button
              type="button"
              className="upload-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowUpload(true);
              }}
            >
              + Upload Receipt
            </button>
          </div>

          <div className="homepage-kpis">
            <KPI
              title="Total Receipts"
              value={kpis.totalReceipts}
              subtitle={`▲ ${kpis.totalReceipts} total`}
              type="default"
            />
            <KPI
              title="Active Warranties"
              value={kpis.activeWarranties}
              subtitle={
                kpis.allValid
                  ? 'All valid'
                  : `${kpis.expired} expired, ${kpis.expiringSoon} expiring`
              }
              type="warning"
            />
           <KPI
            title="Expiring Soon"
            value={kpis.expiringSoon}
            subtitle={`▲ ${kpis.expiringSoon} expiring`}
            type="danger"
          />
          </div>
          <div className="homepage-receipts">
            <div className="receipts-header">
              <h2 className="receipts-title">Recent Receipts</h2>
              <span
                className="receipts-viewall"
                onClick={() => onNavigate('Vault')}
              >
                View All →
              </span>
            </div>
            <ReceiptsTable
              data={receipts}
              itemLimit={5}
              onView={(receipt) => setSelectedReceipt(receipt)}
              onDelete={onDelete}
            />
          </div>

        </div>
      </div>

      {showUpload && (
        <UploadPopUp_back
          onClose={() => setShowUpload(false)}
          onAddReceipt={onAddReceipt}
        />
      )}
    </div>
  );
}