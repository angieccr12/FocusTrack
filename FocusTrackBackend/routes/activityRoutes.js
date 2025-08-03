const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// Registrar actividad (protegido)
router.post('/activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { appId, deviceId, date, startTime, endTime } = req.body;

    // Validar IDs como enteros positivos
    if (!Number.isInteger(appId) || appId <= 0 ||
        !Number.isInteger(deviceId) || deviceId <= 0 ||
        !Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'IDs deben ser enteros positivos' });
    }

    // Validar que appId exista
    const appCheck = await pool.query('SELECT 1 FROM "App" WHERE appid = $1', [appId]);
    if (appCheck.rowCount === 0) {
      return res.status(404).json({ error: 'La app no existe' });
    }

    // Validar que deviceId exista
    const deviceCheck = await pool.query('SELECT 1 FROM "Device" WHERE deviceid = $1', [deviceId]);
    if (deviceCheck.rowCount === 0) {
      return res.status(404).json({ error: 'El dispositivo no existe' });
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Formato de fecha inválido. Usa YYYY-MM-DD' });
    }

    // Validar formato de hora y orden
    const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(time);
    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return res.status(400).json({ error: 'Formato de hora inválido. Usa HH:MM:SS' });
    }

    if (endTime <= startTime) {
      return res.status(400).json({ error: 'La hora de fin debe ser posterior a la hora de inicio' });
    }

    // Calcular duración
    const durationQuery = `SELECT ($1::time - $2::time) AS duration`;
    const durationResult = await pool.query(durationQuery, [endTime, startTime]);
    const duration = durationResult.rows[0].duration;

    // Insertar actividad
    const result = await pool.query(
      `INSERT INTO "ActivityRecord" (userid, appid, deviceid, date, starttime, endtime, duration)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, appId, deviceId, date, startTime, endTime, duration]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al registrar actividad:', error);
    res.status(500).json({ error: 'Error al registrar actividad' });
  }
});

// Obtener historial del usuario autenticado (protegido)
router.get('/activity', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `
      SELECT 
        ar.recordid,
        ar.date,
        ar.starttime,
        ar.endtime,
        ar.duration,
        a.appname,
        d.devicename
      FROM "ActivityRecord" ar
      JOIN "App" a ON ar.appid = a.appid
      JOIN "Device" d ON ar.deviceid = d.deviceid
      WHERE ar.userid = $1
      ORDER BY ar.date DESC, ar.starttime DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

module.exports = router;