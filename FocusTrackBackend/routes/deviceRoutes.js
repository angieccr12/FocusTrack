const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware'); // ✅ Correcto

// Ruta protegida para guardar un nuevo dispositivo
router.post('/', authenticateToken, async (req, res) => {
  const { deviceName, deviceType } = req.body;
  const userId = req.user.id; // 👈 Extraído del token

  if (!deviceName || !deviceType) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO "Device" (userId, deviceName, deviceType) VALUES ($1, $2, $3) RETURNING *',
      [userId, deviceName, deviceType]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar el dispositivo:', err);
    res.status(500).json({ error: 'Error al guardar el dispositivo' });
  }
});

// Ruta protegida para obtener los dispositivos del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM "Device" WHERE userId = $1 ORDER BY deviceName ASC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener dispositivos:', error);
    res.status(500).json({ error: 'Error al obtener dispositivos' });
  }
});
console.log('¿Qué estoy exportando desde deviceRoutes?', router);
module.exports = router;