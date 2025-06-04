import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const exampleFrontList = [
    "Cevap arkada, tıkla öğren!",
    "Yanıt için çevir!",
    "Bunu biliyor musun?",
    "Arkaya bak ve kontrol et.",
    "Sence doğru cevap ne?",
];

function FlashCard({ flipped, onFlip, flashCard, loading, onStarClick }) {
    const [randomFrontText, setRandomFrontText] = useState("");
    const [isFavorited, setIsFavorited] = useState(flashCard?.isFavoried);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * exampleFrontList.length);
        setRandomFrontText(exampleFrontList[randomIndex]);
    }, []);

    // flashCardID veya isFavoried değişirse local state güncellenir
    useEffect(() => {
        setIsFavorited(flashCard?.isFavoried);
    }, [flashCard?.flashCardID, flashCard?.isFavoried]);

    const handleStarClick = (e) => {
        e.stopPropagation(); // Kartın fliplenmesini engelle
        setIsFavorited(prev => !prev); // Yerel state anında güncellenir
        onStarClick(flashCard.flashCardID); // Redux ya da API tetikle
    };

    return (
        <div
            className={`card col-3 question-card2 p-4 ${flipped ? "flip" : ""}`}
            onClick={onFlip}
            style={{ position: 'relative' }}
        >
            <div className="card-front">
                <h4 className="question-text">{!loading && randomFrontText}</h4>
            </div>
            <div className="card-back">
                <h4 className="question-text">{!loading && flashCard?.back}</h4>
                <FaStar
                    onClick={handleStarClick}
                    size={24}
                    color={isFavorited ? 'gold' : 'gray'}
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
