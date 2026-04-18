import React, { useState } from 'react';
import TopBar from '../../components/globalComponents/TopBar';
import NavigationBar from '../../components/globalComponents/NavigationBar';
import { WarrantyTable } from '../../components/listComponents/WarrantyTable';
import WarrantyDetails from '../../components/displayComponents/WarrantyDetails';
import mockWarranties from './mockWarranties.json';
import './WarrantyPage.css';

function WarrantyPage({ activePage, onNavigate }) {
    const [selectedWarranty, setSelectedWarranty] = useState(null);

    return (
        <div className="warranty-wrapper">
            <TopBar />
            <div className="warranty-body">
                <NavigationBar activePage={activePage} onNavigate={onNavigate} />
                <div className="warranty-main">
                    {selectedWarranty ? (
                        <WarrantyDetails
                            warranty={selectedWarranty}
                            onBack={() => setSelectedWarranty(null)}
                        />
                    ) : (
                        <WarrantyTable
                            data={mockWarranties}
                            onView={(warranty) => setSelectedWarranty(warranty)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default WarrantyPage;