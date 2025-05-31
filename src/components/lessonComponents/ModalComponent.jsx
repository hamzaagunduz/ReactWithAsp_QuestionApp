// src/components/lessonComponents/ModalComponent.jsx

import React, { useState } from "react";
import "../../style/lesson/topic_description_modal.css";

const ModalComponent = ({ isOpen, onClose, description, videoLink }) => {
    const [showDescription, setShowDescription] = useState(false);
    if (!isOpen) return null;

    const toggleDescription = () => {
        setShowDescription((prev) => !prev);
    };

    return (
        <div className="topic-modal-overlay" onClick={onClose}>
            <div className="topic-modal" onClick={(e) => e.stopPropagation()}>
                <h5>Konu Özeti</h5>

                <div className="topic-modal-video">
                    <iframe
                        width="100%"
                        height="315"
                        src={videoLink}
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <button className="topic-description-toggle-btn" onClick={toggleDescription}>
                    {showDescription ? "Konu Açıklamasını Gizle" : "Konu Açıklamasını Göster"}
                </button>

                {showDescription && (
                    <div className="topic-modal-description">
                        <p>{description}</p>
                    </div>
                )}

                <button className="topic-modal-close-btn" onClick={onClose}>
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default ModalComponent;
