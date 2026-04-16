import React from 'react';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import { WarrantyTable } from '../../components/listComponents/WarrantyTable';
import mockWarranties from './mockWarranties.json'; 
import './WarrantyPage.css';

function WarrantyPage({ activePage, onNavigate }) {
    return (
      <div className="warranty-wrapper">
        <TopBar />
        <div className="warranty-body">
          <NavigationBar activePage={activePage} onNavigate={onNavigate} />
          <div className="warranty-main">
            <WarrantyTable data={mockWarranties} />
          </div>
        </div>
      </div>
    )
  }
  export default WarrantyPage;