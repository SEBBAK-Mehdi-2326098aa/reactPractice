import React from 'react';
import './header.css';

export default function Header({ taches, openCategoryModal }) {
    const completedTasks = taches.filter(task => task.done).length;
    const totalTasks = taches.length;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Liste de tâches</h1>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    <p>{completedTasks} sur {totalTasks} tâches terminées ({completionPercentage}%)</p>
                </div>
            </div>
            <button className="category-button" onClick={openCategoryModal}>
                Gérer les catégories
            </button>
        </header>
    );
}