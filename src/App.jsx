import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import Login from './pages/Login';
import NoteDetail from './pages/NoteDetail';
import Notes from './pages/Notes';
import Register from './pages/Register';

function App() {
  return (
    <div id="main-container">
      <header id="nav-menu">
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/notes">Notas</Link></li>
            <li><Link to="/create-note">Crear Notas</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Bienvenido a tu App de Notas</h1>
      <p>Por favor logueate o regístrate para poder editar y crear tus notas.</p>
    </div>
  );
}

export default App;
