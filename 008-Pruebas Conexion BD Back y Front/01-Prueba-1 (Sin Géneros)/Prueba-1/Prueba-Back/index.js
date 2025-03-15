const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'prueba-1.cknylvg9zp2l.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: '12345678',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/peliculas', async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM peliculas');
    res.json(rows);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});