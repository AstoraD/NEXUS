# NEXUS --- Anime · TCG · Music Hub

NEXUS es una aplicación web full stack desarrollada como parte de un
periodo de prueba de Desarrollo de Software. Permite explorar contenido
de Anime, TCG y Música, consultar detalles, registrarse e iniciar
sesión, guardar favoritos en una colección personal y administrar el
catálogo y los usuarios de acuerdo con el rol autenticado.

## Tecnologías utilizadas

### Frontend

-   HTML5
-   CSS3
-   JavaScript
-   Manipulación del DOM
-   Consumo de API REST mediante `fetch`

### Backend

-   C#
-   ASP.NET Core Web API
-   Entity Framework Core
-   Autenticación mediante JWT
-   Autorización mediante roles `Admin` y `User`

### Base de datos

-   Microsoft SQL Server
-   SQL Server Management Studio (SSMS)

### Control de versiones

-   Git
-   GitHub

## Estructura del proyecto

``` text
Nexus/
├── BACKEND/
│   └── Nexus/
│       └── Nexus.Api/
├── DATABASE/
│   ├── 01_Creacion_BaseDatos_Nexus.sql
│   ├── 02_Datos_Iniciales_Nexus.sql
│   └── 03_Consultas_Verificacion_Nexus.sql
├── DOCS/
│   ├── Diagramas/
│   ├── Evidencias/
│   └── Reportes/
├── FRONTEND/
│   ├── css/
│   ├── img/
│   ├── js/
│   └── index.html
├── .gitignore
└── README.md
```

## Funcionalidades principales

-   Catálogo de contenido dividido en Anime, TCG y Música.
-   Contenido obtenido desde el backend mediante API.
-   Filtrado y navegación dinámica mediante JavaScript.
-   Registro de usuarios.
-   Inicio y cierre de sesión.
-   Contraseñas almacenadas mediante hash.
-   Autenticación mediante JWT.
-   Roles `Admin` y `User`.
-   Colección personal de favoritos persistida en SQL Server.
-   Consulta de favoritos del usuario autenticado.
-   Administración de usuarios y cambio de roles por parte de un
    administrador.
-   CRUD del catálogo para administradores.
-   Protección de operaciones administrativas mediante autorización por
    rol.
-   Diseño adaptable a distintos tamaños de pantalla.

## Requisitos previos

Para ejecutar NEXUS localmente se requiere:

-   Windows.
-   Visual Studio con soporte para ASP.NET Core.
-   .NET 10.
-   Microsoft SQL Server.
-   SQL Server Management Studio.
-   Un navegador web moderno.

## Configuración de la base de datos

1.  Abrir SQL Server Management Studio.
2.  Conectarse a una instancia local de SQL Server.
3.  Abrir los scripts ubicados en la carpeta `DATABASE`.
4.  Ejecutarlos en el siguiente orden:

``` text
01_Creacion_BaseDatos_Nexus.sql
02_Datos_Iniciales_Nexus.sql
03_Consultas_Verificacion_Nexus.sql
```

El primer script crea la base de datos y su estructura. El segundo
agrega los datos iniciales necesarios para el catálogo. El tercero
permite realizar consultas de verificación.

La base de datos utilizada por el proyecto se llama:

``` text
NexusDB
```

El modelo contiene cuatro tablas principales:

-   `Usuarios`
-   `Categorias`
-   `Items`
-   `Favoritos`

La documentación detallada del esquema y su normalización hasta Tercera
Forma Normal (3FN) se encuentra en `DOCS/Reportes`.

## Configuración del backend

Por seguridad, las credenciales de SQL Server y la clave utilizada para
JWT no deben almacenarse en el repositorio público.

El archivo local `appsettings.json` debe contener una cadena de conexión
válida para la instancia de SQL Server y la configuración JWT
correspondiente.

Ejemplo de estructura:

``` json
{
  "ConnectionStrings": {
    "NexusDB": "Server=TU_SERVIDOR;Database=NexusDB;User Id=TU_USUARIO;Password=TU_PASSWORD;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "TU_CLAVE_JWT_SEGURA",
    "Issuer": "NexusApi",
    "Audience": "NexusFrontend"
  }
}
```

Los valores mostrados son únicamente marcadores de configuración. No
deben sustituirse en el repositorio por credenciales reales.

## Ejecución del backend

1.  Abrir la solución del proyecto ubicada en `BACKEND/Nexus` con Visual
    Studio.
2.  Seleccionar `Nexus.Api` como proyecto de inicio.
3.  Verificar que SQL Server se encuentre disponible y que `NexusDB`
    haya sido creada.
4.  Verificar la configuración local de `appsettings.json`.
5.  Ejecutar el proyecto desde Visual Studio.
6.  Mantener la API en ejecución mientras se utiliza el frontend.

El frontend está configurado para consumir la API local del proyecto.

## Ejecución del frontend

Con la API en ejecución:

1.  Abrir la carpeta `FRONTEND`.
2.  Localizar `index.html`.
3.  Hacer doble clic sobre `index.html`.
4.  El navegador abrirá la interfaz de NEXUS.
5.  Mantener el backend ejecutándose durante las pruebas para permitir
    las consultas a la API.

No se requiere un servidor adicional para el procedimiento local
utilizado durante el desarrollo de esta versión.

## Roles y permisos

### User

El usuario estándar puede:

-   Registrarse e iniciar sesión.
-   Explorar el catálogo.
-   Consultar detalles.
-   Agregar elementos a su colección.
-   Eliminar elementos de su colección.
-   Consultar sus favoritos persistidos.

### Admin

Además de las funciones de un usuario, el administrador puede:

-   Crear elementos del catálogo.
-   Editar elementos.
-   Eliminar elementos.
-   Consultar usuarios.
-   Cambiar roles de usuarios.

Las operaciones administrativas del backend están protegidas mediante
autenticación y autorización.

## API

El backend expone endpoints REST para las funciones principales de
NEXUS, incluyendo:

-   Autenticación y registro.
-   Categorías.
-   Catálogo de items.
-   Favoritos.
-   Administración de usuarios.

El CRUD del catálogo utiliza los métodos HTTP `GET`, `POST`, `PUT` y
`DELETE`.

La documentación detallada de endpoints puede mantenerse dentro de la
carpeta `DOCS`.

## Seguridad

NEXUS incorpora las siguientes medidas:

-   Hash de contraseñas.
-   Autenticación JWT.
-   Autorización basada en roles.
-   Protección de operaciones administrativas.
-   Validación de datos recibidos por el backend.
-   Aislamiento de favoritos utilizando la identidad del usuario
    obtenida desde el JWT.
-   Exclusión de archivos locales con credenciales mediante
    `.gitignore`.

Nunca deben publicarse contraseñas, cadenas de conexión reales, claves
JWT ni tokens de sesión.

## Documentación

La carpeta `DOCS` organiza la documentación del proyecto:

``` text
DOCS/
├── Diagramas/   # Diagramas técnicos y de base de datos
├── Evidencias/  # Capturas de funcionamiento y pruebas
└── Reportes/    # Reportes de avance y documentación técnica
```

Entre los documentos generados se encuentra la documentación de
`NexusDB`, incluyendo su esquema, relaciones, integridad y normalización
hasta 3FN.

## Ejecución resumida

``` text
1. Crear NexusDB ejecutando los scripts de DATABASE.
2. Configurar localmente la conexión SQL Server y JWT.
3. Abrir y ejecutar Nexus.Api desde Visual Studio.
4. Mantener la API activa.
5. Abrir FRONTEND/index.html en el navegador.
6. Probar registro, login, catálogo, favoritos y funciones administrativas.
```

## Estado del proyecto

NEXUS cuenta con integración entre frontend, API y SQL Server. Los
principales flujos funcionales incluyen autenticación, autorización por
roles, administración del catálogo, administración de usuarios y
colección persistente de favoritos.

## Nota de seguridad

Los archivos de configuración que contienen información sensible se
mantienen fuera del control de versiones. Cualquier persona que clone el
repositorio deberá proporcionar sus propias credenciales locales y una
clave JWT segura antes de ejecutar el backend.
