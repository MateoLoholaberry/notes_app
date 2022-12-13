// React imports
import { useEffect, useState } from "react";

// react-router-dom imports
import { useNavigate, useParams } from "react-router-dom";

// component imports
import * as NotasServer from "./NotasServer";
import NavbarLogin from "../navbar/Navbar_login";

// Componente para agregar una nota nueva o editar una existente
const AgregarNota = () => {
    const history = useNavigate();
    const params = useParams();

    // console.log(params);

    const initialState = {
        titulo: "",
        contenido: "",
        fecha_creacion: "",
        usuario: params.usuario,
    };

    const [nota, setNota] = useState(initialState);

    const HandledInputChange = (e) => {
        setNota({ ...nota, [e.target.name]: e.target.value });
    };

    const handledSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;

            // Verifica si es una nota nueva o una existente
            if (!params.id) {
                res = await NotasServer.AgregarNota(nota);
                // console.log(nota)
                // const data = await res.json();
                // console.log(data);

                setNota(initialState);
            } else {
                // console.log(nota)
                await NotasServer.ActualizarNota(params.id, nota);
            }
            history(`/notas/${nota.usuario}`);
        } catch (error) {
            console.log(error);
        }
    };

    // Obtiene la nota existente y la carga en nota con setNota
    const getNota = async (notaId) => {
        try {
            const res = await NotasServer.getNota(notaId);
            const data = await res.json();
            // console.log(data);
            const { titulo, fecha_creacion, contenido, usuario } = data;
            setNota({ titulo, fecha_creacion, contenido, usuario });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getNota(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavbarLogin usuario={nota.usuario} />

            <form onSubmit={handledSubmit} autoComplete="off">
                <div className="mb-3 mt-3">
                    <label htmlFor="titulo" className="form-label">
                        Titulo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        placeholder="Ingrese el titulo de la nota"
                        name="titulo"
                        required
                        value={nota.titulo}
                        onChange={HandledInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_creacion" className="form-label">
                        fecha de creacion
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_creacion"
                        name="fecha_creacion"
                        required
                        value={nota.fecha_creacion}
                        onChange={HandledInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contenido" className="form-label">
                        Contenido
                    </label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="contenido"
                        placeholder="Ingrese su nota"
                        name="contenido"
                        rows={6}
                        required
                        value={nota.contenido}
                        onChange={HandledInputChange}
                    ></textarea>
                </div>

                <div className="col-12">
                    {params.id ? (
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Añandir nota
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AgregarNota;
