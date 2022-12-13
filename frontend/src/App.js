// react-router-dom imports
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

// Boostrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Component imports
import UsuarioList from './components/usuarios/UsuariosList';
import UsuarioRegisterForm from './components/usuarios/UsuarioRegisterForm';
import UsuarioLogin from './components/usuarios/UsuarioLogin';
import NotasList from './components/notas/NotasList';
import AgregarNota from './components/notas/AgregarNota';
import NavbarLogin from './components/navbar/Navbar_login';



function App() {
  return (
      <BrowserRouter>
        <div className='container-fluid'>
          <Routes>
            <Route exact path='/' element={<UsuarioList />} />
            <Route exact path='/Registrar-usuario' element={<UsuarioRegisterForm />}/>
            <Route exact path='/login-usuario' element={<UsuarioLogin />} />
            <Route exact path='/notas/:usuario' element={<NotasList />} />
            <Route exact path='/agregar-nota/:usuario' element={<AgregarNota />} />
            <Route exact path='/actualizar-nota/:id' element={<AgregarNota /> } />
            <Route exact path='/nav_login/:id' element={<NavbarLogin /> } />
            <Route exact path='/editar-usuario/:id' element={<UsuarioRegisterForm /> } />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
