CREATE TABLE PELICULAS(
id SERIAL PRIMARY KEY,
titulo VARCHAR(50) NOT NULL,
director VARCHAR(50),
anio INT,
portada VARCHAR(300)
);

INSERT INTO PELICULAS(titulo,director,anio, portada) VALUES
('El padrino', 'lolo lolez', 1972, 'https://pics.filmaffinity.com/El_padrino-993414333-large.jpg'),
('Pulp fiction','lola lolita', 1992, 'https://pics.filmaffinity.com/Pulp_Fiction-210382116-large.jpg'),
('Inception', 'pepe perez', 2010, 'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg');

SELECT * FROM PELICULAS;

