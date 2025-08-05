const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');

// Ruta: Tiempo total por aplicación
router.get('/app-time', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  let query = `
    SELECT a."appName", 
           SUM(EXTRACT(EPOCH FROM (ar."endTime" - ar."startTime")) / 60)::INT AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "App" a ON ar."appId" = a."appId"
    JOIN "Device" d ON ar."deviceId" = d."deviceId"
    WHERE d."userId" = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar."recordDate" BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += ` GROUP BY a."appName" ORDER BY total_minutes DESC`;

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
    SELECT d."deviceName", 
           SUM(EXTRACT(EPOCH FROM (ar."endTime" - ar."startTime")) / 60)::INT AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "Device" d ON ar."deviceId" = d."deviceId"
    WHERE d."userId" = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar."recordDate" BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += ` GROUP BY d."deviceName" ORDER BY total_minutes DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching device-time data:', error);
    res.status(500).json({ error: 'Failed to fetch device-time data' });
  }
});

// Ruta: Tiempo total por aplicación y dispositivo
router.get('/app-device', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  let query = `
    SELECT d."deviceName", a."appName",
           SUM(EXTRACT(EPOCH FROM (ar."endTime" - ar."startTime")) / 60)::INT AS total_minutes
    FROM "ActivityRecord" ar
    JOIN "App" a ON ar."appId" = a."appId"
    JOIN "Device" d ON ar."deviceId" = d."deviceId"
    WHERE d."userId" = $1
  `;
  const values = [userId];

  if (start && end) {
    query += ` AND ar."recordDate" BETWEEN $2 AND $3`;
    values.push(start, end);
  }

  query += ` GROUP BY d."deviceName", a."appName"
             ORDER BY d."deviceName" ASC, total_minutes DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching app-device data:', error);
    res.status(500).json({ error: 'Failed to fetch app-device data' });
  }
});

module.exports = router;
