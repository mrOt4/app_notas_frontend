import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../config';

const Notes = () => {
    const [notes, setNotes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`${API_URL}/notes`, {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                setNotes(res.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
                setError('Failed to fetch notes');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Mis Notas</h2>
            <ul>
                {notes.length > 0 ? (
                    notes.map(note => (
                        <li key={note.id}>
                            <Link to={`/notes/${note.id}`}>{note.title}</Link>
                        </li>
                    ))
                ) : (
                    <p>No hay notas disponibles</p>
                )}
            </ul>
            <Link to="/create-note">Crear Nota</Link>
        </div>
    );
};

export default Notes;
