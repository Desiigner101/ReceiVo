import React, { useState } from 'react';
import './HomePage.css';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import Button from '../../components/globalComponents/Button';
import KPI from '../../components/displayComponents/KPI';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import UploadPopUp_back from '../../components/uploadComponents/UploadPopUp_back';
const HomePage = ({ activePage, onNavigate, receipts, onAddReceipt }) => {
  const [showUpload, setShowUpload] = useState(false);

  const totalReceipts = receipts.length;
  const activeWarranties = receipts.filter(r => r.warranty === 'Active').length;
  const expiringSoon = receipts.filter(r => r.warranty === 'Expiring').length;
  const allValid = expiringSoon === 0 && receipts.filter(r => r.warranty === 'Expired').length === 0;

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
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })}
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
              value={totalReceipts}
              subtitle={`▲ ${totalReceipts} total`}
              type="default"
            />
            <KPI
              title="Active Warranties"
              value={activeWarranties}
              subtitle={allValid ? 'All valid' : `${activeWarranties} active`}
              type="warning"
            />
            <KPI
              title="Expiring Soon"
              value={expiringSoon}
              subtitle={expiringSoon === 0 ? 'None expiring' : 'Within 30 days'}
              type="danger"
            />
          </div>

          <div className="homepage-receipts">
            <div className="receipts-header">
              <h2 className="receipts-title">Recent Receipts</h2>
              <a className="receipts-viewall" href="#">View All →</a>
            </div>
            <ReceiptsTable data={receipts} itemLimit={5} />
          </div>

        </div>
      </div>

      {showUpload && (
        <UploadPopUp_back onClose={() => setShowUpload(false)} />      )}

    </div>
  );
};

export default HomePage;