// Conexiones con las APIs de usuarios

const LISTA_USUARIOS_URL = "http://127.0.0.1:8000/usuarios/lista-usuarios/";

const CREAR_USUARIO_URL = "http://127.0.0.1:8000/usuarios/crear-usuario/";

const VALIDAR_USUARIO_URL = "http://127.0.0.1:8000/usuarios/login/";

const DETALLES_USUARIO_URL = "http://127.0.0.1:8000/usuarios/detalles-usuario/";

export const listUsuarios = async () => {
    return await fetch(LISTA_USUARIOS_URL);
};

export const registrarUsuario = async (nuevoUsuario) => {
    return await fetch(CREAR_USUARIO_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: String(nuevoUsuario.nombre).trim(),
            apellido: String(nuevoUsuario.apellido).trim(),
            user_name: String(nuevoUsuario.user_name).trim(),
            contrasenia: String(nuevoUsuario.contrasenia).trim(),
        }),
    });
};

export const validarUsuario = async (usuario) => {
    return await fetch(
        `${VALIDAR_USUARIO_URL}${usuario.user_name}/${usuario.contrasenia}/`
    );
};

export const getUsuario = async (usuarioId) => {
    return await fetch(`${DETALLES_USUARIO_URL}${usuarioId}/`);
};

export const actualizarUsuario = async (usuarioId, usuario) => {
    return await fetch(`${DETALLES_USUARIO_URL}${usuarioId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: String(usuario.nombre).trim(),
            apellido: String(usuario.apellido).trim(),
            user_name: String(usuario.user_name).trim(),
            contrasenia: String(usuario.contrasenia).trim(),
        }),
    });
};

export const EliminarUsuario = async (usuarioId) => {
    return await fetch(`${DETALLES_USUARIO_URL}${usuarioId}/`, {
        method: "DELETE",
    });
};
