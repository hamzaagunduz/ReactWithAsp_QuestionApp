import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { decreaseLife } from '../features/AppUser/AppUserSlice';
import QuestionCard from '../components/trainComponents/QuestionCard';
import FlashCard from '../components/trainComponents/FlashCard';
import TrainControls from '../components/trainComponents/TrainControls';
import ResultModal from '../components/trainComponents/ResultModal';
import AiChatModal from '../components/trainComponents/AiChatModal';
import '../style/Train/train.css';

// Import the new thunk
import { fetchQuestionWithFlashCard } from '../features/Test/TestSlice';
import { toggleUserFlashCard } from '../features/FlashCard/FlashCardSlice';
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

    const { testId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Updated selector for the new slice
    const {
        questionWithFlashCardStatus: status,
        questionWithFlashCardData: testData,
        questionWithFlashCardError: error
    } = useSelector(state => state.test);
    const starredFlashCardIds = testData?.starredFlashCardIds || [];

    // Extract questions and test info from the new data structure
    const questions = testData?.questions || [];
    const test = testData ? {
        testID: testData.testID,
        title: testData.title,
        topicID: testData.topicID
    } : null;

    useEffect(() => {
        setStartTime(Date.now());
        dispatch(fetchQuestionWithFlashCard(testId));
    }, [dispatch, testId]);

    const handleStarClick = (flashCardID) => {
        dispatch(toggleUserFlashCard({ flashCardID }));
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentFlashCard = currentQuestion?.flashCard || null;
    const flashCardWithStar = currentFlashCard ? {
        ...currentFlashCard,
        isStarred: starredFlashCardIds.includes(currentFlashCard.flashCardID)
    } : null;

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
        const currentQID = currentQuestion?.questionID;
        if (currentQID && answers[currentQID]) {
            setSelectedAnswer(answers[currentQID]);
            setResult(
                answers[currentQID] === currentQuestion.answer
                    ? "correct"
                    : "wrong"
            );
        } else {
            setSelectedAnswer(null);
            setResult(null);
        }
        setFlipped(false);
    }, [currentQuestionIndex, currentQuestion, answers]);

    const handleShowAnswer = () => {
        if (result === null && currentQuestion) {
            setSelectedAnswer(currentQuestion.answer);
            setResult("correct");
            setCorrectAnswers(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleFinishModal = () => {
        let correct = 0;
        let incorrect = 0;

        questions.forEach(q => {
            const userAnswer = answers[q.questionID];
            if (userAnswer === undefined) return;
            if (userAnswer === q.answer) correct++;
            else incorrect++;
        });

        setCorrectAnswers(correct);
        setIncorrectAnswers(incorrect);
        setUnansweredQuestions(questions.length - Object.keys(answers).length);
        setShowModal(true);
    };

    const handleTestFinish = () => {
        const endTime = Date.now();
        const durationMs = endTime - startTime;
        const durationInMinutes = Math.ceil(durationMs / (1000 * 60));

        dispatch(updateUserStatistics({ wrongAnswerCount: incorrectAnswers }));
        dispatch(updateDailyMission({ wrongAnswerCount: incorrectAnswers }));

        const localDate = new Date();
        const localISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();

        dispatch(submitPerformance({
            completedAt: localISOString,
            performances: [{
                topicId: test.topicID,
                correctCount: correctAnswers,
                wrongCount: incorrectAnswers,
                durationInMinutes: durationInMinutes
            }]
        }));

        setShowModal(false);
        navigate(-1);
    };

    const handleOpenAiModal = () => setShowAiModal(true);

    if (status === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="error-container">
                <p>Hata: {error}</p>
                <button onClick={() => window.location.reload()}>Tekrar Dene</button>
            </div>
        );
    }

    if (status === 'succeeded' && questions.length === 0) {
        return (
            <div className="no-questions-container">
                <p>Bu test için soru bulunamadı.</p>
                <button onClick={() => navigate(-1)}>Geri Dön</button>
            </div>
        );
    }


    return (
        <div className="train-container">
            <div className="back-button-train" onClick={() => navigate(-1)}>
            </div>
            <h4 className="train-title">Oku ve yanıtla</h4>
            <div className="container question-container row">
                <div className="progress-bar-train-question">
                    <div
                        className="progress-bar-fill-train-question"
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
                    flashCard={flashCardWithStar}
                    onStarClick={() => handleStarClick(currentFlashCard?.flashCardID)}
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
                </div>
            </div>

            {showAiModal && (
                <AiChatModal
                    question={currentQuestion?.text || "Soru bulunamadı."}
                    onClose={() => setShowAiModal(false)}
                />
            )}

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