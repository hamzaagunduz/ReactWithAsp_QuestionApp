import React, { useState } from 'react';
import { imgUrl } from '../../app/apiClient';

function QuestionCard({ question, selectedAnswer, result, onSelect }) {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!question) {
        return (
            <div className="card col-9 question-card p-4">
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    const options = [
        { key: 1, text: question.optionA },
        { key: 2, text: question.optionB },
        { key: 3, text: question.optionC },
        { key: 4, text: question.optionD },
        { key: 5, text: question.optionE },
    ];

    const getImageUrl = (type) => {
        const relativePath = question.images?.find((img) => img.type === type)?.imageUrl;
        return relativePath ? `${imgUrl}${relativePath}` : null;
    };

    const questionImage = getImageUrl(0);

    const handleImageClick = (e, imageUrl) => {
        e.stopPropagation();
        setSelectedImage(imageUrl);
    };

    return (
        <div className="card col-9 question-card p-4">
            {/* Question Image */}
            {questionImage && (
                <div className='question-img'>
                    <img
                        src={questionImage}
                        alt="Soru görseli"
                        className="enlarge-on-hover"
                        onClick={(e) => handleImageClick(e, questionImage)}
                    />
                </div>
            )}

            <h4 className="question-text">{question.text}</h4>

            {/* Options */}
            <div className="options-container w-100 mt-3">
                {options.map(option => {
                    const optionImage = getImageUrl(option.key);
                    return (
                        <button
                            key={option.key}
                            className={`btn btn-option text-start ${selectedAnswer === option.key
                                ? result === "correct" && option.key === question.answer
                                    ? "correct"
                                    : result === "wrong" && selectedAnswer === option.key
                                        ? "wrong"
                                        : "selected"
                                : result === "wrong" && option.key === question.answer
                                    ? "correct"
                                    : ""
                                }`}
                            onClick={() => onSelect(option.key)}
                            disabled={result !== null}
                        >
                            {optionImage && (
                                <img
                                    src={optionImage}
                                    alt={`Seçenek görseli`}
                                    className="option-image enlarge-on-hover"
                                    onClick={(e) => handleImageClick(e, optionImage)}
                                />
                            )}
                            {option.text}
                        </button>
                    );
                })}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                        <img
                            src={selectedImage}
                            alt="Büyütülmüş görsel"
                            className="enlarged-image"
                        />
                        <button
                            className="close-modal"
                            onClick={() => setSelectedImage(null)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionCard;