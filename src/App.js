import React, { useState, useEffect } from 'react';
import './styles.css';
import todo from './to-do-list.json';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Todos from './components/Todos/Todos';
import Filter from './components/Filter/Filter';
import InitialModal from './components/InitialModal/InitialModal';
import CategoryModal from './components/CategoryModal/CategoryModal';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [relations, setRelations] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isInitialModalOpen, setIsInitialModalOpen] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    useEffect(() => {
        setTasks(Array.isArray(todo.taches) ? todo.taches.map(task => ({ ...task, categories: task.categories || [] })) : []);
        setCategories(Array.isArray(todo.categories) ? todo.categories : []);
        setRelations(Array.isArray(todo.relations) ? todo.relations : []);
    }, []);

    const addTask = (newTask) => {
        const task = {
            id: tasks.length + 1,
            title: newTask.title || 'Nouvelle tâche',
            description: newTask.description || '',
            date_creation: new Date().toISOString().split('T')[0],
            date_echeance: '',
            done: false,
            urgent: false,
            contacts: [],
            categories: newTask.categories || []
        };
        setTasks([...tasks, task]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const addCategory = (newCategory) => {
        const category = {
            id: categories.length + 1,
            ...newCategory
        };
        setCategories([...categories, category]);
    };

const addCategoryToTask = (taskId, categoryId) => {
    // Add to task's categories array
    setTasks(tasks.map(task => {
        if (task.id === taskId) {
            const updatedCategories = [...(task.categories || [])];
            if (!updatedCategories.includes(categoryId)) {
                updatedCategories.push(categoryId);
                task.categories = updatedCategories;
            }
        }
        return task;
    }));

    // Add to relations array if not already there
    const relationExists = relations.some(rel =>
        rel.tache === taskId && rel.categorie === categoryId);

    if (!relationExists) {
        setRelations([...relations, { tache: taskId, categorie: categoryId }]);
    }
};

    const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => {
        if (filter === 'completed') return task.done;
        if (filter === 'pending') return !task.done;
        if (filter === 'urgent') return task.urgent;
        return true;
    }) : [];

    const handleInitialChoice = (choice, data = {}) => {
        if (choice === 'new') {
            setTasks([]);
            setCategories([]);
            setRelations([]);
        } else {
            setTasks(Array.isArray(data.taches) ? data.taches.map(task => ({ ...task, categories: task.categories || [] })) : []);
            setCategories(Array.isArray(data.categories) ? data.categories : []);
            setRelations(Array.isArray(data.relations) ? data.relations : []);
        }
        setIsInitialModalOpen(false);
    };

    return (
        <>
            <InitialModal isOpen={isInitialModalOpen} onChoice={handleInitialChoice} />
            <Header taches={tasks} />
            <Filter setFilter={setFilter} />
            <Todos taches={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} categories={categories} relations={relations} addCategoryToTask={addCategoryToTask} />
            <Footer addTask={addTask} tasks={tasks} categories={categories} relations={relations} />
            <button onClick={() => setIsCategoryModalOpen(true)}>Gérer les catégories</button>
            <CategoryModal isOpen={isCategoryModalOpen} onRequestClose={() => setIsCategoryModalOpen(false)} addCategory={addCategory} />
        </>
    );
}