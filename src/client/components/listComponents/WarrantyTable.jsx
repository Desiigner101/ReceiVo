import React, { useState } from 'react'
import './WarrantyTable.css'
import './colors.css'

export const WarrantyTable = ({ data, onView }) => {
    const [warranties, setWarranties] = useState(data || [])

    const activeCount = warranties.filter(w => w.status === 'Active').length
    const expiringCount = warranties.filter(w => w.status === 'Expiring').length
    const expiredCount = warranties.filter(w => w.status === 'Expired').length

    const toggleAlert = (id) => {
        setWarranties(warranties.map(w =>
            w.id === id ? { ...w, alertEnabled: !w.alertEnabled } : w
        ))
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this warranty?')) {
            setWarranties(warranties.filter(w => w.id !== id))
        }
    }

    const getDaysLeftClass = (status) => {
        if (status === 'Active') return 'days-left-active'
        if (status === 'Expiring') return 'days-left-expiring'
        return 'days-left-expired'
    }

    const getStatusClass = (status) => {
        if (status === 'Active') return 'status-active'
        if (status === 'Expiring') return 'status-expiring'
        return 'status-expired'
    }

    return (
        <div className="warranty-table-wrapper">
            <div className="warranty-top">
                <div>
                    <h1 className="warranty-title">Warranty Vault</h1>
                    <p className="warranty-subtitle">{warranties.length} active warranties</p>
                </div>
                <div className="warranty-badges">
                    <span className="badge badge-active">Active {activeCount}</span>
                    <span className="badge badge-expiring">Expiring {expiringCount}</span>
                    <span className="badge badge-expired">Expired {expiredCount}</span>
                </div>
            </div>

            <div className="warranty-table-container">
                <table className="warranty-table">
                    <thead>
                        <tr>
                            <th>ITEM NAME</th>
                            <th>LINKED RECEIPT</th>
                            <th>EXPIRY DATE</th>
                            <th>DAYS LEFT</th>
                            <th>ALERT</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warranties.map((warranty) => (
                            <tr key={warranty.id}>
                                <td className="warranty-item-name">{warranty.itemName}</td>
                                <td className="warranty-linked-receipt">#{warranty.linkedReceipt}</td>
                                <td className="warranty-expiry-date">{warranty.expiryDate}</td>
                                <td>
                                    <span className={getDaysLeftClass(warranty.status)}>
                                        {warranty.status === 'Expired' ? 'Expired' : warranty.daysLeft}
                                    </span>
                                </td>
                                <td>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={warranty.alertEnabled}
                                            onChange={() => toggleAlert(warranty.id)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </td>
                                <td>
                                    <span className={`status-pill ${getStatusClass(warranty.status)}`}>
                                        {warranty.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="warranty-action-buttons">
                                        <button 
                                            className="warranty-btn-action"
                                            onClick={() => onView && onView(warranty)}
                                        >👁</button>
                                        <button className="warranty-btn-action">✎</button>
                                        <button
                                            className="warranty-btn-action warranty-btn-delete"
                                            onClick={() => handleDelete(warranty.id)}
                                        >🗑</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}