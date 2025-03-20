import './header.css';

export default function Header({ taches }) {
    const numberOfTasks = taches.length;
    const tasksNotDone = taches.filter(tache => !tache.done).length;

    return (
        <div id="header">
            <Title />
            <p>Nombre de tâches: {numberOfTasks}</p>
            <p>Tâches en cours: {tasksNotDone}</p>
        </div>
    );
}

export function Title() {
    return <h1 id="title">To Do List</h1>;
}