CREATE DATABASE NexusDB;
GO

USE NexusDB;
GO

CREATE TABLE Usuarios
(
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(150) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Rol VARCHAR(20) NOT NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT CK_Usuarios_Rol
    CHECK (Rol IN ('Admin', 'User'))
);
GO


CREATE TABLE Categorias
(
    IdCategoria INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE
);
GO


CREATE TABLE Items
(
    IdItem INT IDENTITY(1,1) PRIMARY KEY,
    Titulo VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(500) NULL,
    ImagenUrl VARCHAR(500) NULL,
    IdCategoria INT NOT NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Items_Categorias
    FOREIGN KEY (IdCategoria)
    REFERENCES Categorias(IdCategoria)
);
GO


CREATE TABLE Favoritos
(
    IdFavorito INT IDENTITY(1,1) PRIMARY KEY,
    IdUsuario INT NOT NULL,
    IdItem INT NOT NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Favoritos_Usuarios
    FOREIGN KEY (IdUsuario)
    REFERENCES Usuarios(IdUsuario),

    CONSTRAINT FK_Favoritos_Items
    FOREIGN KEY (IdItem)
    REFERENCES Items(IdItem),

    CONSTRAINT UQ_Favoritos_Usuario_Item
    UNIQUE (IdUsuario, IdItem)
);
GO