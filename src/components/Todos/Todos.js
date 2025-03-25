import React, { useState } from 'react';
import './Todos.css';
import CategoryModal from "../CategoryModal/CategoryModal";

export default function Todos({ taches, updateTask, deleteTask, categories = [], relations = [], addCategoryToTask }) {
    const [viewMode, setViewMode] = useState({});
    const [selectedTask, setSelectedTask] = useState(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const handleTaskChange = (id, field, value) => {
        const updatedTask = taches.find(task => task.id === id);
        updatedTask[field] = value;
        updateTask({ ...updatedTask });
    };

    const toggleViewMode = (id) => {
        setViewMode(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const isTaskExpired = (date) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(date) < oneWeekAgo;
    };

    const filteredTasks = taches.filter(task => !isTaskExpired(task.date_echeance));

    const formatDate = (date) => {
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        return isNaN(parsedDate) ? '' : parsedDate.toISOString().split('T')[0];
    };

    const getCategories = (taskId) => {
        return relations
            .filter(rel => rel.tache === taskId)
            .map(rel => categories.find(cat => cat.id === rel.categorie));
    };

    const handleAddCategory = (taskId) => {
        setSelectedTask(taskId);
        setIsCategoryModalOpen(true);
    };

    const addCategoryToTaskHandler = (categoryId) => {
        addCategoryToTask(selectedTask, categoryId);
        setIsCategoryModalOpen(false);
    };

    return (
        <div className="todos-container">
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id} className="todo-item">
                        <div className="todo-header">
                            <input
                                type="text"
                                className="todo-title"
                                value={task.title}
                                onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                            />
                            <input
                                type="date"
                                value={formatDate(task.date_echeance)}
                                onChange={(e) => handleTaskChange(task.id, 'date_echeance', e.target.value)}
                            />
                            <button onClick={() => toggleViewMode(task.id)}>
                                {viewMode[task.id] ? '▲' : '▼'}
                            </button>
                        </div>
                        {viewMode[task.id] && (
                            <>
                                <div className="todo-categories">
                                    {getCategories(task.id).map((category, index) => (
                                        <span key={index} className="todo-category" style={{ backgroundColor: category.color }}>
                                            {category.title}
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    className="todo-description"
                                    value={task.description}
                                    onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                                />
                                <button onClick={() => handleAddCategory(task.id)}>Ajouter une catégorie</button>
                            </>
                        )}
                        <div className="todo-actions">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={(e) => handleTaskChange(task.id, 'done', e.target.checked)}
                                />
                                Terminée
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.urgent}
                                    onChange={(e) => handleTaskChange(task.id, 'urgent', e.target.checked)}
                                />
                                Urgent
                            </label>
                            <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isCategoryModalOpen && (
                <CategoryModal
                    isOpen={isCategoryModalOpen}
                    onRequestClose={() => setIsCategoryModalOpen(false)}
                    addCategory={addCategoryToTaskHandler}
                    categories={categories}
                />
            )}
        </div>
    );
}