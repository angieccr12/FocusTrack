import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import Statistics from '../Statistics/Statistics';
import AddDevice from '../AddDevice/AddDevice';
import './Dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddActivityRecord from "../NewActivityRecord/NewActivityRecord";

const Dashboard = () => {
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedView, setSelectedView] = useState('app-time');
  const [devices, setDevices] = useState([]);
  const [activityRecords, setActivityRecords] = useState([]);
  const navigate = useNavigate();

  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/devices', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDevices(response.data);
    } catch (error) {
      console.log('Error fetching devices:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      setActivityRecords(null);
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/report/${selectedView}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setActivityRecords(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [selectedView]);

  const handleAddDevice = async (device) => {
    try {
      const token = localStorage.getItem('token');

      const newDevice = {
        deviceName: device.name,
        deviceType: device.type
      };

      const response = await axios.post('http://localhost:3000/api/devices', newDevice, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Device added successfully');
      setDevices(prev => [...prev, response.data]);
      await fetchDevices();
      setShowAddDeviceForm(false);

    } catch (error) {
      console.log(error);
      toast.error('Error adding device: ' + error.message);
    }
  };

  const handleSaveRecord = async (recordData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/activity', recordData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Record added successfully');
      setShowActivityForm(false);
      await fetchStatistics();
    } catch (error) {
      console.log(error);
      toast.error('Error adding record: ' + error.message);
    }
  };

  const handleLogout = () => {
    toast.success('Session ended successfully');
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
              <button className='logout-button' onClick={handleLogout}>Log Out</button>
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

      <Statistics selectedView={selectedView} recordData={activityRecords} />

      <AddDevice
        isVisible={showAddDeviceForm}
        onClose={() => setShowAddDeviceForm(false)}
        onAddDevice={handleAddDevice}
      />

      <AddActivityRecord
        isVisible={showActivityForm}
        onClose={() => setShowActivityForm(false)}
        onSaveRecord={handleSaveRecord}
        devices={devices}
      />

      {/*devices.length > 0 && (
        <div className="devices-list">
          <h3>Connected Devices</h3>
          <div className="devices-grid">
            {devices.map((device) => (
              <div key={device.deviceId} className="device-card">
                <span className="device-name">{device.deviceName}</span>
                <span className="device-type">{device.deviceType}</span>
              </div>
            ))}
          </div>
        </div>
      )*/}
    </div>
  );
};

export default Dashboard;
