// React imports
import { useEffect, useState } from "react";

// react-router-dom imports
import { useNavigate, useParams } from "react-router-dom";

// Component imports
import * as UsuarioServer from "./UsuarioServer";
import Navbar from "../navbar/Navbar";
import NavbarLogin from "../navbar/Navbar_login";


// Componente que crea un nuevo usuario, modifica uno existente o lo elimina
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
            // Verifica si debe crear un nuevo usuario o modificar uno existente
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

    // Handled que elimina un usuario cuando se aprieta en el boton eliminar usuario
    const handledDelete = async (e) => {
        e.preventDefault();

        await UsuarioServer.EliminarUsuario(params.id);
        history("/");
    };

    // Obtiene un usuario existente y lo carga en usuario con setUsuario
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
            {/* Verifica cual Navbar se debe cargar */}
            {params.id ? <NavbarLogin usuario={params.id} /> : <Navbar />}

            {/* Formulario */}
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
                    {/* Verifica que botones debe cargar */}
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
