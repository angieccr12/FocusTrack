require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Imports
const pool = require('./db');
const activityRoutes = require('./routes/activityRoutes.js');
const historyRoutes = require('./routes/historial');
const reportRoutes = require('./routes/reportRoutes'); 
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

// Routes
app.use('/api/activity', activityRoutes);     // ✅ prefijo correcto
app.use('/api/history', historyRoutes);
app.use('/api/report', reportRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);

// Basic POST test route
app.post('/api/test-post', (req, res) => {
  res.json({ msg: 'Basic POST route works' });
});

// Base route
app.get('/', (req, res) => {
  res.send('FocusTrack Backend is running!');
});

// Route to test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Failed to connect to the database');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});