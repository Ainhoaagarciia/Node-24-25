const listadoPeliculas = document.getElementById('peliculas');

function inicializar(){
    fetch('http://localhost:3002/peliculas')
    .then(response => {
        if(!response.ok) throw new Error("Error al mostrar las peliculas");
        return response.json();
    })
    .then(data => {
        mostrarPeliculas(data);
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
inicializar();