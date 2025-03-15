const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'prueba-2.cknylvg9zp2l.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: '12345678',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/peliculas', async (req, res) => {
    const {rows} = await pool.query(`SELECT p.id_pelicula, p.titulo_pelicula, p.director_pelicula, p.anio_pelicula, p.portada_pelicula, g.nombre_genero
                                    FROM peliculas p
                                    JOIN generos g ON p.id_genero = g.id_genero`);
    res.json(rows);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});