import React, { useState } from 'react';
import '../../style/favoriteCards/Flashcard.css';

const FlashcardList = ({ flashcards }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openModal = (index) => {
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedIndex(null);
    };

    const goNext = () => {
        setSelectedIndex((prev) => (prev + 1) % flashcards.length);
    };

    const goPrev = () => {
        setSelectedIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <div className="duo-container">
            {flashcards.length > 0 ? (
                <div className="duo-flashcard-list">
                    {flashcards.map((card, index) => (
                        <div
                            key={card.flashCardID}
                            className="duo-flashcard"
                            onClick={() => openModal(index)}
                        >
                            <div className="duo-card-face duo-front">
                                <p>{card.front}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="duo-no-cards">Hiç favori kart bulunamadı.</p>
            )}

            {/* Modal */}
            {selectedIndex !== null && (
                <div className="duo-modal-overlay">
                    <div className="duo-modal-content">
                        <button className="duo-modal-close" onClick={closeModal}>×</button>
                        <h4>{flashcards[selectedIndex].front}</h4>
                        <p>{flashcards[selectedIndex].back}</p>

                        <div className="duo-modal-nav">
                            <button className="duo-nav-button" onClick={goPrev}>← Geri</button>
                            <button className="duo-nav-button" onClick={goNext}>İleri →</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlashcardList;
