import './header.css';

export default function Header({ taches }) {
    const numberOfTasks = taches.length;
    const tasksNotDone = taches.filter(tache => !tache.done).length;

    return (
        <div id="header">
            <h1 id="title">To Do List</h1>
            <p>Nombre de tâches: {numberOfTasks}</p>
            <p>Tâches en cours: {tasksNotDone}</p>
        </div>
    );
}
