import React from "react";

import * as NotasServer from "./NotasServer"

import { useNavigate } from "react-router-dom";

const NotasItem = ({nota, notasList})=> {
    // console.log(nota);

    const history = useNavigate();

    const handledDelete = async (notaId) => {
        // console.log(notaId);

        await NotasServer.DeleteNota(notaId);
        notasList();
    }

    return (
        <div className="col-md-4 mb-4">
            <div className="card card-body">
                <h3 className="card-title">{nota.titulo}</h3>
                <p>Fecha de creación: {nota.fecha_creacion}</p>
                <p>{nota.contenido}</p>
                <button onClick={()=>history(`/actualizar-nota/${nota.id}/`)} className="btn btn-primary">Editar</button>
                <button onClick={()=> nota.id && handledDelete(nota.id)} className="btn btn-danger my-2">Borrar</button>
            </div>
        </div>
    );
};

export default NotasItem;