import React, { useState } from 'react';
import './Footer.css';
import { CgAdd } from "react-icons/cg";
import TaskCategoryModal from '../TaskCategoryModal/TaskCategoryModal';

export default function Footer({ addTask, tasks, categories, relations }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const exportData = () => {
        const data = {
            taches: tasks,
            categories: categories,
            relations: relations
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "tasks.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div id="footer">
            <button onClick={() => setIsModalOpen(true)} id="add-task-button">
                Ajouter une tâche <CgAdd fontSize="20px" />
            </button>
            <button onClick={exportData} id="export-tasks-button">
                Exporter les tâches
            </button>
            <TaskCategoryModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                addTask={addTask}
            />
        </div>
    );
}