import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestionsByTestId } from '../features/Question/QuestionSlice';
import { fetchFlashCardsByTestId, toggleUserFlashCard } from '../features/FlashCard/FlashCardSlice';
import { FaArrowLeft } from "react-icons/fa";

import QuestionCard from '../components/trainComponents/QuestionCard';
import FlashCard from '../components/trainComponents/FlashCard';
import TrainControls from '../components/trainComponents/TrainControls';
import ResultModal from '../components/trainComponents/ResultModal';

import '../style/train.css';

function TrainPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [unansweredQuestions, setUnansweredQuestions] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { testId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { questions } = useSelector(state => state.question);
    const { flashCards, status: cardStatus } = useSelector(state => state.flashCard);

    useEffect(() => {
        if (testId) {
            dispatch(fetchQuestionsByTestId(testId));
            dispatch(fetchFlashCardsByTestId(testId)); // sadece bir kez tüm flashcard'ları çek
        }
    }, [testId, dispatch]);

    const handleStarClick = (flashCardID) => {
        const appUserID = 1; // Auth'dan alınması gerekir
        dispatch(toggleUserFlashCard({ appUserID, flashCardID }));
    };

    const currentQuestion = questions?.[currentQuestionIndex];

    const handleAnswerSelect = (optionIndex) => {
        if (result !== null) return;
        setSelectedAnswer(optionIndex);
        if (optionIndex === currentQuestion.answer) {
            setResult("correct");
            setCorrectAnswers(prev => prev + 1);
        } else {
            setResult("wrong");
            setIncorrectAnswers(prev => prev + 1);
        }
    };

    const handleShowAnswer = () => {
        if (result === null) {
            setSelectedAnswer(currentQuestion.answer);
            setResult("correct");
            setCorrectAnswers(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setResult(null);
            setFlipped(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setSelectedAnswer(null);
            setResult(null);
        }
    };

    const handleTestFinish = () => {
        if (result === null) {
            setUnansweredQuestions(prev => prev + 1);
        }
        setShowModal(true);
    };

    if (!questions || questions.length === 0) {
        return <div>No questions available</div>;
    }

    return (
        <div className="train-container">
            <div className="back-button-train" onClick={() => navigate(-1)}>
                <FaArrowLeft size={50} /> Geri
            </div>
            <h4 className="train-title">Oku ve yanıtla</h4>
            <div className="container question-container row">
                <div className="progress-bar-train">
                    <div
                        className="progress-bar-fill-train"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>

                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    result={result}
                    onSelect={handleAnswerSelect}
                />

                <FlashCard
                    flipped={flipped}
                    onFlip={() => setFlipped(!flipped)}
                    flashCard={flashCards?.find(fc => fc.questionID === currentQuestion.questionID)}
                    loading={cardStatus !== "succeeded"}
                    onStarClick={handleStarClick}
                />

                <TrainControls
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onFinish={handleTestFinish}
                    onShowAnswer={handleShowAnswer}
                    isLast={currentQuestionIndex === questions.length - 1}
                />
            </div>

            {showModal && (
                <ResultModal
                    correct={correctAnswers}
                    incorrect={incorrectAnswers}
                    unanswered={unansweredQuestions}
                    onClose={() => setShowModal(false)}
                    onFinish={() => {
                        setShowModal(false);
                        navigate(-1);
                    }}
                />
            )}
        </div>
    );
}

export default TrainPage;
