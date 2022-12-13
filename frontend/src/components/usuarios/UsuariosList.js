import React, { useEffect, useState } from "react";

// Component imports
import UsuarioItem from "./UsuarioItem";
import Navbar from "../navbar/Navbar";

import * as UsuarioServer from "./UsuarioServer";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);

    const listUsuarios = async () => {
        try {
            const res = await UsuarioServer.listUsuarios();
            const data = await res.json();
            // console.log(data);
            setUsuarios(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listUsuarios();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="row justify-content-center">
                {usuarios.map((usuario) => (
                    <UsuarioItem key={usuario.id} usuario={usuario} />
                ))}
            </div>
        </div>
    );
};

export default UsuarioList;
