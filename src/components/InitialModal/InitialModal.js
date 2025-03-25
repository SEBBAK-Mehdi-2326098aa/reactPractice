import React, { useState } from 'react';
import Modal from 'react-modal';
import './InitialModal.css';

Modal.setAppElement('#root');

export default function InitialModal({ isOpen, onChoice }) {
    const [showFileInput, setShowFileInput] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                onChoice('existing', data);
            } catch (error) {
                console.error('Error parsing JSON file:', error);
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    };

    return (
        <Modal isOpen={isOpen} className="modal" overlayClassName="overlay">
            <h2>Choisissez une option</h2>
            <div className="button-group">
                <button onClick={() => onChoice('new')}>Partir de zéro</button>
                <button onClick={() => setShowFileInput(true)}>Repartir du fichier existant</button>
            </div>
            {showFileInput && (
                <input type="file" accept=".json" onChange={handleFileChange} />
            )}
        </Modal>
    );
}