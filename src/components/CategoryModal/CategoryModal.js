import React, { useState } from 'react';
import Modal from 'react-modal';
import './CategoryModal.css';

Modal.setAppElement('#root');

export default function CategoryModal({ isOpen, onRequestClose, addCategory, categories = [] }) {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            addCategory(selectedCategory.id);
        }
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            <h2>Ajouter une catégorie existante</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Catégorie:
                    <select onChange={(e) => setSelectedCategory(categories.find(cat => cat.id === parseInt(e.target.value)))}>
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </label>
                {selectedCategory && (
                    <div className="selected-category" style={{ backgroundColor: selectedCategory.color }}>
                        {selectedCategory.title}
                    </div>
                )}
                <button type="submit">Ajouter</button>
                <button type="button" onClick={onRequestClose}>Annuler</button>
            </form>
        </Modal>
    );
}