import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../config';

const EditNote = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const res = await axios.get(`${API_URL}/notes/${id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            const note = res.data;
            setTitle(note.title);
            setContent(note.content);
            setCategoryId(note.category_id);
        };

        const fetchCategories = async () => {
            const res = await axios.get(`${API_URL}/categories`);
            setCategories(res.data);
            console.log(categories);
        };

        fetchNote();
        fetchCategories();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', { title, content, category_id });
    
        try {
            const response = await axios.put(
                `${API_URL}/notes/${id}`,
                { title, content, category_id },
                { headers: { Authorization: localStorage.getItem('token') } }
            );
    
            console.log('Response:', response);
            navigate('/notes');
        } catch (error) {
            console.error('Error updating note:', error.response ? error.response.data : error.message);
            alert('Failed to update note');
        }
    };

    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(
                `${API_URL}/notes/${id}`,
                { headers: { Authorization: localStorage.getItem('token') } }
            );
    
            console.log('Response:', response);
            navigate('/notes');
        } catch (error) {
            console.error('Error deleting note:', error.response ? error.response.data : error.message);
            alert('Failed to delete note');
        }
    };

    return (
        <div>
            <h2>Editar Nota</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <select value={category_id} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit">Guardar cambios</button>
            </form>
            <button onClick={handleDelete}>Borrar nota</button>
        </div>
    );
};

export default EditNote;
