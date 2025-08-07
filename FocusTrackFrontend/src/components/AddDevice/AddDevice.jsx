import React, { useState } from 'react';
import './AddDevice.css';

const AddDevice = ({ isVisible, onClose, onAddDevice }) => {
  const [device, setDevice] = useState({ name: '', type: 'select-type' });

  const handleSave = () => {
    // Cambiado: verificar que type no sea 'select-type' en lugar de estar vacío
    if (device.name && device.type && device.type !== 'select-type') {
      onAddDevice(device);
      setDevice({ name: '', type: 'select-type' }); // Reset correcto
      onClose();
    }
  };

  const handleCancel = () => {
    setDevice({ name: '', type: 'select-type' }); // Reset correcto
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
            style={{ color: device.type === 'select-type' ? '#999' : '#000' }} // Asegurar color visible
          >
            <option value="select-type" disabled style={{ color: '#999' }}>
              Select Type
            </option>
            <option value="pc" style={{ color: '#000' }}>PC</option>
            <option value="tablet" style={{ color: '#000' }}>Tablet</option>
            <option value="mobile" style={{ color: '#000' }}>Mobile</option>
            <option value="other" style={{ color: '#000' }}>Other</option>
          </select>
        </div>

        <div className="form-actions">
          <button onClick={handleCancel} className="btn btn-cancel">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="btn btn-save" 
            disabled={!device.name || device.type === 'select-type'}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;