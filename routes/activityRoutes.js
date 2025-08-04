const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Ruta para registrar una nueva actividad (y registrar la app si no existe)
router.post(
  '/',
  authenticateToken,
  [
    body('deviceid').isInt().withMessage('deviceid must be an integer'),
    body('appname').notEmpty().withMessage('appname is required'),
    body('date').isISO8601().withMessage('date must be in format YYYY-MM-DD'),
    body('starttime')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('starttime must be in HH:mm format'),
    body('endtime')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('endtime must be in HH:mm format'),
    body('duration')
      .isInt({ min: 1 })
      .withMessage('duration must be a positive integer'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { deviceid, appname, date, starttime, endtime, duration } = req.body;
    const userId = req.user.id;

    try {
      // Verificar si la app ya existe para este usuario
      let appResult = await pool.query(
        'SELECT appid FROM "App" WHERE userid = $1 AND appname = $2',
        [userId, appname]
      );

      let appid;
      if (appResult.rows.length > 0) {
        appid = appResult.rows[0].appid;
      } else {
        // Si no existe, insertarla
        const insertApp = await pool.query(
          'INSERT INTO "App" (userid, appname) VALUES ($1, $2) RETURNING appid',
          [userId, appname]
        );
        appid = insertApp.rows[0].appid;
      }

      // Ahora registrar la actividad
      const activityResult = await pool.query(
        `
        INSERT INTO "ActivityRecord" (userid, deviceid, appid, date, starttime, endtime, duration)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [userId, deviceid, appid, date, starttime, endtime, duration]
      );

      res.status(201).json(activityResult.rows[0]);
    } catch (error) {
      console.error('Error registering activity:', error);
      res.status(500).json({ error: 'Error registering activity' });
    }
  }
);

module.exports = router;