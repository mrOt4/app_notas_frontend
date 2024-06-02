import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API_URL from '../config';

const NoteDetail = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }
                const res = await axios.get(`${API_URL}/notes/${id}`, {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                setNote(res.data);
                setCategoryId(res.data.category_id);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };
        fetchNote();
    }, [id]);

    useEffect(() => {  
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${API_URL}/categories/${categoryId}`);

                setCategoryName(res.data.name);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, [categoryId]);

    
    return note ? (
        <div>
            <h2>{categoryName}</h2>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <Link to={`/edit-note/${id}`}>Editar</Link>
        </div>
    ) : (
        <p>Cargando...</p>
    );
};

export default NoteDetail;
