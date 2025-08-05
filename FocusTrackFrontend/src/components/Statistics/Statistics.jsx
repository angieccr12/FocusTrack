import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import './Statistics.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Statistics = ({ selectedView, recordData }) => {
  const colors = ['#213448', '#547792', '#94B4C1', '#a87f57', '#4A4947', '#e2e2e2'];

  if (!recordData || !recordData.daily || !recordData.weekly) {
    return <p>Loading statistics...</p>;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  const stackedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
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
        return '';
    }
  };

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">{getViewTitle()}</h2>

      {selectedView === 'device-app' ? (
        <div className="charts-section">
          <div className="charts-container">
            <div className="chart-card">
              <h3>Daily Usage by Device</h3>
              <div className="chart-wrapper">
                <Bar data={recordData.daily} options={stackedBarOptions} />
              </div>
            </div>
            <div className="chart-card">
              <h3>Weekly Usage by Device</h3>
              <div className="chart-wrapper">
                <Bar data={recordData.weekly} options={stackedBarOptions} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="charts-section">
            <div className="charts-container">
              <div className="chart-card">
                <h3>Daily</h3>
                <div className="chart-wrapper">
                  <Doughnut data={recordData.daily} options={chartOptions} />
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly</h3>
                <div className="chart-wrapper">
                  <Doughnut data={recordData.weekly} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="charts-section">
            <div className="charts-container">
              <div className="chart-card">
                <h3>Daily Hours</h3>
                <div className="chart-wrapper">
                  <Bar data={recordData.barDaily} options={barOptions} />
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly Hours</h3>
                <div className="chart-wrapper">
                  <Bar data={recordData.barWeekly} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;