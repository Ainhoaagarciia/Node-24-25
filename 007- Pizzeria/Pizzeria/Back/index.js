require("dotenv").config();
const express = require("express"); //Api rest y endpoints
const cors = require("cors"); //Comunicarse Back y Front
const pool = require("./db");
const app = express();

app.listen(3000, () => {
    console.log(`🔥 Servidor corriendo en http://localhost:3000`);
});
  

app.get("/peliculas", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM peliculas");
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
});
app.get("/genero1/:titulo", async (req, res) => {
    // params: Con 2 PUNTOS
    const param1= req.params.titulo;
    try {
      const consulta = `SELECT * FROM PELICULAS p
                        INNER JOIN GENERO1 g
                            ON g.genero1_id= g.id
                        WHERE UPPER (g.titulo) LIKE '%$1%'`;   
      //END SQL = '%TERROR%';
      //const endSql = "'%" + param1 + "%'";
      const result = await pool.query(consulta, ['%Terror%']);            
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error del servidor" });
    }
});
  