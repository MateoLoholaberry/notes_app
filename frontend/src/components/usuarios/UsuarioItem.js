import React from "react";

const UsuarioItem =({usuario})=> {
    // console.log(usuario);

    return (
        <div className="col-md-8">
            <div className="m-3 card card-body">
                <h3 className="card-title">{usuario.nombre} {usuario.apellido}</h3>
                <p><b>user name:</b> {usuario.user_name}</p>
            </div>
        </div>
    );
};

export default UsuarioItem;