// src/components/lessonComponents/ModalComponent.jsx

import React from "react";
import "../../style/lesson/lesson.css"; // Eğer özel stil kullanacaksan

const ModalComponent = ({ isOpen, onClose, description }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h5>Konu Özeti</h5>
                <p>{description}</p>
                <button className="btn btn-secondary mt-3" onClick={onClose}>
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default ModalComponent;
