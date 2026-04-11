import React from 'react';
import './KPI.css';

const KPI = ({ title, value, subtitle, type }) => {
  return (
    <div className={`kpi-card kpi-${type}`}>
      <div className="kpi-header">
        <p className="kpi-title">{title}</p>
        <span className={`kpi-dot dot-${type}`}></span>
      </div>
      <h2 className={`kpi-value value-${type}`}>{value}</h2>
      <p className={`kpi-subtitle subtitle-${type}`}>{subtitle}</p>
    </div>
  );
};

export default KPI;