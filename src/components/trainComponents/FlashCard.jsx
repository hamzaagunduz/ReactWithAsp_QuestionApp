// FlashCard.jsx
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const exampleFrontList = [
    "İpucu arkada",
    "Tıkla ve çevir",
    "Bilgiyi öğrenmek için çevir",
    "Merak ettin mi? Çevir",
    "Hadi bakalım, arkada ne var?",
    "Çöz, sonra çevir!",
];

function FlashCard({ flipped, onFlip, flashCard, loading, onStarClick }) {
    const [randomFrontText, setRandomFrontText] = useState("");
    const [isFavorited, setIsFavorited] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * exampleFrontList.length);
        setRandomFrontText(exampleFrontList[randomIndex]);
    }, []);

    useEffect(() => {
        setIsFavorited(flashCard?.isStarred || false);
    }, [flashCard]);

    const handleStarClick = (e) => {
        e.stopPropagation();
        const newFavoriteState = !isFavorited;
        setIsFavorited(newFavoriteState);
        onStarClick(flashCard.flashCardID);
    };

    return (
        <div
            className={`flashcard-container col-3 ${flipped ? "flip" : ""}`}
            onClick={onFlip}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flashcard">
                <div className="card-front">
                    <div className="content-front">
                        <h4 className="flashcardfront-title-text">{!loading && randomFrontText}</h4>
                        <div className="hint">Tıklayarak çevir</div>
                    </div>
                    <div className="corner-decor">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className="card-back">
                    <div className="content-back">
                        <h4 className="content-back-text">{!loading && flashCard?.back}</h4>
                    </div>
                    <FaStar
                        onClick={handleStarClick}
                        size={24}
                        className={`star-icon ${isFavorited ? "favorited" : ""}`}
                    />
                    <div className="corner-decor">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlashCard;