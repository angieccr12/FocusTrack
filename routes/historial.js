const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticateToken = require('../middleware/authMiddleware'); 
//Obtiene el historial de actividades del usuario autenticado, incluyendo duración, app y dispositivo utilizados
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id; 

  try {
 // Consulta SQL para obtener registros de actividad junto con información de la app y el dispositivo
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
    // Retorna el historial de registros
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

module.exports = router;