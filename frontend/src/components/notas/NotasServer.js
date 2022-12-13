// Conexiones con las APIs de notas

const NOTAS_LIST_URL = "http://127.0.0.1:8000/notas/ver-notas/";

const AGREGAR_NOTA_URL = "http://127.0.0.1:8000/notas/crear-nota/";

const DETALLES_NOTA_URL = "http://127.0.0.1:8000/notas/detalles-nota/";

export const NotasList = async (usuario) => {
    return await fetch(`${NOTAS_LIST_URL}${usuario}/`);
};

export const getNota = async (notaId) => {
    return await fetch(`${DETALLES_NOTA_URL}${notaId}/`);
};

export const AgregarNota = async (nuevaNota) => {
    return await fetch(AGREGAR_NOTA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            titulo: String(nuevaNota.titulo).trim(),
            fecha_creacion: String(nuevaNota.fecha_creacion).trim(),
            contenido: String(nuevaNota.contenido).trim(),
            usuario: String(nuevaNota.usuario).trim(),
        }),
    });
};

export const ActualizarNota = async (notaId, notaActualizada) => {
    return await fetch(`${DETALLES_NOTA_URL}${notaId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            titulo: String(notaActualizada.titulo).trim(),
            fecha_creacion: String(notaActualizada.fecha_creacion).trim(),
            contenido: String(notaActualizada.contenido).trim(),
            usuario: String(notaActualizada.usuario).trim(),
        }),
    });
};

export const DeleteNota = async (notaId) => {
    return await fetch(`${DETALLES_NOTA_URL}${notaId}/`, {
        method: "DELETE",
    });
};
