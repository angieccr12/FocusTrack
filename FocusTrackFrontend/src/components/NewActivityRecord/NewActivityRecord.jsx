import { useState } from 'react';
import './NewActivityRecord.css';

export default function NewActivityRecord() {
  const [customApp, setCustomApp] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [...Array(60)].map((_, i) => String(i).padStart(2, '0'));
  const ampm = ['AM', 'PM'];

  return (
    <div className="activity-container">
      <div className="activity-title">New Activity Record</div>

      <div className="activity-card">
        <form className="activity-form">
          {/* Dispositivo */}
          <label className="activity-label">Device</label>
          <select className="activity-input full">
            <option value="">Select a device</option>
            <option>Phone</option>
            <option>Tablet</option>
            <option>Laptop</option>
          </select>

          {/* Aplicación existente o nueva */}
          <label className="activity-label">Application</label>
          {!customApp ? (
            <select className="activity-input full">
              <option value="">Select an existing app</option>
              <option>Instagram</option>
              <option>YouTube</option>
              <option>Spotify</option>
            </select>
          ) : (
            <input type="text" className="activity-input full" placeholder="Enter new application name" />
          )}

          <button
            type="button"
            className="activity-toggle-button"
            onClick={() => setCustomApp(!customApp)}
          >
            {customApp ? 'Select from list' : 'Add new app'}
          </button>

          {/* Calendario */}
          <label className="activity-label">Date</label>
          <input
            type="date"
            className="activity-input full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          {/* Hora inicio */}
          <label className="activity-label">Start Time</label>
          <div className="activity-time-row">
            <select className="activity-input time-select">
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <select className="activity-input time-select">
              {minutes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select className="activity-input time-select">
              {ampm.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Hora fin */}
          <label className="activity-label">End Time</label>
          <div className="activity-time-row">
            <select className="activity-input time-select">
              {hours.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <select className="activity-input time-select">
              {minutes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <select className="activity-input time-select">
              {ampm.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="activity-button">Save Record</button>
        </form>
      </div>
    </div>
  );
}
