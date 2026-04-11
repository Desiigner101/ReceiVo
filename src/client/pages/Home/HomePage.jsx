import React, { useState } from 'react';
import './HomePage.css';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import Button from '../../components/globalComponents/Button';
import KPI from '../../components/displayComponents/KPI';
import UploadPopup from '../../components/uploadComponents/UploadPopup';
import { ReceiptsTable } from '../../components/listComponents/ReceiptsTable';
import mockReceipts from '../Vault/mockReceipts.json';

const HomePage = () => {
  const [activePage, setActivePage] = useState('Home');
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="homepage-wrapper">
      <TopBar />
      <div className="homepage-body">
        <NavigationBar activePage={activePage} onNavigate={setActivePage} />
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
              onClickCapture={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowUpload(true);
              }}
            >
              + Upload Receipt
            </button>
          </div>

          <div className="homepage-kpis">
            <KPI title="Total Receipts" value={24} subtitle="↑ 4 this week" type="default" />
            <KPI title="Active Warranties" value={8} subtitle="All valid" type="warning" />
            <KPI title="Expiring Soon" value={2} subtitle="Within 30 days" type="danger" />
          </div>

          <div className="homepage-receipts">
            <div className="receipts-header">
              <h2 className="receipts-title">Recent Receipts</h2>
              <a className="receipts-viewall" href="#">View All →</a>
            </div>
            <ReceiptsTable data={mockReceipts} />
          </div>

        </div>
      </div>

      {showUpload && (
          <UploadPopUp onClose={() => setShowUpload(false)} />
        )}

    </div>
  );
};

export default HomePage;