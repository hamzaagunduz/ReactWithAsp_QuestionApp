import React from "react";
import "../../style/lesson/lesson.css"; // Eğer özel stil kullanacaksan

const NoLivesModalComponent = ({ isOpen, onClose, description }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop_live" onClick={onClose}>
            <div className="modal-content_live" onClick={(e) => e.stopPropagation()}>
                <h5>Canınız Kalmadı</h5>
                <p>{description}</p>
                <button className="btn btn-secondary mt-3" onClick={onClose}>
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default NoLivesModalComponent;
