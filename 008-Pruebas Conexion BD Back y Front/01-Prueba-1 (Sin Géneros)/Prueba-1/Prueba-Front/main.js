const listadoPeliculas = document.getElementById("peliculas");

function inicializar() {
    fetch("http://localhost:3000/peliculas") 
    .then(response => {
        if (!response.ok) throw new Error("Error al obtener las películas");
        return response.json();
    })
    .then(data => {
        mostrarPeliculas(data);
    })
    .catch(error => console.error("Error al cargar películas:", error));
}
function mostrarPeliculas(lista) {
    listadoPeliculas.innerHTML = ""; // Limpiar listado previo

    if (lista.length === 0) {
        listadoPeliculas.innerHTML = "<li>No se encontraron películas.</li>";
        return;
    }

    lista.forEach(pelicula => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="peliculas">
                <img src="${pelicula.portada}" alt="${pelicula.portada}">
                <h2>${pelicula.titulo}</h2>
                <p>Director: ${pelicula.director}</p>
                <p>Año: ${pelicula.anio}</p>
            </div>
        `;
        listadoPeliculas.appendChild(li);
    });
}
inicializar();