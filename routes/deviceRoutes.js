const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Route to register a new device
router.post(
  '/',
  authenticateToken,
  [
    body('devicename').notEmpty().withMessage('Device name is required'),
    body('devicetype').notEmpty().withMessage('Device type is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { devicename, devicetype } = req.body;
    const userId = req.user.id;

    try {
      const result = await pool.query(
        'INSERT INTO "Device" (devicename, devicetype, userid) VALUES ($1, $2, $3) RETURNING *',
        [devicename, devicetype, userId]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error registering device:', err);
      res.status(500).json({ error: 'Internal server error while registering device' });
    }
  }
);

// Route to get all devices for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM "Device" WHERE userid = $1 ORDER BY devicename ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving devices:', err);
    res.status(500).json({ error: 'Internal server error while retrieving devices' });
  }
});

module.exports = router;