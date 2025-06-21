import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizFromFavorites } from '../../features/FlashCard/FlashCardSlice';
import styles from '../../style/favoriteCards/QuizFlashCard.module.css';

const FlashCardQuiz = ({ courseId, onClose }) => {
    const dispatch = useDispatch();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const { quizFromFavorites, quizFavStatus } = useSelector(state => state.flashCard);

    useEffect(() => {
        dispatch(fetchQuizFromFavorites({ courseId }));
    }, [dispatch, courseId]);

    const questions = quizFromFavorites?.questions || [];
    const currentQuestion = questions[currentQuestionIndex] || null;

    const handleOptionSelect = (option) => {
        if (!showAnswer) {
            setSelectedOption(option);
            setShowAnswer(true);
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowAnswer(false);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setShowAnswer(false);
        }
    };

    // Calculate progress percentage
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (quizFavStatus === 'loading') {
        return (
            <div className={styles.quizModalOverlay} onClick={onClose}>
                <div className={styles.quizModalContent} onClick={e => e.stopPropagation()}>
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Yükleniyor...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.quizModalOverlay} onClick={onClose}>
            <div className={styles.quizModalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.quizModalClose} onClick={onClose}>×</button>

                {questions.length > 0 && currentQuestion ? (
                    <div className={styles.trainContainer}>
                        {/* Progress Bar */}
                        {/* <div className={styles.progressBarTrain}>
                            <div
                                className={`${styles.progressBarFillTrain} ${currentQuestionIndex === questions.length - 1 ? styles.completed : ''}`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div> */}

                        {/* <div className={styles.quizHeader}>
                            <h3 className={styles.trainTitle}>Favori Kartlardan Quiz</h3>
                            <div className={styles.questionCounter}>
                                Soru {currentQuestionIndex + 1}/{questions.length}
                            </div>
                        </div> */}

                        <div className={styles.questionCard}>
                            <div className={styles.questionText}>
                                {currentQuestion.questionText}
                            </div>

                            <div className={styles.optionsContainer}>
                                {(currentQuestion.options || []).map((option, index) => {
                                    const isCorrect = option.flashCardID === currentQuestion.correctAnswerId;
                                    const isSelected = selectedOption?.flashCardID === option.flashCardID;

                                    let optionClass = styles.option;
                                    if (showAnswer) {
                                        if (isCorrect) {
                                            optionClass += ` ${styles.correct}`;
                                        } else if (isSelected && !isCorrect) {
                                            optionClass += ` ${styles.wrong}`;
                                        }
                                    } else if (isSelected) {
                                        optionClass += ` ${styles.selected}`;
                                    }

                                    return (
                                        <button
                                            key={index}
                                            className={optionClass}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={showAnswer}
                                        >
                                            {option.answerText}
                                            {showAnswer && isCorrect && (
                                                <span className={styles.correctIndicator}>✓</span>
                                            )}
                                            {showAnswer && isSelected && !isCorrect && (
                                                <span className={styles.incorrectIndicator}>X</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className={styles.quizNavigation}>
                                <button
                                    className={`${styles.navButton} ${styles.previousButton}`}
                                    onClick={goToPreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    ← Önceki Soru
                                </button>

                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button
                                        className={`${styles.navButton} ${styles.nextButton}`}
                                        onClick={goToNextQuestion}
                                        disabled={!showAnswer}
                                    >
                                        Sonraki Soru →
                                    </button>
                                ) : (
                                    <button
                                        className={styles.navButton}
                                        onClick={onClose}
                                    >
                                        Testi Bitir
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.noQuizContainer}>
                        <h4>Quiz Oluşturulamadı</h4>
                        <p>Yeterli sayıda favori kart bulunamadı.</p>
                        <button className={styles.closeButton} onClick={onClose}>
                            Kapat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlashCardQuiz;