import './Filter.css';

export default function Filter({ setFilter }) {
    return (
        <div className="filter-container">
            <button onClick={() => setFilter('all')}>Toutes</button>
            <button onClick={() => setFilter('pending')}>En attente</button>
            <button onClick={() => setFilter('completed')}>Terminées</button>
            <button onClick={() => setFilter('urgent')}>Urgentes</button>
        </div>
    );
}
