import React from 'react';
import './Todos.css';

export default function Todos({ taches }) {
    return (
        <div className="todos-container">
            <ul>
                {taches.map((task, index) => (
                    <li key={index} className="todo-item">
                        <h3 className="todo-title">{task.title}</h3>
                        <p className="todo-description">{task.description}</p>
                        <p className="todo-date">📅 Créé le: {task.date_creation}</p>
                        <p className="todo-deadline">⏳ À rendre avant: {task.date_echeance}</p>
                        <p className={`todo-status ${task.done ? 'completed' : 'pending'}`}>✅ Statut: {task.done ? 'Terminé' : 'En attente'}</p>
                        <p className={`todo-urgent ${task.urgent ? 'urgent' : ''}`}>⚠️ Urgent: {task.urgent ? 'Oui' : 'Non'}</p>
                        <p className="todo-contacts">📞 Contacts: {task.contacts.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
