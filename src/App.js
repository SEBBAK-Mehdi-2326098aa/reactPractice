import React, { useState } from 'react';
import './styles.css';
import todo from './to-do-list.json';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Todos from './components/Todos/Todos.js';

export default function App() {
    const [tasks, setTasks] = useState(todo.taches || []);

    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: 'Nouvelle tâche',
            description: '',
            date_creation: new Date().toISOString(),
            date_echeance: '',
            done: false,
            urgent: false,
            contacts: []
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <>
            <Header taches={tasks} />
            <Todos taches={tasks} />
            <Footer addTask={addTask} />
        </>
    );
}