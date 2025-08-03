import React, { useState } from 'react';
import './AddDevice.css';

const AddDevice = ({ isVisible, onClose, onAddDevice }) => {
  const [device, setDevice] = useState({ name: '', type: '' });

  const handleSave = () => {
    if (device.name && device.type) {
      onAddDevice(device);
      setDevice({ name: '', type: '' });
      onClose();
    }
  };

  const handleCancel = () => {
    setDevice({ name: '', type: '' });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="add-device-overlay">
      <div className="add-device-form">
        <h2>Add Device</h2>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Device Name"
            value={device.name}
            onChange={(e) => setDevice({ ...device, name: e.target.value })}
            className="device-input"
          />
        </div>

        <div className="form-group">
          <select
            value={device.type}
            onChange={(e) => setDevice({ ...device, type: e.target.value })}
            className="device-select"
          >
            <option value="">Select type</option>
            <option value="pc">PC</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-actions">
          <button onClick={handleCancel} className="btn btn-cancel">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="btn btn-save"
            disabled={!device.name || !device.type}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;