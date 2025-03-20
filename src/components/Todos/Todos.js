import React from 'react';
import './Todos.css';

export default function Todos({ taches, updateTask }) {
    const handleTaskChange = (id, field, value) => {
        const updatedTask = taches.find(task => task.id === id);
        updatedTask[field] = value;
        updateTask({ ...updatedTask });
    };

    return (
        <div className="todos-container">
            <ul>
                {taches.map((task) => (
                    <li key={task.id} className="todo-item">
                        <input
                            type="text"
                            className="todo-title"
                            value={task.title}
                            onChange={(e) => handleTaskChange(task.id, 'title', e.target.value)}
                        />
                        <textarea
                            className="todo-description"
                            value={task.description}
                            onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                        />
                        <input
                            type="date"
                            value={task.date_echeance}
                            onChange={(e) => handleTaskChange(task.id, 'date_echeance', e.target.value)}
                        />
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
                    </li>
                ))}
            </ul>
        </div>
    );
}
