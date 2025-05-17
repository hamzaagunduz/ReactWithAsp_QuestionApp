import { FaStar } from 'react-icons/fa';

function FlashCard({ flipped, onFlip, flashCard, loading, onStarClick, isStarred }) {
    return (
        <div className={`card col-3 question-card2 p-4 ${flipped ? "flip" : ""}`} onClick={onFlip} style={{ position: 'relative' }}>


            <div className="card-front">
                <h4 className="question-text">{!loading && flashCard?.front}</h4>
            </div>
            <div className="card-back">
                <h4 className="question-text">{!loading && flashCard?.back}</h4>
                <FaStar
                    onClick={(e) => {
                        e.stopPropagation(); // kartın flip olmasını engellemek için
                        onStarClick(flashCard.flashCardID); // HATA BURADAYDI
                    }}
                    size={24}
                    color={isStarred ? 'gold' : 'gray'}
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
