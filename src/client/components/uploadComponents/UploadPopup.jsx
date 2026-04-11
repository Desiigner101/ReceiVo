import React, { useState } from 'react';
import './UploadPopup.css';

const UploadPopUp = ({ onClose }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>

        <div className="form-header">
          <h2>Upload Receipt</h2>
          <button className="close-button" type="button" onClick={onClose}>×</button>
        </div>

        {/* File Upload Area */}
        <div className="form-body">
          <div
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <div className="upload-icon">↑</div>
            <p className="upload-text">Attach receipt image</p>
            <p className="upload-subtext">PNG, JPG or HEIC — max 10MB</p>
            {fileName && <p className="upload-filename">📎 {fileName}</p>}
            <input
              id="file-input"
              type="file"
              accept=".png,.jpg,.jpeg,.heic"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {/* Form Fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Store Name</label>
              <select className="form-input">
                <option value="">Select Store</option>
                <option value="mercury">Mercury Drug</option>
                <option value="southstar">Southstar Drug</option>
                <option value="watsons">Watsons</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total Amount</label>
              <input type="number" className="form-input" placeholder="1,200.00" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specific Store</label>
              <input type="text" className="form-input" placeholder="Enter Store" />
            </div>
            <div className="form-group">
              <label>Purchase Date</label>
              <input type="date" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select className="form-input">
                <option value="">Select Category</option>
                <option value="meds">Meds</option>
                <option value="device">Device</option>
              </select>
            </div>
            <div className="form-group"></div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="button" className="submit-button">Submit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UploadPopUp;