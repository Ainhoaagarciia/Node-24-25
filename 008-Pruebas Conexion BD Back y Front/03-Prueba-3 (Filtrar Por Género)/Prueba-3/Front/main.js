const listadoPeliculas = document.getElementById('peliculas');
const generoSelect = document.getElementById("genero");
let peliculas = [];
let peliculasFiltradas = [];
function inicializar(){
    fetch('http://localhost:3000/peliculas')
    .then(response => response.json())
    .then(data => {
        peliculas = data;
        peliculasFiltradas = [...peliculas];
        mostrarPeliculas(peliculasFiltradas);
        cargarGeneros();
    })
    .catch(error => { console.log("Error al cargar las peliculas", error)});
}
function mostrarPeliculas(lista){
    listadoPeliculas.innerHTML = '';
    if (lista.length === 0) {
        listadoPeliculas.innerHTML = '<p>No hay peliculas</p>';
        return;
    }else{
        lista.forEach(pelicula => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="peliculas">
                    <img src="${pelicula.portada_pelicula}" alt="${pelicula.titulo}">
                    <h2>${pelicula.titulo_pelicula}</h2>
                    <p>Director: ${pelicula.director_pelicula}</p>
                    <p>Año: ${pelicula.anio_pelicula}</p>
                    <p>Género: ${pelicula.nombre_genero}</p>
                </div>
                `;
            listadoPeliculas.appendChild(li);
        });
    }
}
function cargarGeneros() {
    generoSelect.innerHTML = '<option value="todos">Todos</option>';
    const generos = [...new Set(peliculas.map(p => p.nombre_genero))];

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero;
        option.textContent = genero;
        generoSelect.appendChild(option);
    });

    generoSelect.addEventListener("change", () => filtrarPeliculas(generoSelect.value));
}
function filtrarPeliculas(genero) {
    if (genero === "todos") {
        peliculasFiltradas = [...peliculas];
    } else {
        peliculasFiltradas = peliculas.filter(pelicula => pelicula.nombre_genero === genero);
    }
    mostrarPeliculas(peliculasFiltradas);
}
inicializar();