import React, { useState } from 'react';
import Modal from 'react-modal';
import './CategoryModal.css';

Modal.setAppElement('#root');

export default function CategoryModal({ isOpen, onRequestClose, addCategory, categories = [] }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        title: '',
        description: '',
        color: '#007acc'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            addCategory(selectedCategory.id);
        }
        onRequestClose();
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const categoryId = addCategory(newCategory);
        if (categoryId) {
            addCategory(categoryId);
        }
        setShowCreateForm(false);
        onRequestClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value
        });
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            {!showCreateForm ? (
                <>
                    <h2>Ajouter une catégorie</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Catégorie existante:
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
                        <div className="button-group">
                            <button type="submit" disabled={!selectedCategory}>Ajouter</button>
                            <button type="button" onClick={() => setShowCreateForm(true)} className="create-button">Créer nouvelle catégorie</button>
                            <button type="button" onClick={onRequestClose} className="cancel-button">Annuler</button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h2>Créer une nouvelle catégorie</h2>
                    <form onSubmit={handleCreateSubmit}>
                        <label>
                            Titre:
                            <input
                                type="text"
                                name="title"
                                value={newCategory.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={newCategory.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Couleur:
                            <div className="color-picker-container">
                                <input
                                    type="color"
                                    name="color"
                                    value={newCategory.color}
                                    onChange={handleInputChange}
                                    className="color-picker"
                                />
                                <div className="color-preview" style={{ backgroundColor: newCategory.color }}></div>
                            </div>
                        </label>
                        <div className="button-group">
                            <button type="submit">Créer</button>
                            <button type="button" onClick={() => setShowCreateForm(false)} className="back-button">Retour</button>
                            <button type="button" onClick={onRequestClose} className="cancel-button">Annuler</button>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
}