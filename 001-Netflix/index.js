//API REST

//IMPORTS EN JAVA
const express = require("express"); //API REST -> NODE JS CON EXPRESS
const {Pool} = require("pg");      //HABLAR BD PG DE AWS

//INSTANCIAR LOS OBJETOS QUE NECESITAMOS
const app= express();
const port = 3000;

//Configuracion de la base de datos
const pool = new Pool({
    user:"postgres",
    host: "netflix-01.cknylvg9zp2l.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "Mipeluchelulu2",
    port: 5432
});
app.get("/peliculas/", async (req, res) => {
    try{
        const result = pool.query("SELECT * FROM PELICULAS");
        res.json(result.rows);
    }catch(error){
        console.error("error", error);
        res.status(500).send("Error servidor");
    }
});

    // CONSULTAR -> SELECT * FROM USUARIOS, PELICULAS
    app.get("/usuarios/",(req, res)=> {
        //req -> no lo necesito
        //res -> sí
        res.send('Has solicitado una lista de usuarios');
    }); 

    app.get("/usuarios/:id", (req, res) => {
        const userId = req.params.id;
        res.send(`El ID del usuario es: ${userId}`)
    });
    // ----
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`)
    });
    // LOGIN, PELICULAS POR CATEGORIAS
    // ADD -> INSERT
        //app.post("/usuarios/",(req, res));             
    // ELIMINAR -> DELETE
        //app.delete("/usuarios/",(req, res)); 
    // MODIFICAR -> UPDATE 
        //app.put("/usuarios/",(req, res)); 