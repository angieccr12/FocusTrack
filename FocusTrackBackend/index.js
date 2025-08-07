require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // o la URL de tu frontend si está en producción
  credentials: true
}));

// Imports de rutas
const pool = require('./db');
const activityRoutes = require('./routes/activityRoutes.js');
const historyRoutes = require('./routes/historial');
const reportRoutes = require('./routes/reportRoutes'); 
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');

// Middleware de rutas con prefijos
app.use('/api/activity', activityRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/report', reportRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);

// Ruta de prueba POST
app.post('/api/test-post', (req, res) => {
  res.json({ msg: 'Basic POST route works' });
});

// Ruta base
app.get('/', (req, res) => {
  res.send('FocusTrack Backend is running!');
});

// Ruta para testear conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Failed to connect to the database');
  }
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
