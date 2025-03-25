import React, { useState } from 'react';
import Modal from 'react-modal';
import './TaskCategoryModal.css';

Modal.setAppElement('#root');

export default function TaskCategoryModal({ isOpen, onRequestClose, addTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description });
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            <h2>Créer une nouvelle tâche </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <button type="submit">Ajouter</button>
                <button type="button" onClick={onRequestClose}>Supprimer</button>
            </form>
        </Modal>
    );
}