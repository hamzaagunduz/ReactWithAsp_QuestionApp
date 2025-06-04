import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { decreaseLife } from '../features/AppUser/AppUserSlice';  // thunk importu
import QuestionCard from '../components/trainComponents/QuestionCard';
import FlashCard from '../components/trainComponents/FlashCard';
import TrainControls from '../components/trainComponents/TrainControls';
import ResultModal from '../components/trainComponents/ResultModal';
import AiChatModal from '../components/trainComponents/AiChatModal';

import '../style/Train/train.css';

import { fetchQuestionsByTestId, fetchTestById } from '../features/Question/QuestionSlice';
import { fetchFlashCardsByTestId, toggleUserFlashCard } from '../features/FlashCard/FlashCardSlice';
import { updateUserStatistics } from '../features/Statistics/StatisticsSlice';
import { updateDailyMission } from '../features/DailyMission/DailyMissionSlice';
import { submitPerformance } from '../features/Performance/PerformanceSlice';

function TrainPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [unansweredQuestions, setUnansweredQuestions] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [answers, setAnswers] = useState({});
    const [startTime, setStartTime] = useState(null);


    const [showAiModal, setShowAiModal] = useState(false);
    const handleOpenAiModal = () => {
        setShowAiModal(true);
    };



    const { testId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { questions } = useSelector(state => state.question);
    const test = useSelector(state => state.question.test);
    const { flashCards, status: cardStatus } = useSelector(state => state.flashCard);
    console.log(questions)

    useEffect(() => {
        if (testId) {
            dispatch(fetchQuestionsByTestId(testId));
            dispatch(fetchTestById(testId));
            dispatch(fetchFlashCardsByTestId(testId));
            setStartTime(Date.now());  // Test başlar başlamaz zamanı kaydet

        }
    }, [testId, dispatch]);

    const handleStarClick = (flashCardID) => {
        dispatch(toggleUserFlashCard({ flashCardID }));
    };

    const currentQuestion = questions?.[currentQuestionIndex];
    const currentFlashCard = flashCards?.find(fc => fc.questionID === currentQuestion.questionID);

    const handleAnswerSelect = (optionIndex) => {
        if (result !== null) return;

        const currentQID = currentQuestion.questionID;

        setSelectedAnswer(optionIndex);
        setAnswers(prev => ({
            ...prev,
            [currentQID]: optionIndex
        }));

        if (optionIndex === currentQuestion.answer) {
            setResult("correct");
            setCorrectAnswers(prev => prev + 1);
        } else {
            setResult("wrong");
            setIncorrectAnswers(prev => prev + 1);
            dispatch(decreaseLife());

        }
    };

    useEffect(() => {
        const currentQID = questions?.[currentQuestionIndex]?.questionID;
        if (currentQID && answers[currentQID]) {
            setSelectedAnswer(answers[currentQID]);
            setResult(
                answers[currentQID] === questions[currentQuestionIndex].answer
                    ? "correct"
                    : "wrong"
            );
        } else {
            setSelectedAnswer(null);
            setResult(null);
        }
        setFlipped(false);
    }, [currentQuestionIndex, questions, answers]);


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

    const handleFinishModal = () => {
        let correct = 0;
        let incorrect = 0;
        questions.forEach(q => {
            const userAnswer = answers[q.questionID];
            if (userAnswer === undefined) return; // boş soru
            if (userAnswer === q.answer) {
                correct++;
            } else {
                incorrect++;
            }
        });
        const unansweredCount = questions.length - Object.keys(answers).length;
        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setUnansweredQuestions(unansweredCount);
        setShowModal(true);
    };

    const handleTestFinish = () => {

        const endTime = Date.now();
        const durationMs = endTime - startTime;
        const durationInMinutes = Math.ceil(durationMs / (1000 * 60)); // saniyeyi dakikaya çevir ve yukarı yuvarla
        // İsteği at
        dispatch(updateUserStatistics({
            wrongAnswerCount: incorrectAnswers
        }));

        dispatch(updateDailyMission({ wrongAnswerCount: incorrectAnswers }));


        dispatch(submitPerformance({
            completedAt: new Date().toISOString(),
            performances: [
                {
                    topicId: test.topicID, // veya questions[0].topicId
                    correctCount: correctAnswers,
                    wrongCount: incorrectAnswers,
                    durationInMinutes: durationInMinutes
                }
            ]
        }));




        setShowModal(false);
        navigate(-1);
    };


    if (!questions || questions.length === 0) {
        return <div></div>;
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
                    flashCard={currentFlashCard}
                    loading={cardStatus !== "succeeded"}
                    onStarClick={handleStarClick}
                />


                <TrainControls
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onFinish={handleFinishModal}
                    onShowAnswer={handleShowAnswer}
                    isLast={currentQuestionIndex === questions.length - 1}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='next-buton-train' onClick={handleOpenAiModal}>
                        Yapay Zeka
                    </button>

                    {showAiModal && (
                        <AiChatModal
                            question={currentQuestion?.text || "Soru bulunamadı."}
                            onClose={() => setShowAiModal(false)}
                        />
                    )}
                </div>

            </div>

            {showModal && (
                <ResultModal
                    correct={correctAnswers}
                    incorrect={incorrectAnswers}
                    unanswered={unansweredQuestions}
                    onClose={() => setShowModal(false)}
                    onFinish={handleTestFinish}

                />
            )}



        </div>
    );
}

export default TrainPage;
