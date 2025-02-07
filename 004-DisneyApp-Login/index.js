app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Faltan datos de login' });
    }
  
    try {
      // Verificar el usuario en la base de datos
      const sqlQuery = `SELECT * FROM usuarios WHERE username = $1 AND password = $2`;
      const result = await pool.query(sqlQuery, [username, password]);
  
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
  
      const user = result.rows[0];
  
      res.json({
        message: 'Login correcto',
        username: user.username,
        role: user.role // Devolver el rol del usuario (admin o invitado)
      });
    } catch (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });