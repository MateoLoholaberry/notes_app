import { Link } from "react-router-dom";

import { useParams, useNavigate } from "react-router-dom";

const NavbarLogin = ({usuario})=>{
    // const params = useParams();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand fw-bold">
                Notes App
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/notas/${usuario}`} >
                             Ver notas
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={`/agregar-nota/${usuario}`}>
                             Agregar nota
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={`/editar-usuario/${usuario}`}>
                             Editar usuario
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={`/`}>
                             Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}


export default NavbarLogin;