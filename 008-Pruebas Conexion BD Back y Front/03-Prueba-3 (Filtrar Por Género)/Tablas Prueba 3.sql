CREATE TABLE GENEROS(
id_genero SERIAL PRIMARY KEY,
nombre_genero VARCHAR(30) NOT NULL
);

INSERT INTO GENEROS(nombre_genero) VALUES
('Comedia'),
('Terror'),
('Romance'),
('Ciencia Ficcion');

SELECT * FROM GENEROS;

CREATE TABLE PELICULAS(
id_pelicula SERIAL PRIMARY KEY,
titulo_pelicula VARCHAR(50) NOT NULL,
director_pelicula VARCHAR(50),
anio_pelicula INTEGER,
portada_pelicula VARCHAR(500),
id_genero INTEGER REFERENCES GENEROS(id_genero) ON DELETE CASCADE
);

INSERT INTO PELICULAS(titulo_pelicula,director_pelicula,anio_pelicula,portada_pelicula,id_genero) VALUES
('Niños Grandes','Pepe',2013,'https://es.web.img3.acsta.net/medias/nmedia/18/95/85/19/20533585.jpg', 1),
('El Conjuro 2','Pepa',2016,'https://m.media-amazon.com/images/M/MV5BMzM2OTE4ZWUtMzNiNy00MzhmLWE0YmMtZGE3ZTg2ZmUwODUzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 2),
('La La Land','Pepo',2016, 'https://pics.filmaffinity.com/La_ciudad_de_las_estrellas_La_La_Land-262021831-large.jpg',3),
('Matrix','Pipo',1999, 'https://pics.filmaffinity.com/Matrix-155050517-large.jpg',4);

SELECT * FROM PELICULAS;

//Para que salga la columna del nombre de genero en vez de la del id_genero

SELECT p.id_pelicula, p.titulo_pelicula, p.director_pelicula, p.anio_pelicula, p.portada_pelicula, g.nombre_genero
FROM peliculas p
JOIN generos g ON p.id_genero = g.id_genero;