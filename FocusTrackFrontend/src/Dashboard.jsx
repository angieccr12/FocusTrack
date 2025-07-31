import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { UserCircle } from 'lucide-react';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [device, setDevice] = useState({ name: '', type: '' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedView, setSelectedView] = useState('app-time');

  const handleAddDevice = () => {
    console.log('New Device:', device);
    setDevice({ name: '', type: '' });
    setShowForm(false);
  };

  const handleLogout = () => {
    alert('Session closed successfully');
    // Lógica para cerrar sesión, redireccionar o limpiar tokens
  };

  // Colores usando la paleta CSS
  const colors = ['#213448', '#547792', '#94B4C1', '#a87f57', '#4A4947', '#e2e2e2'];

  // Datos para App/Time
  const appTimeData = {
    daily: {
      labels: ['Instagram', 'YouTube', 'Chrome', 'VSCode'],
      datasets: [{
        data: [3, 2, 1.5, 2.5],
        backgroundColor: colors.slice(0, 4),
        borderWidth: 1,
      }],
    },
    weekly: {
      labels: ['Instagram', 'YouTube', 'Chrome', 'VSCode'],
      datasets: [{
        data: [21, 14, 10.5, 17.5],
        backgroundColor: colors.slice(0, 4),
        borderWidth: 1,
      }],
    },
    barDaily: {
      labels: ['Instagram', 'YouTube', 'Chrome', 'VSCode'],
      datasets: [{
        label: 'Hours Used (Daily)',
        data: [3, 2, 1.5, 2.5],
        backgroundColor: colors.slice(0, 4),
        borderWidth: 1,
      }],
    },
    barWeekly: {
      labels: ['Instagram', 'YouTube', 'Chrome', 'VSCode'],
      datasets: [{
        label: 'Hours Used (Weekly)',
        data: [21, 14, 10.5, 17.5],
        backgroundColor: colors.slice(0, 4),
        borderWidth: 1,
      }],
    }
  };

  // Datos para Device/Time
  const deviceTimeData = {
    daily: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [{
        data: [6, 3, 1],
        backgroundColor: colors.slice(0, 3),
        borderWidth: 1,
      }],
    },
    weekly: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [{
        data: [42, 21, 7],
        backgroundColor: colors.slice(0, 3),
        borderWidth: 1,
      }],
    },
    barDaily: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [{
        label: 'Hours Used (Daily)',
        data: [6, 3, 1],
        backgroundColor: colors.slice(0, 3),
        borderWidth: 1,
      }],
    },
    barWeekly: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [{
        label: 'Hours Used (Weekly)',
        data: [42, 21, 7],
        backgroundColor: colors.slice(0, 3),
        borderWidth: 1,
      }],
    }
  };

  // Datos para Device/App (Gráficos de barras apiladas)
  const deviceAppData = {
    daily: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [
        {
          label: 'VSCode',
          data: [2.5, 0, 0],
          backgroundColor: colors[0],
        },
        {
          label: 'Chrome',
          data: [1.5, 0.5, 0.3],
          backgroundColor: colors[1],
        },
        {
          label: 'Instagram',
          data: [0, 2, 0.2],
          backgroundColor: colors[2],
        },
        {
          label: 'YouTube',
          data: [0.5, 1.5, 0.5],
          backgroundColor: colors[3],
        }
      ],
    },
    weekly: {
      labels: ['PC', 'Mobile', 'Tablet'],
      datasets: [
        {
          label: 'VSCode',
          data: [17.5, 0, 0],
          backgroundColor: colors[0],
        },
        {
          label: 'Chrome',
          data: [10.5, 3.5, 2.1],
          backgroundColor: colors[1],
        },
        {
          label: 'Instagram',
          data: [0, 14, 1.4],
          backgroundColor: colors[2],
        },
        {
          label: 'YouTube',
          data: [3.5, 10.5, 3.5],
          backgroundColor: colors[3],
        }
      ],
    }
  };

  const getCurrentData = () => {
    switch (selectedView) {
      case 'app-time':
        return appTimeData;
      case 'device-time':
        return deviceTimeData;
      case 'device-app':
        return deviceAppData;
      default:
        return appTimeData;
    }
  };

  const getViewTitle = () => {
    switch (selectedView) {
      case 'app-time':
        return 'App Usage Time';
      case 'device-time':
        return 'Device Usage Time';
      case 'device-app':
        return 'App Usage by Device';
      default:
        return 'App Usage Time';
    }
  };

  const currentData = getCurrentData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };

  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
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



      {/* Botones */}
      <div className="dashboard-buttons">
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Add device
        </button>
        <button className="btn btn-success">Add record</button>
      </div>
      {/* Selector de Vista */}
      <div className="view-selector">
        <select
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
          className="view-select"
        >
          <option value="app-time">App/Time</option>
          <option value="device-time">Device/Time</option>
          <option value="device-app">Device/App</option>
        </select>
      </div>
      {/* Formulario */}
      {showForm && (
        <div className="form-card">
          <h2>Add device</h2>
          <input
            type="text"
            placeholder="Device Name"
            value={device.name}
            onChange={(e) => setDevice({ ...device, name: e.target.value })}
          />

          <select
            value={device.type}
            onChange={(e) => setDevice({ ...device, type: e.target.value })}
          >
            <option value="">Select type</option>
            <option value="pc">PC</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
            <option value="other">Other</option>
          </select>

          <button onClick={handleAddDevice} className="btn btn-save">
            Save
          </button>
        </div>
      )}

      {/* Título de la vista actual */}
      <h2 className="view-title">{getViewTitle()}</h2>

      {/* Gráficas - Condicional según la vista */}
      {selectedView === 'device-app' ? (
        // Para Device/App: Solo gráficos de barras apiladas
        <div className="charts-section">
          <div className="charts-container">
            <div className="chart-card">
              <h3>Daily Usage by Device</h3>
              <div className="chart-wrapper">
                <Bar data={currentData.daily} options={stackedBarOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Weekly Usage by Device</h3>
              <div className="chart-wrapper">
                <Bar data={currentData.weekly} options={stackedBarOptions} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Para App/Time y Device/Time: Pie charts + gráficos de barras
        <>
          {/* Gráficas Pie Charts */}
          <div className="charts-section">
            <div className="charts-container">
              <div className="chart-card">
                <h3>Daily</h3>
                <div className="chart-wrapper">
                  <Doughnut data={currentData.daily} options={chartOptions} />
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly</h3>
                <div className="chart-wrapper">
                  <Doughnut data={currentData.weekly} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Gráficas de Barras */}
          <div className="charts-section">
            <div className="charts-container">
              <div className="chart-card">
                <h3>Daily Hours</h3>
                <div className="chart-wrapper">
                  <Bar data={currentData.barDaily} options={barOptions} />
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly Hours</h3>
                <div className="chart-wrapper">
                  <Bar data={currentData.barWeekly} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;