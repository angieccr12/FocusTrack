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
  // Paleta fija

  const colors = ['#213448', '#547792', '#94B4C1', '#a87f57', '#4A4947', '#e2e2e2'];

  const data = {
    'app-time': {
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
      },
    },
    'device-time': {
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
      },
    },
    'device-app': {
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
          },
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
          },
        ],
      },
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
        return '';
    }
  };

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

  const currentData = recordData || {};

  return (
    <div className="statistics-container">
      <h2 className="statistics-title">{getViewTitle()}</h2>

      {selectedView === 'device-app' ? (
        <div className="charts-section">
          <div className="charts-container">
            <div className="chart-card">
              <h3>Daily Usage by Device</h3>
              <div className="chart-wrapper">
                {currentData.daily ? (
                  <Bar data={currentData.daily} options={stackedBarOptions} />
                ) : <p>No data available.</p>}
              </div>
            </div>
            <div className="chart-card">
              <h3>Weekly Usage by Device</h3>
              <div className="chart-wrapper">
                {currentData.weekly ? (
                  <Bar data={currentData.weekly} options={stackedBarOptions} />
                ) : <p>No data available.</p>}
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
                  {currentData.daily ? (
                    <Doughnut data={currentData.daily} options={chartOptions} />
                  ) : <p>No data available.</p>}
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly</h3>
                <div className="chart-wrapper">
                  {currentData.weekly ? (
                    <Doughnut data={currentData.weekly} options={chartOptions} />
                  ) : <p>No data available.</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="charts-section">
            <div className="charts-container">
              <div className="chart-card">
                <h3>Daily Hours</h3>
                <div className="chart-wrapper">
                  {currentData.barDaily ? (
                    <Bar data={currentData.barDaily} options={barOptions} />
                  ) : <p>No data available.</p>}
                </div>
              </div>
              <div className="chart-card">
                <h3>Weekly Hours</h3>
                <div className="chart-wrapper">
                  {currentData.barWeekly ? (
                    <Bar data={currentData.barWeekly} options={barOptions} />
                  ) : <p>No data available.</p>}
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