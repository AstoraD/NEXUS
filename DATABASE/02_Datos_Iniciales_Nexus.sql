INSERT INTO Categorias (Nombre)
VALUES
('Anime'),
('TCG'),
('Musica');
GO
INSERT INTO Items
(
    Titulo,
    Descripcion,
    ImagenUrl,
    IdCategoria
)
VALUES
(
    'Bleach',
    'Serie de anime disponible dentro del catalogo de NEXUS.',
    NULL,
    1
),
(
    'Pokemon TCG',
    'Juego de cartas coleccionables disponible dentro de NEXUS.',
    NULL,
    2
),
(
    'Yu-Gi-Oh! TCG',
    'Juego de cartas coleccionables disponible dentro de NEXUS.',
    NULL,
    2
),
(
    'Sigh',
    'Contenido musical disponible dentro de NEXUS.',
    NULL,
    3
);
GO