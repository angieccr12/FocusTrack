// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send('FocusTrack Backend is running!');
});

// Servidor
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
