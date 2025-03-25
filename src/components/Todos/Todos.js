import React, { useState } from 'react';
import './Todos.css';

export default function Todos({ taches, updateTask, deleteTask }) {
    const [viewMode, setViewMode] = useState({});

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
                                value={task.date_echeance}
                                onChange={(e) => handleTaskChange(task.id, 'date_echeance', e.target.value)}
                            />
                            <button onClick={() => toggleViewMode(task.id)}>
                                {viewMode[task.id] ? '▲' : '▼'}
                            </button>
                        </div>
                        <div className="todo-categories">
                            {(task.categories || []).slice(0, viewMode[task.id] ? (task.categories || []).length : 2).map((category, index) => (
                                <span key={index} className="todo-category" onClick={() => console.log(`Filter by ${category}`)}>
                                    {category}
                                </span>
                            ))}
                        </div>
                        {viewMode[task.id] && (
                            <textarea
                                className="todo-description"
                                value={task.description}
                                onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                            />
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
        </div>
    );
}