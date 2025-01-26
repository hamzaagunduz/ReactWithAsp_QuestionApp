import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsByTestId } from '../features/Question/QuestionSlice';
import { fetchFlashCardsByQuestionId } from '../features/FlashCard/FlashCardSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../style/train.css';

function TrainPages() {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [unansweredQuestions, setUnansweredQuestions] = useState(0);  // Yeni eklenen durum
    const [showModal, setShowModal] = useState(false);

    const { testId } = useParams();
    const dispatch = useDispatch();

    const { questions, status, error } = useSelector(state => state.question);
    const { flashCards, status: cardStatus, error: cardError } = useSelector(state => state.flashCard);

    useEffect(() => {
        if (testId) {
            dispatch(fetchQuestionsByTestId(testId));
        }
    }, [testId, dispatch]);

    useEffect(() => {
        if (questions && questions.length > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion && currentQuestion.questionID) {
                dispatch(fetchFlashCardsByQuestionId(currentQuestion.questionID));
            }
        }
    }, [currentQuestionIndex, questions, dispatch]);

    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex) => {
        if (result !== null) return;
        setSelectedAnswer(optionIndex);
        if (optionIndex === currentQuestion.answer) {
            setResult("correct");
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setResult("wrong");
            setIncorrectAnswers(incorrectAnswers + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setResult(null);
            setFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(null);
            setResult(null);
        }
    };

    const handleTestFinish = () => {
        // Eğer cevap verilmemiş soru varsa, cevapsız olarak say
        if (result === null) {
            setUnansweredQuestions(unansweredQuestions + 1);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseModalNavigate = () => {
        setShowModal(false);
        navigate(-1);
    };

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const handleShowAnswer = () => {
        if (result === null) {
            setSelectedAnswer(currentQuestion.answer);
            setResult("correct");
            setCorrectAnswers(correctAnswers + 1);
        }
    };

    const options = [
        { key: 1, text: currentQuestion.optionA },
        { key: 2, text: currentQuestion.optionB },
        { key: 3, text: currentQuestion.optionC },
        { key: 4, text: currentQuestion.optionD },
        { key: 5, text: currentQuestion.optionE },
    ];

    return (
        <div className="train-container">
            <h4 className="train-title">Oku ve yanıtla</h4>

            <div className="container question-container">
                <div className="row">
                    <div className="progress-bar-train">
                        <div
                            className="progress-bar-fill-train"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="card col-9 question-card p-4">
                        <h4 className="question-text">{currentQuestion.text}</h4>
                        <div className="options-container w-100">
                            {options.map(option => (
                                <button
                                    key={option.key}
                                    className={`btn btn-option ${selectedAnswer === option.key
                                        ? result === "correct" && option.key === currentQuestion.answer
                                            ? "correct"
                                            : result === "wrong" && selectedAnswer === option.key
                                                ? "wrong"
                                                : "selected"
                                        : ""
                                        }`}
                                    onClick={() => handleAnswerSelect(option.key)}
                                    disabled={result !== null}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`card col-3 question-card2 p-4 ${flipped ? "flip" : ""}`}
                        onClick={handleCardClick}
                    >
                        <div className="card-front">
                            <h4 className="question-text">
                                {cardStatus === 'succeeded' && flashCards.length > 0 ? flashCards[0].front : null}
                            </h4>
                        </div>
                        <div className="card-back">
                            <h4 className="question-text">
                                {cardStatus === 'succeeded' && flashCards.length > 0 ? flashCards[0].back : null}
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 next-buton-train-container">
                        <button className="next-buton-train" role="button" onClick={handlePrevious}>
                            Geri
                        </button>
                        <button className="next-buton-train" role="button" onClick={handleShowAnswer}>
                            Cevap
                        </button>
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button className="next-buton-train finish" role="button" onClick={handleTestFinish}>
                                Bitir
                            </button>
                        ) : (
                            <button className="next-buton-train" role="button" onClick={handleNext}>
                                İleri
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Test Sonuçları</h4>
                        </div>
                        <div className="modal-body">
                            <p>Doğru Cevaplar: {correctAnswers}</p>
                            <p>Yanlış Cevaplar: {incorrectAnswers}</p>
                            <p>Boş Sorular: {unansweredQuestions}</p> {/* Cevapsız soruları ekleyin */}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModalNavigate}>Testi Bitir</button>
                            <button onClick={handleCloseModal}>İncele </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TrainPages;
