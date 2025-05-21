import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function FlashCard({ flipped, onFlip, flashCard, loading, onStarClick, isStarred }) {
    const [starred, setStarred] = useState(isStarred);

    // Eğer dışarıdan isStarred değişirse, güncelle
    useEffect(() => {
        setStarred(isStarred);
    }, [isStarred]);

    const handleStarClick = (e) => {
        e.stopPropagation();
        onStarClick(flashCard.flashCardID);
        setStarred(prev => !prev); // local state'i toggle et
    };

    return (
        <div className={`card col-3 question-card2 p-4 ${flipped ? "flip" : ""}`} onClick={onFlip} style={{ position: 'relative' }}>
            <div className="card-front">
                <h4 className="question-text">{!loading && flashCard?.front}</h4>
            </div>
            <div className="card-back">
                <h4 className="question-text">{!loading && flashCard?.back}</h4>
                <FaStar
                    onClick={handleStarClick}
                    size={24}
                    color={starred ? 'gold' : 'gray'}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                />
            </div>
        </div>
    );
}

export default FlashCard;
