const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Instanciar Express
const app = express();
const port = 3000;

// Conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "netflix-1.cknylvg9zp2l.us-east-1.rds.amazonaws.com",
  database: "postgres",
  password: "12345678",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Configuración de CORS para permitir solicitudes desde el navegador
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta para login (POST)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos de login' });
  }

  try {
    // Consulta para verificar el usuario y la contraseña en la base de datos
    const sqlQuery = `
      SELECT * FROM usuarios 
      WHERE username = $1 AND password = $2
    `;
    
    const result = await pool.query(sqlQuery, [username, password]);

    // Si no se encuentra el usuario
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = result.rows[0];

    // Respuesta exitosa
    res.json({
      message: 'Login correcto',
      username: user.username
    });
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
