import { useEffect, useState } from "react";
// import { registrarUsuario } from "./UsuarioServer";
import * as UsuarioServer from "./UsuarioServer";

import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import NavbarLogin from "../navbar/Navbar_login";

const UsuarioRegisterForm = () => {
    const history = useNavigate();

    const params = useParams();

    const initialState = {
        nombre: "",
        apellido: "",
        user_name: "",
        contrasenia: "",
    };

    const [usuario, setUsuario] = useState(initialState);

    const HandledInputChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)

        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handledSubmit = async (e) => {
        e.preventDefault();
        // console.log(usuario);
        try {
            let res;
            if (!params.id) {
                res = await UsuarioServer.registrarUsuario(usuario);

                const data = await res.json();
                if (data.status === "Ok") {
                    setUsuario(initialState);
                }

                history("/");
            } else {
                await UsuarioServer.actualizarUsuario(params.id, usuario);
                history(`/notas/${params.id}/`);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handledDelete = async (e) => {
        e.preventDefault();
        await UsuarioServer.EliminarUsuario(params.id);
        history("/");
    }

    const getUsuario = async (usuarioId) => {
        try {
            const res = await UsuarioServer.getUsuario(usuarioId);
            const data = await res.json();

            const { nombre, apellido, user_name, contrasenia } = data;
            setUsuario({ nombre, apellido, user_name, contrasenia });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getUsuario(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {params.id ? <NavbarLogin usuario={params.id} /> : <Navbar />}

            <form onSubmit={handledSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Ingrese el nombre"
                        name="nombre"
                        required
                        value={usuario.nombre}
                        onChange={HandledInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        placeholder="Ingrese el apellido"
                        name="apellido"
                        required
                        value={usuario.apellido}
                        onChange={HandledInputChange}
                    />
                </div>
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
                        onChange={HandledInputChange}
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
                        onChange={HandledInputChange}
                    />
                </div>

                <div className="col-12">
                    {params.id ? (
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>

                            <button
                                onClick={handledDelete}
                                className="btn btn-danger mx-5"
                            >
                                Eliminar usuario
                            </button>
                        </div>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Registrar usuario
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UsuarioRegisterForm;
