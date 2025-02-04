// IMPORTS EN JAVA
const express = require("express"); // API REST -> NODE JS CON EXPRESS
const { Pool } = require("pg");      // HABLAR BD PG DE AWS

// INSTANCIAR LOS OBJETOS QUE NECESITAMOS
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
    user: "postgres",
    host: "netflix-1.cknylvg9zp2l.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "12345678", // Considera usar variables de entorno para gestionar contraseñas
    port: 5432,
    ssl: {
      rejectUnauthorized: false, // Cambia a false si tienes problemas de certificados pero trata de evitarlo por seguridad
      // ca: fs.readFileSync('/path/to/server-ca.pem').toString(),
      // Es posible que AWS RDS requiera parámetros SSL específicos o archivos CA.
      // Comprueba la documentación de AWS RDS para obtener los detalles exactos.
    },
});
    app.get("/peliculas", async (req, res)=>{
    const {rows} = await pool.query(
        "SELECT * FROM peliculas;"
    );
    res.json(rows);
    // res.send("Bienvenido a mi API DISNEY");
    });

    //Buscar una película por su título
    app.get("/peliculas/:title", async (req, res)=>{
        const titulo = req.params.title;
        const {rows} = await pool.query(
            "SELECT * FROM peliculas WHERE titulo = $1;", [titulo]
        );
        res.json(rows);
    });
    //Buscar una película por su genero
    app.get("/peliculas", async (req, res) => {
        const { genero } = req.query;  // Obtenemos el género de la query string
        let query = "SELECT * FROM peliculas";  // Consulta base
        let params = [];
      
        if (genero) {
          query += " WHERE genero = $1";  // Si se pasa un género, filtramos por él
          params.push(genero);
        }
      
        
          const { rows } = await pool.query(query, params);
          res.json(rows);
        
    });
    
    app.post("/peliculas", async (req, res)=>{
        const {id, titulo, director, anio, genero } = req.body;
        const {rows} = await pool.query(
            "INSERT INTO PELICULAS (id, titulo, director, anio, genero) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, titulo, director , anio , genero]
        );
        res.json(rows);
        // res.send("Bienvenido a mi API DISNEY");
    });
    app.put("/peliculas", async (req, res)=>{
        const {id, titulo, director, anio, genero } = req.body;
        const {rows} = await pool.query(
            "UPDATE peliculas SET titulo = $2, director = $3, anio = $4, genero = $5 WHERE id = $1 RETURNING *",
            [id, titulo, director , anio, genero]
        );
        res.json(rows);
        // res.send("Bienvenido a mi API DISNEY");
    });

    // CONSULTAR -> SELECT * FROM USUARIOS, PELICULAS
    app.get("/usuarios/", (req, res) =>{
        // req -> no lo necesito
        // res -> sí
        res.send('Has solicitado una lista de usuarios');
    }); 

    app.get("/usuarios/:id", (req, res) =>{
        const userId = req.params.id;
        res.send(`El ID del usuario es: ${userId}`);
    });

    // ----
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    // LOGIN, PELÍCULAS POR CATEGORÍAS
        // ADD -> INSERT
        //     app.post("/usuarios/", (req, res)); 
    // ELIMINAR -> DELETE                            
        // app.delete("/usuarios/", (req, res)); 
    // MODIFICAR -> UPDATE
        // app.put("/usuarios/", (req, res));    