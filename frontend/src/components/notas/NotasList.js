import React, { useEffect, useState } from "react";

import NotasItem from "./NotasItem";
import * as NotasServer from "./NotasServer";

import { useParams } from "react-router-dom";

import NavbarLogin from "../navbar/Navbar_login";

const NotasList = () => {
    const [notas, setNotas] = useState([]);

    const params = useParams();
    // console.log(params);

    const listNotas = async () => {
        try {
            const res = await NotasServer.NotasList(params.usuario);
            const data = await res.json();

            setNotas(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listNotas();
    }, []);

    return (
        <div>
            <NavbarLogin usuario={params.usuario} />
            <div className="row m-4">
                {
                    notas.length > 0 ? (
                        notas.map((nota) => (
                            <NotasItem
                                key={nota.id}
                                nota={nota}
                                notasList={listNotas}
                            />
                        ))
                    ) : (
                        console.log("no hay notas")
                    )
                }
            </div>
        </div>
    );
};

export default NotasList;
