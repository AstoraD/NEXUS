const API_URL = "https://localhost:7055/api";

let items = [];
async function cargarItemsDesdeAPI() {
    try {
        const respuesta = await fetch(`${API_URL}/Items`);

        if (!respuesta.ok) {
            throw new Error("No fue posible obtener el catálogo.");
        }

        const datos = await respuesta.json();

        items = datos.map(item => ({
            id: item.idItem,
            titulo: item.titulo,
            descripcion: item.descripcion,
            categoria: item.categoria,
            imagenUrl: item.imagenUrl,
            icono: obtenerIcono(item.categoria)
        }));

        mostrarItems(items);

    } catch (error) {
        console.error("Error al cargar NEXUS API:", error);

        contenedorTarjetas.innerHTML = `
            <p>No fue posible cargar el catálogo de NEXUS.</p>
        `;
    }
}

function obtenerIcono(categoria) {
    switch (categoria) {
        case "Anime":
            return "✦";

        case "TCG":
            return "◇";

        case "Musica":
            return "♪";

        default:
            return "✧";
    }
}
/* =========================================
   ELEMENTOS DEL CATÁLOGO
========================================= */

const contenedorTarjetas =
    document.getElementById("contenedorTarjetas");

const botonesFiltro =
    document.querySelectorAll(".filtro");

const botonesUniverso =
    document.querySelectorAll(".btn-universo");

const enlacesCategoria =
    document.querySelectorAll(".nav-links [data-categoria]");

const btnCargarMas =
    document.getElementById("btnCargarMas");


/* =========================================
   ELEMENTOS DEL MODAL DE DETALLE
========================================= */

const modalDetalle =
    document.getElementById("modalDetalle");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalCerrar =
    document.getElementById("modalCerrar");

const modalImagen =
    document.getElementById("modalImagen");

const modalCategoria =
    document.getElementById("modalCategoria");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalDescripcion =
    document.getElementById("modalDescripcion");

const modalCategoriaDato =
    document.getElementById("modalCategoriaDato");

const modalFavorito =
    document.getElementById("modalFavorito");

    const modalMensaje =
    document.getElementById("modalMensaje");

const mensajeIcono =
    document.getElementById("mensajeIcono");

const mensajeTitulo =
    document.getElementById("mensajeTitulo");

const mensajeTexto =
    document.getElementById("mensajeTexto");

const btnCerrarMensaje =
    document.getElementById("btnCerrarMensaje");

const mensajeOverlay =
    document.getElementById("mensajeOverlay");


function mostrarAlertaNexus(
    titulo,
    mensaje,
    icono = "✦"
) {

    mensajeTitulo.textContent = titulo;

    mensajeTexto.textContent = mensaje;

    mensajeIcono.textContent = icono;

    modalMensaje.classList.add("activo");
}


function cerrarAlertaNexus() {

    modalMensaje.classList.remove("activo");
}


btnCerrarMensaje.addEventListener(
    "click",
    cerrarAlertaNexus
);


mensajeOverlay.addEventListener(
    "click",
    cerrarAlertaNexus
);

/* =========================================
   ELEMENTOS DE AUTENTICACIÓN
========================================= */

const btnLogin =
    document.getElementById("btnLogin");

const btnCrearColeccion =
    document.getElementById("btnCrearColeccion");

const modalAuth =
    document.getElementById("modalAuth");

const authOverlay =
    document.getElementById("authOverlay");

const authCerrar =
    document.getElementById("authCerrar");

const formLogin =
    document.getElementById("formLogin");

const formRegistro =
    document.getElementById("formRegistro");

const mostrarRegistro =
    document.getElementById("mostrarRegistro");

const mostrarLogin =
    document.getElementById("mostrarLogin");

const loginForm =
    document.getElementById("loginForm");

const registroForm =
    document.getElementById("registroForm");


/* =========================================
   CAMPOS LOGIN
========================================= */

const loginCorreo =
    document.getElementById("loginCorreo");

const loginPassword =
    document.getElementById("loginPassword");

const errorLoginCorreo =
    document.getElementById("errorLoginCorreo");

const errorLoginPassword =
    document.getElementById("errorLoginPassword");


/* =========================================
   CAMPOS REGISTRO
========================================= */

const registroNombre =
    document.getElementById("registroNombre");

const registroCorreo =
    document.getElementById("registroCorreo");

const registroPassword =
    document.getElementById("registroPassword");

const registroConfirmar =
    document.getElementById("registroConfirmar");

const errorRegistroNombre =
    document.getElementById("errorRegistroNombre");

const errorRegistroCorreo =
    document.getElementById("errorRegistroCorreo");

const errorRegistroPassword =
    document.getElementById("errorRegistroPassword");

const errorRegistroConfirmar =
    document.getElementById("errorRegistroConfirmar");
const menuCuenta =
    document.getElementById("menuCuenta");

const menuCuentaNombre =
    document.getElementById("menuCuentaNombre");

const menuCuentaRol =
    document.getElementById("menuCuentaRol");

const btnMiColeccion =
    document.getElementById("btnMiColeccion");

const btnAdministrarCatalogo =
    document.getElementById("btnAdministrarCatalogo");

const btnAdministrarUsuarios =
    document.getElementById("btnAdministrarUsuarios");

const btnCerrarSesion =
    document.getElementById("btnCerrarSesion");
const modalUsuarios =
    document.getElementById("modalUsuarios");

const usuariosOverlay =
    document.getElementById("usuariosOverlay");

const usuariosCerrar =
    document.getElementById("usuariosCerrar");

const usuariosLista =
    document.getElementById("usuariosLista");
/* =========================================
   VARIABLES
========================================= */

let itemSeleccionado = null;

let favoritos = [];


/* =========================================
   MOSTRAR TARJETAS
========================================= */

function mostrarItems(lista) {

    contenedorTarjetas.innerHTML = "";

    if (lista.length === 0) {

        contenedorTarjetas.innerHTML = `
            <p>No se encontró contenido en esta categoría.</p>
        `;

        return;
    }


    lista.forEach(item => {

        const tarjeta =
            document.createElement("article");

        tarjeta.classList.add("tarjeta");


        const esFavorito =
            favoritos.includes(item.id);

        const iconoFavorito =
            esFavorito ? "♥" : "♡";


        tarjeta.innerHTML = `

            <div class="tarjeta-imagen">

                ${item.icono}

            </div>

            <div class="tarjeta-contenido">

                <p class="tarjeta-categoria">
                    ${item.categoria}
                </p>

                <h3>
                    ${item.titulo}
                </h3>

                <p class="tarjeta-descripcion">
                    ${item.descripcion}
                </p>

                <div class="tarjeta-footer">

                    <button
                        type="button"
                        class="btn-detalle"
                        data-id="${item.id}">

                        Ver detalle

                    </button>

                    <button
                        type="button"
                        class="btn-favorito"
                        data-id="${item.id}"
                        aria-label="Agregar a favoritos">

                        ${iconoFavorito}

                    </button>

                </div>

            </div>
        `;


        contenedorTarjetas.appendChild(tarjeta);

    });


    configurarBotonesTarjetas();
}


/* =========================================
   FILTRAR CATEGORÍAS
========================================= */

function filtrarCategoria(categoria) {

    let resultado;


    if (categoria === "Todos") {

        resultado = items;

    } else {

        resultado = items.filter(
            item => item.categoria === categoria
        );

    }


    mostrarItems(resultado);

    actualizarFiltroActivo(categoria);
}


/* =========================================
   ACTUALIZAR FILTRO ACTIVO
========================================= */

function actualizarFiltroActivo(categoria) {

    botonesFiltro.forEach(boton => {

        boton.classList.remove("activo");


        if (boton.dataset.categoria === categoria) {

            boton.classList.add("activo");

        }

    });
}


/* =========================================
   BOTONES DE FILTRO
========================================= */

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        const categoria =
            boton.dataset.categoria;

        filtrarCategoria(categoria);

    });

});


/* =========================================
   BOTONES DE UNIVERSOS
========================================= */

botonesUniverso.forEach(boton => {

    boton.addEventListener("click", () => {

        const categoria =
            boton.dataset.categoria;


        filtrarCategoria(categoria);


        document
            .getElementById("explorar")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =========================================
   MENÚ SUPERIOR
========================================= */

enlacesCategoria.forEach(enlace => {

    enlace.addEventListener("click", () => {

        const categoria =
            enlace.dataset.categoria;

        filtrarCategoria(categoria);

    });

});


/* =========================================
   BOTONES DE LAS TARJETAS
========================================= */

function configurarBotonesTarjetas() {

    const botonesFavorito =
        document.querySelectorAll(".btn-favorito");

    const botonesDetalle =
        document.querySelectorAll(".btn-detalle");


    botonesFavorito.forEach(boton => {

        boton.addEventListener("click", () => {

            const id =
                Number(boton.dataset.id);

            cambiarFavorito(id);

        });

    });


    botonesDetalle.forEach(boton => {

        boton.addEventListener("click", () => {

            const id =
                Number(boton.dataset.id);


            const item =
                items.find(
                    elemento => elemento.id === id
                );


            if (item) {

                abrirDetalle(item);

            }

        });

    });
}


/* =========================================
   FAVORITOS
========================================= */

function cambiarFavorito(id) {

    const posicion =
        favoritos.indexOf(id);


    if (posicion === -1) {

        favoritos.push(id);

    } else {

        favoritos.splice(posicion, 1);

    }


    actualizarCorazones(id);
}


function actualizarCorazones(id) {

    const esFavorito =
        favoritos.includes(id);


    const botones =
        document.querySelectorAll(
            `.btn-favorito[data-id="${id}"]`
        );


    botones.forEach(boton => {

        boton.textContent =
            esFavorito ? "♥" : "♡";

    });


    if (
        itemSeleccionado &&
        itemSeleccionado.id === id
    ) {

        actualizarBotonFavoritoModal();

    }
}


/* =========================================
   ABRIR DETALLE
========================================= */

function abrirDetalle(item) {

    itemSeleccionado = item;


    modalImagen.textContent =
        item.icono;

    modalCategoria.textContent =
        item.categoria.toUpperCase();

    modalTitulo.textContent =
        item.titulo;

    modalDescripcion.textContent =
        item.descripcion;

    modalCategoriaDato.textContent =
        item.categoria;


    actualizarBotonFavoritoModal();


    modalDetalle.classList.add("activo");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CERRAR DETALLE
========================================= */

function cerrarDetalle() {

    modalDetalle.classList.remove("activo");

    document.body.style.overflow = "";

    itemSeleccionado = null;
}


/* =========================================
   FAVORITO DESDE MODAL
========================================= */

function actualizarBotonFavoritoModal() {

    if (!itemSeleccionado) {
        return;
    }


    const esFavorito =
        favoritos.includes(itemSeleccionado.id);


    modalFavorito.textContent =
        esFavorito
            ? "♥ En favoritos"
            : "♡ Agregar a favoritos";
}


modalFavorito.addEventListener("click", () => {

    if (!itemSeleccionado) {
        return;
    }


    cambiarFavorito(itemSeleccionado.id);

});


modalCerrar.addEventListener(
    "click",
    cerrarDetalle
);


modalOverlay.addEventListener(
    "click",
    cerrarDetalle
);


/* =========================================
   AUTENTICACIÓN
========================================= */

function abrirAuth(tipo = "login") {

    limpiarErroresAuth();


    if (tipo === "registro") {

        mostrarFormularioRegistro();

    } else {

        mostrarFormularioLogin();

    }


    modalAuth.classList.add("activo");

    document.body.style.overflow = "hidden";
}


function cerrarAuth() {

    modalAuth.classList.remove("activo");

    document.body.style.overflow = "";

    limpiarErroresAuth();
}


/* =========================================
   CAMBIAR LOGIN / REGISTRO
========================================= */

function mostrarFormularioLogin() {

    formRegistro.classList.remove("activo");

    formLogin.classList.add("activo");

    limpiarErroresAuth();
}


function mostrarFormularioRegistro() {

    formLogin.classList.remove("activo");

    formRegistro.classList.add("activo");

    limpiarErroresAuth();
}


/* =========================================
   EVENTOS AUTENTICACIÓN
========================================= */

btnLogin.addEventListener("click", event => {

    event.stopPropagation();

    const usuario = obtenerUsuarioSesion();


    if (!usuario) {

        abrirAuth("login");

        return;
    }


    menuCuenta.classList.toggle("activo");
});

btnCerrarSesion.addEventListener("click", () => {

    menuCuenta.classList.remove("activo");

    cerrarSesion();
});


btnMiColeccion.addEventListener("click", () => {

    menuCuenta.classList.remove("activo");

    mostrarAlertaNexus(
        "Mi colección",
        "Muy pronto podrás consultar aquí todo tu contenido favorito.",
        "♡"
    );
});


document.addEventListener("click", event => {

    if (
        !menuCuenta.contains(event.target) &&
        event.target !== btnLogin
    ) {

        menuCuenta.classList.remove("activo");
    }
});

btnCrearColeccion.addEventListener("click", () => {

    abrirAuth("registro");

});


mostrarRegistro.addEventListener("click", () => {

    mostrarFormularioRegistro();

});


mostrarLogin.addEventListener("click", () => {

    mostrarFormularioLogin();

});


authCerrar.addEventListener(
    "click",
    cerrarAuth
);


authOverlay.addEventListener(
    "click",
    cerrarAuth
);


/* =========================================
   VALIDACIONES
========================================= */

function correoValido(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);
}


function mostrarError(
    input,
    elementoError,
    mensaje
) {

    input.classList.add("input-error");

    elementoError.textContent = mensaje;
}


function limpiarError(
    input,
    elementoError
) {

    input.classList.remove("input-error");

    elementoError.textContent = "";
}


function limpiarErroresAuth() {

    limpiarError(
        loginCorreo,
        errorLoginCorreo
    );

    limpiarError(
        loginPassword,
        errorLoginPassword
    );

    limpiarError(
        registroNombre,
        errorRegistroNombre
    );

    limpiarError(
        registroCorreo,
        errorRegistroCorreo
    );

    limpiarError(
        registroPassword,
        errorRegistroPassword
    );

    limpiarError(
        registroConfirmar,
        errorRegistroConfirmar
    );
}

/* =========================================
   SESIÓN DEL USUARIO
========================================= */

function obtenerUsuarioSesion() {

    const usuarioGuardado =
        localStorage.getItem("nexusUsuario");

    if (!usuarioGuardado) {
        return null;
    }

    try {

        return JSON.parse(usuarioGuardado);

    } catch (error) {

        localStorage.removeItem("nexusUsuario");

        return null;
    }
}


function actualizarInterfazSesion() {

    const usuario = obtenerUsuarioSesion();

    if (!usuario) {

        btnLogin.textContent = "Iniciar sesión";
        btnLogin.classList.remove("sesion-activa");

        menuCuenta.classList.remove("activo");

        return;
    }


    btnLogin.textContent =
        `👤 ${usuario.nombre}`;

    btnLogin.classList.add("sesion-activa");


    menuCuentaNombre.textContent =
        usuario.nombre;

    menuCuentaRol.textContent =
        usuario.rol;


    const opcionesAdmin =
        document.querySelectorAll(".menu-admin");


    opcionesAdmin.forEach(opcion => {

        if (usuario.rol === "Admin") {

            opcion.classList.add("visible");

        } else {

            opcion.classList.remove("visible");
        }
    });
}


function cerrarSesion() {

    localStorage.removeItem("nexusUsuario");
    localStorage.removeItem("nexusToken");

    actualizarInterfazSesion();

    mostrarAlertaNexus(
        "Sesión cerrada",
        "Has cerrado sesión correctamente.",
        "✦"
    );
}
async function probarUsuariosAdmin() {

    const token =
        localStorage.getItem("nexusToken");

    try {

        const respuesta = await fetch(
            `${API_URL}/Usuarios`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );

        console.log(
            "Estado /Usuarios:",
            respuesta.status
        );

        if (!respuesta.ok) {

            console.log(
                "Acceso rechazado."
            );

            return;
        }

        const usuarios =
            await respuesta.json();

        console.log(
            "Usuarios registrados:",
            usuarios
        );

    } catch (error) {

        console.error(
            "Error consultando usuarios:",
            error
        );
    }
}
/* =========================================
   ADMINISTRAR USUARIOS
========================================= */

async function abrirAdministrarUsuarios() {

    const usuarioActual = obtenerUsuarioSesion();
    const token = localStorage.getItem("nexusToken");

    if (!usuarioActual || usuarioActual.rol !== "Admin") {

        mostrarAlertaNexus(
            "Acceso restringido",
            "Esta sección está disponible únicamente para administradores.",
            "!"
        );

        return;
    }

    menuCuenta.classList.remove("activo");

    modalUsuarios.classList.add("activo");

    document.body.style.overflow = "hidden";

    usuariosLista.innerHTML = `
        <p class="usuarios-cargando">
            Cargando usuarios...
        </p>
    `;

    try {

        const respuesta = await fetch(
            `${API_URL}/Usuarios`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );

        if (respuesta.status === 401) {

            cerrarAdministrarUsuarios();

            mostrarAlertaNexus(
                "Sesión no válida",
                "Tu sesión no es válida. Inicia sesión nuevamente.",
                "!"
            );

            return;
        }

        if (respuesta.status === 403) {

            cerrarAdministrarUsuarios();

            mostrarAlertaNexus(
                "Acceso restringido",
                "No tienes permisos para administrar usuarios.",
                "!"
            );

            return;
        }

        if (!respuesta.ok) {
            throw new Error(
                "No fue posible obtener los usuarios."
            );
        }

        const usuarios =
            await respuesta.json();

        mostrarUsuariosAdmin(
            usuarios,
            usuarioActual
        );

    } catch (error) {

        console.error(
            "Error cargando usuarios:",
            error
        );

        usuariosLista.innerHTML = `
            <p class="usuarios-vacio">
                No fue posible cargar los usuarios.
            </p>
        `;
    }
}


function mostrarUsuariosAdmin(
    usuarios,
    usuarioActual
) {

    usuariosLista.innerHTML = "";

    if (usuarios.length === 0) {

        usuariosLista.innerHTML = `
            <p class="usuarios-vacio">
                No hay usuarios registrados.
            </p>
        `;

        return;
    }

    usuarios.forEach(usuario => {

        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add(
            "usuario-admin-card"
        );

        const esUsuarioActual =
            usuario.idUsuario ===
            usuarioActual.idUsuario;

        const nuevoRol =
            usuario.rol === "Admin"
                ? "User"
                : "Admin";

        const textoBoton =
            usuario.rol === "Admin"
                ? "Hacer User"
                : "Hacer Admin";

        tarjeta.innerHTML = `
            <div class="usuario-admin-info">

                <p class="usuario-admin-nombre">
                    ${usuario.nombre}
                </p>

                <p class="usuario-admin-correo">
                    ${usuario.correo}
                </p>

            </div>

            <div class="usuario-admin-acciones">

                <span class="usuario-rol">
                    ${usuario.rol}
                </span>

                ${
                    esUsuarioActual
                        ? `
                            <span class="usuario-tu-cuenta">
                                Tu cuenta
                            </span>
                          `
                        : `
                            <button
                                type="button"
                                class="btn-cambiar-rol"
                                data-id="${usuario.idUsuario}"
                                data-rol="${nuevoRol}">
                                ${textoBoton}
                            </button>
                          `
                }

            </div>
        `;

        usuariosLista.appendChild(tarjeta);
    });
    const botonesCambiarRol =
    document.querySelectorAll(
        ".btn-cambiar-rol"
    );

botonesCambiarRol.forEach(boton => {

    boton.addEventListener(
        "click",
        async () => {

            const idUsuario =
                Number(boton.dataset.id);

            const nuevoRol =
                boton.dataset.rol;

            await cambiarRolUsuario(
                idUsuario,
                nuevoRol
            );
        }
    );
});
}
async function cambiarRolUsuario(
    idUsuario,
    nuevoRol
) {

    const token =
        localStorage.getItem("nexusToken");

    try {

        const respuesta = await fetch(
            `${API_URL}/Usuarios/${idUsuario}/rol`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    rol: nuevoRol
                })
            }
        );

        const datos =
            await respuesta.json();

        if (!respuesta.ok) {

            mostrarAlertaNexus(
                "No fue posible cambiar el rol",
                datos.mensaje ||
                "Ocurrió un problema al actualizar el usuario.",
                "!"
            );

            return;
        }

        mostrarAlertaNexus(
            "Rol actualizado",
            `${datos.usuario.nombre} ahora tiene el rol ${datos.usuario.rol}.`,
            "✦"
        );

        await abrirAdministrarUsuarios();

    } catch (error) {

        console.error(
            "Error cambiando rol:",
            error
        );

        mostrarAlertaNexus(
            "Error de conexión",
            "No fue posible actualizar el rol del usuario.",
            "!"
        );
    }
}

function cerrarAdministrarUsuarios() {

    modalUsuarios.classList.remove("activo");

    document.body.style.overflow = "";
}
btnAdministrarUsuarios.addEventListener(
    "click",
    abrirAdministrarUsuarios
);


usuariosCerrar.addEventListener(
    "click",
    cerrarAdministrarUsuarios
);


usuariosOverlay.addEventListener(
    "click",
    cerrarAdministrarUsuarios
);
/* =========================================
   VALIDAR LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        limpiarErroresAuth();

        const correo =
            loginCorreo.value.trim();

        const password =
            loginPassword.value;

        let formularioValido = true;


        /* =========================================
           VALIDAR CORREO
        ========================================= */

        if (correo === "") {

            mostrarError(
                loginCorreo,
                errorLoginCorreo,
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;

        } else if (!correoValido(correo)) {

            mostrarError(
                loginCorreo,
                errorLoginCorreo,
                "Ingresa un correo electrónico válido."
            );

            formularioValido = false;
        }


        /* =========================================
           VALIDAR CONTRASEÑA
        ========================================= */

        if (password === "") {

            mostrarError(
                loginPassword,
                errorLoginPassword,
                "Ingresa tu contraseña."
            );

            formularioValido = false;
        }


        if (!formularioValido) {
            return;
        }


        /* =========================================
           CONECTAR CON NEXUS API
        ========================================= */

        try {

            const respuesta = await fetch(
                `${API_URL}/Auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        correo: correo,
                        password: password
                    })
                }
            );


            const datos = await respuesta.json();


            /* =========================================
               LOGIN INCORRECTO
            ========================================= */

            if (!respuesta.ok) {

                if (respuesta.status === 401) {

                    mostrarError(
                        loginPassword,
                        errorLoginPassword,
                        datos.mensaje ||
                        "Correo o contraseña incorrectos."
                    );

                    return;
                }


                mostrarAlertaNexus(
                    "No fue posible iniciar sesión",
                    datos.mensaje ||
                    "Ocurrió un problema al iniciar sesión.",
                    "!"
                );

                return;
            }


            /* =========================================
               LOGIN CORRECTO
            ========================================= */

            localStorage.setItem(
                "nexusUsuario",
                JSON.stringify(datos.usuario)
            );

localStorage.setItem(
    "nexusToken",
    datos.token
);

            loginForm.reset();

            cerrarAuth();

            actualizarInterfazSesion();


            mostrarAlertaNexus(
                "¡Bienvenido a NEXUS!",
                `Hola ${datos.usuario.nombre}. Has iniciado sesión correctamente.`,
                "✦"
            );


            console.log(
                "Usuario conectado:",
                datos.usuario
            );


        } catch (error) {

            console.error(
                "Error al iniciar sesión:",
                error
            );


            mostrarAlertaNexus(
                "Error de conexión",
                "No fue posible conectar con NEXUS API.",
                "!"
            );
        }
    }
);


/* =========================================
   VALIDAR REGISTRO
========================================= */

registroForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        limpiarErroresAuth();

        const nombre = registroNombre.value.trim();
        const correo = registroCorreo.value.trim();
        const password = registroPassword.value;
        const confirmar = registroConfirmar.value;

        let formularioValido = true;

        if (nombre === "") {

            mostrarError(
                registroNombre,
                errorRegistroNombre,
                "Ingresa tu nombre."
            );

            formularioValido = false;

        } else if (nombre.length < 3) {

            mostrarError(
                registroNombre,
                errorRegistroNombre,
                "El nombre debe tener al menos 3 caracteres."
            );

            formularioValido = false;
        }

        if (correo === "") {

            mostrarError(
                registroCorreo,
                errorRegistroCorreo,
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;

        } else if (!correoValido(correo)) {

            mostrarError(
                registroCorreo,
                errorRegistroCorreo,
                "Ingresa un correo electrónico válido."
            );

            formularioValido = false;
        }

        if (password === "") {

            mostrarError(
                registroPassword,
                errorRegistroPassword,
                "Ingresa una contraseña."
            );

            formularioValido = false;

        } else if (password.length < 6) {

            mostrarError(
                registroPassword,
                errorRegistroPassword,
                "La contraseña debe tener mínimo 6 caracteres."
            );

            formularioValido = false;
        }

        if (confirmar === "") {

            mostrarError(
                registroConfirmar,
                errorRegistroConfirmar,
                "Confirma tu contraseña."
            );

            formularioValido = false;

        } else if (password !== confirmar) {

            mostrarError(
                registroConfirmar,
                errorRegistroConfirmar,
                "Las contraseñas no coinciden."
            );

            formularioValido = false;
        }

        if (!formularioValido) {
            return;
        }

        try {

            const respuesta = await fetch(
                `${API_URL}/Auth/registro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nombre: nombre,
                        correo: correo,
                        password: password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                if (respuesta.status === 409) {

                    mostrarError(
                        registroCorreo,
                        errorRegistroCorreo,
                        datos.mensaje
                    );

                    return;
                }

mostrarAlertaNexus(
    "No fue posible registrarte",
    datos.mensaje ||
    "No fue posible completar el registro.",
    "!"
);

                return;
            }

mostrarAlertaNexus(
    "¡Bienvenido a NEXUS!",
    "Tu cuenta fue creada correctamente.",
    "✦"
);
            registroForm.reset();

            mostrarFormularioLogin();

        } catch (error) {

            console.error(
                "Error al registrar usuario:",
                error
            );

           mostrarAlertaNexus(
    "Error de conexión",
    "No fue posible conectar con NEXUS API.",
    "!"
);
        }
    }
);

/* =========================================
   QUITAR ERROR AL ESCRIBIR
========================================= */

loginCorreo.addEventListener("input", () => {

    limpiarError(
        loginCorreo,
        errorLoginCorreo
    );

});


loginPassword.addEventListener("input", () => {

    limpiarError(
        loginPassword,
        errorLoginPassword
    );

});


registroNombre.addEventListener("input", () => {

    limpiarError(
        registroNombre,
        errorRegistroNombre
    );

});


registroCorreo.addEventListener("input", () => {

    limpiarError(
        registroCorreo,
        errorRegistroCorreo
    );

});


registroPassword.addEventListener("input", () => {

    limpiarError(
        registroPassword,
        errorRegistroPassword
    );

});


registroConfirmar.addEventListener("input", () => {

    limpiarError(
        registroConfirmar,
        errorRegistroConfirmar
    );

});


/* =========================================
   CERRAR MODALES CON ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        if (
            modalDetalle.classList.contains("activo")
        ) {

            cerrarDetalle();

        }


        if (
            modalAuth.classList.contains("activo")
        ) {

            cerrarAuth();

        }

    }
);


/* =========================================
   CARGAR MÁS
========================================= */

btnCargarMas.addEventListener(
    "click",
    () => {

        mostrarItems(items);

        actualizarFiltroActivo("Todos");

    }
);


/* =========================================
   CARGA INICIAL
========================================= */

actualizarInterfazSesion();

cargarItemsDesdeAPI();