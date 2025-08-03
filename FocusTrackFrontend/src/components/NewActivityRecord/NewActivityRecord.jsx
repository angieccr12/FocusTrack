import React, { useState } from 'react';
import './NewActivityRecord.css';

const NewActivityRecord = ({ isVisible, onClose, onSaveRecord, devices = [] }) => {
  const [customApp, setCustomApp] = useState(false);
  const [formData, setFormData] = useState({
    device: '',
    application: '',
    customApplication: '',
    date: new Date().toISOString().split('T')[0],
    startHour: '1',
    startMinute: '00',
    startAmPm: 'AM',
    endHour: '2',
    endMinute: '00',
    endAmPm: 'AM'
  });

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [...Array(60)].map((_, i) => String(i).padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  const existingApps = [
    'Instagram',
    'YouTube', 
    'Spotify',
    'Chrome',
    'VSCode',
    'WhatsApp',
    'Discord',
    'Netflix',
    'TikTok'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.device) {
      alert('Please select a device');
      return;
    }
    
    if (!customApp && !formData.application) {
      alert('Please select an application');
      return;
    }
    
    if (customApp && !formData.customApplication.trim()) {
      alert('Please enter the application name');
      return;
    }

    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    // Convert times to minutes for comparison
    const startTime = convertToMinutes(formData.startHour, formData.startMinute, formData.startAmPm);
    const endTime = convertToMinutes(formData.endHour, formData.endMinute, formData.endAmPm);

    if (endTime <= startTime) {
      alert('End time must be after start time');
      return;
    }

    const recordData = {
      ...formData,
      application: customApp ? formData.customApplication : formData.application,
      duration: calculateDuration(startTime, endTime),
      id: Date.now()
    };

    onSaveRecord(recordData);
    handleReset();
    onClose();
  };

  const convertToMinutes = (hour, minute, ampm) => {
    let h = parseInt(hour);
    if (ampm === 'AM' && h === 12) h = 0;
    if (ampm === 'PM' && h !== 12) h += 12;
    return h * 60 + parseInt(minute);
  };

  const calculateDuration = (startMinutes, endMinutes) => {
    const totalMinutes = endMinutes - startMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleReset = () => {
    setFormData({
      device: '',
      application: '',
      customApplication: '',
      date: new Date().toISOString().split('T')[0],
      startHour: '1',
      startMinute: '00',
      startAmPm: 'AM',
      endHour: '2',
      endMinute: '00',
      endAmPm: 'AM'
    });
    setCustomApp(false);
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="activity-overlay">
      <div className="activity-container">
        <div className="activity-header">
          <h2 className="activity-title">New Activity Record</h2>
          <button 
            className="activity-close-btn"
            onClick={handleCancel}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="activity-card">
          <form className="activity-form" onSubmit={handleSubmit}>
            {/* Device Selection */}
            <div className="form-group">
              <label className="activity-label">Device</label>
              <select 
                className="activity-input full"
                value={formData.device}
                onChange={(e) => handleInputChange('device', e.target.value)}
              >
                <option value="">Select a device</option>
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <option key={device.id} value={device.name}>
                      {device.name} ({device.type})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop">Desktop</option>
                  </>
                )}
              </select>
            </div>

            {/* Application Selection */}
            <div className="form-group">
              <label className="activity-label">Application</label>
              {!customApp ? (
                <select 
                  className="activity-input full"
                  value={formData.application}
                  onChange={(e) => handleInputChange('application', e.target.value)}
                >
                  <option value="">Select an existing app</option>
                  {existingApps.map((app) => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  className="activity-input full" 
                  placeholder="Enter new application name"
                  value={formData.customApplication}
                  onChange={(e) => handleInputChange('customApplication', e.target.value)}
                />
              )}

              <button
                type="button"
                className="activity-toggle-button"
                onClick={() => setCustomApp(!customApp)}
              >
                {customApp ? 'Select from list' : 'Add new app'}
              </button>
            </div>

            {/* Date Selection */}
            <div className="form-group">
              <label className="activity-label">Date</label>
              <input
                type="date"
                className="activity-input full"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>

            {/* Start Time */}
            <div className="form-group">
              <label className="activity-label">Start Time</label>
              <div className="activity-time-row">
                <select 
                  className="activity-input time-select"
                  value={formData.startHour}
                  onChange={(e) => handleInputChange('startHour', e.target.value)}
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className="time-separator">:</span>
                <select 
                  className="activity-input time-select"
                  value={formData.startMinute}
                  onChange={(e) => handleInputChange('startMinute', e.target.value)}
                >
                  {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select 
                  className="activity-input time-select"
                  value={formData.startAmPm}
                  onChange={(e) => handleInputChange('startAmPm', e.target.value)}
                >
                  {ampm.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div className="form-group">
              <label className="activity-label">End Time</label>
              <div className="activity-time-row">
                <select 
                  className="activity-input time-select"
                  value={formData.endHour}
                  onChange={(e) => handleInputChange('endHour', e.target.value)}
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className="time-separator">:</span>
                <select 
                  className="activity-input time-select"
                  value={formData.endMinute}
                  onChange={(e) => handleInputChange('endMinute', e.target.value)}
                >
                  {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <select 
                  className="activity-input time-select"
                  value={formData.endAmPm}
                  onChange={(e) => handleInputChange('endAmPm', e.target.value)}
                >
                  {ampm.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-save"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewActivityRecord;