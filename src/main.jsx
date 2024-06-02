import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import CreateNote from './pages/CreateNote.jsx';
import EditNote from './pages/EditNote.jsx';
import Login from './pages/Login.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import Notes from './pages/Notes.jsx';
import Register from './pages/Register.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
