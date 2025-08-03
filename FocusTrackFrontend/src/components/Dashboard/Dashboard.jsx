import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import Statistics from '../Statistics/Statistics';
import AddDevice from '../AddDevice/AddDevice';
import NewActivityRecord from '../NewActivityRecord/NewActivityRecord';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedView, setSelectedView] = useState('app-time');
  const [devices, setDevices] = useState([]);
  const [activityRecords, setActivityRecords] = useState([]);
  const navigate = useNavigate();

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, { ...newDevice, id: Date.now() }]);
  };

  const handleSaveRecord = (recordData) => {
    setActivityRecords([...activityRecords, { ...recordData, id: Date.now() }]);
  };

  const handleLogout = () => {
    alert('Session closed successfully');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">FocusTrack</h1>
        <div className="profile-container">
          <UserCircle
            className="dashboard-icon clickable"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div className="profile-menu">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="dashboard-actions">
        <div className="dashboard-buttons">
          <button onClick={() => setShowAddDeviceForm(true)} className="btn btn-primary">
            Add Device
          </button>
          <button onClick={() => setShowActivityForm(true)} className="btn btn-success">
            Add Record
          </button>
        </div>

        <div className="view-selector">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="view-select styled-select"
          >
            <option value="app-time">App/Time</option>
            <option value="device-time">Device/Time</option>
            <option value="device-app">Device/App</option>
          </select>
        </div>
      </div>

      <Statistics selectedView={selectedView} />

      <AddDevice
        isVisible={showAddDeviceForm}
        onClose={() => setShowAddDeviceForm(false)}
        onAddDevice={handleAddDevice}
      />

      <NewActivityRecord
        isVisible={showActivityForm}
        onClose={() => setShowActivityForm(false)}
        onSaveRecord={handleSaveRecord}
        devices={devices}
      />

      {devices.length > 0 && (
        <div className="devices-list">
          <h3>Connected Devices</h3>
          <div className="devices-grid">
            {devices.map((device) => (
              <div key={device.id} className="device-card">
                <span className="device-name">{device.name}</span>
                <span className="device-type">{device.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activityRecords.length > 0 && (
        <div className="records-list">
          <h3>Recent Activity Records</h3>
          <div className="records-grid">
            {activityRecords.slice(-5).map((record) => (
              <div key={record.id} className="record-card">
                <div className="record-header">
                  <span className="record-app">{record.application}</span>
                  <span className="record-duration">{record.duration}</span>
                </div>
                <div className="record-details">
                  <span className="record-device">{record.device}</span>
                  <span className="record-date">{record.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
