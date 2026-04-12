import React from 'react'
import { WarrantyTable } from '../../components/listComponents/WarrantyTable'
import mockWarranties from './mockWarranties.json'

function WarrantyPage() {
    return (
        <div style={{ margin: 0, textAlign: 'left' }}>
            <WarrantyTable data={mockWarranties} />
        </div>
    )
}

export default WarrantyPage