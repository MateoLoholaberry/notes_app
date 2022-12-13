import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validarUsuario } from "./UsuarioServer";
import Navbar from "../navbar/Navbar";

const UsuarioLogin = () => {
    const history = useNavigate();

    const initialState = {
        user_name: "",
        contrasenia: "",
    };

    const [usuario, setUsuario] = useState(initialState);

    const handledInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handledSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await validarUsuario(usuario);
            const data = await res.json();
            // console.log(data);
            if (data.id) {
                history(`/notas/${data.id}/`);
            } else {
                alert('Acesso denegado');
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handledSubmit}>
                <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">
                        User Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="user_name"
                        placeholder="Ingrese el user name"
                        name="user_name"
                        required
                        value={usuario.user_name}
                        onChange={handledInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contrasenia" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="contrasenia"
                        placeholder="Ingrese una contraseña"
                        name="contrasenia"
                        required
                        value={usuario.contrasenia}
                        onChange={handledInputChange}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UsuarioLogin;
