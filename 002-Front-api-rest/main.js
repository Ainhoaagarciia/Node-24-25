const API_URL = "http://localhost:3000"

const GET_PELICULAS = API_URL + "/peliculas";
const GET_PELICULAS_BY_GENERO = API_URL + "";
const GET_PELICULAS_FAVORITAS = API_URL + "";
const INSERT_PELICULAS = API_URL + "";
const GET_USUARIOS = API_URL + "/usuarios/:id";

function getPeliculas(){
    alert("PASO 1");
    /*fetch()
        .then(response => response.json())
        .then(
            (data) =>{

            }
        )
        .catch()*/
        //http://localhost:3000/peliculas
        fetch(GET_PELICULAS)
        .then(response => response.json())
        .then(
            (data) =>{
                    let idPelicula = data[0].id;
                    let tituloPelicula = data[0].titulo;
                    let anioPelicula = data[0].anio;
                    let generoPelicula = data[0].genero;
            }
        )
        .catch()
}