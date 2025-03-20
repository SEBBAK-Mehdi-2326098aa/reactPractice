import React, { useState } from 'react';
import './styles.css';
import todo from './to-do-list.json';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Todos from './components/Todos/Todos';
import Filter from './components/Filter/Filter';

export default function App() {
    const [tasks, setTasks] = useState(todo.taches || []);
    const [filter, setFilter] = useState('all');

    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: 'Nouvelle tâche',
            description: '',
            date_creation: new Date().toISOString().split('T')[0],
            date_echeance: '',
            done: false,
            urgent: false,
            contacts: []
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.done;
        if (filter === 'pending') return !task.done;
        if (filter === 'urgent') return task.urgent;
        return true;
    });

    return (
        <>
            <Header taches={tasks} />
            <Filter setFilter={setFilter} />
            <Todos taches={filteredTasks} updateTask={updateTask} />
            <Footer addTask={addTask} />
        </>
    );
}
