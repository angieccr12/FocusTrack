const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // 1️⃣ Validar que no falten campos
  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // 2️⃣ Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de correo inválido' });
  }

  try {
    const checkUser = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (checkUser.rows.length > 0) {
      return res.status(409).json({ message: 'Este correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO "User" (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING userid, email, first_name, last_name',
      [email, hashedPassword, first_name, last_name]
    );

  const user = result.rows[0];

  const token = jwt.sign(
    { id: user.userid, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(201).json({
    message: 'Usuario registrado correctamente',
    token,
    user
  });

  } catch (err) {
  console.error(' Error al registrar usuario:', err.message);
  res.status(500).json({ message: err.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ message: 'Contraseña incorrecta' });
    // }

    const token = jwt.sign(
      { id: user.userid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.userid,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;