require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();


// Habilitar CORS para el frontend en localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // el origen permitido
  credentials: true               // si usas cookies o headers personalizados
}));

app.use(express.json());
const pool = require('./db'); // Conexion bd
const appRoutes = require('./routes/appRoutes.js');
const deviceRoutes = require('./routes/deviceRoutes.js');
const activityRoutes = require('./routes/activityRoutes.js');
const historialRoutes = require('./routes/historial');
const reportRoutes = require('./routes/reportRoutes'); // <--- este sigue igual
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use('/api/apps', appRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api', activityRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/report', reportRoutes); 
app.use('/api/auth', authRoutes);

app.post('/api/test-post', (req, res) => {
  res.json({ msg: 'Ruta POST básica funciona' });
});

// Ruta base
app.get('/', (req, res) => {
  res.send('FocusTrack Backend is running!');
});

// Ruta de prueba para conexión con la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error de conexión:', err);
    res.status(500).send('Error conectando a la base de datos');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
