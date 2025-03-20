import './Footer.css';
import { CgAdd } from "react-icons/cg";

export default function Footer({ addTask }) {
    return (
        <div id="footer">
            <button onClick={addTask} id="add-task-button">
                Ajouter une tâche <CgAdd fontSize="20px" />
            </button>
        </div>
    );
}
