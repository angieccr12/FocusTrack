const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// Ruta: Tiempo total por aplicación
router.get('/app-time', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  let query = `
    SELECT a.appname, SUM(ar.duration)::int AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "App" a ON ar.appid = a.appid
    WHERE ar.userid = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar.date BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += ` GROUP BY a.appname ORDER BY total_minutes DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching app-time data:', error);
    res.status(500).json({ error: 'Failed to fetch app-time data' });
  }
});

// Ruta: Tiempo total por dispositivo
router.get('/device-time', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  let query = `
    SELECT d.devicename, SUM(ar.duration)::int AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "Device" d ON ar.deviceid = d.deviceid
    WHERE ar.userid = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar.date BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += ` GROUP BY d.devicename ORDER BY total_minutes DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching device-time data:', error);
    res.status(500).json({ error: 'Failed to fetch device-time data' });
  }
});

// Ruta: Tiempo total por dispositivo y aplicación
router.get('/app-device', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  let query = `
    SELECT d.devicename, a.appname, SUM(ar.duration)::int AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "App" a ON ar.appid = a.appid
    JOIN "Device" d ON ar.deviceid = d.deviceid
    WHERE ar.userid = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar.date BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += `
    GROUP BY d.devicename, a.appname
    ORDER BY d.devicename ASC, total_minutes DESC
  `;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching app-device data:', error);
    res.status(500).json({ error: 'Failed to fetch app-device data' });
  }
});

module.exports = router;