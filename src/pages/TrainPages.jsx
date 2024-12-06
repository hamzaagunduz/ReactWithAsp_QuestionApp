import React, { useState } from 'react';
import '../style/train.css';

const questions = [
    {
        id: 1,
        question: "Dünyanın En yakışıklısı kim?",
        options: ["Hamza", "Pera", "Naranja", "Plátano"],
        correctAnswer: "Hamza",
        info: "Apple means 'manzana' in Spanish.",
    },
    {
        id: 2,
        question: "En kel adam kimdir?",
        options: ["Hamza", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Hamza",
        info: "The capital of France is Paris.",
    },
    {
        id: 3,
        question: "Fetöcü bıyıklı kimdir?",
        options: ["Yusuf", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Yusuf",
        info: "The capital of France is Paris.",
    },
];

function TrainPages() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [result, setResult] = useState(null); // null, 'correct', 'wrong'
    const [flipped, setFlipped] = useState(false);

    const handleAnswerSelect = (option) => {
        if (result !== null) return; // Cevap kontrolü yapıldıysa bir daha seçim yapılmasın
        setSelectedAnswer(option);
        if (option === questions[currentQuestionIndex].correctAnswer) {
            setResult("correct");
        } else {
            setResult("wrong");
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(""); // Yeni soru için seçimi sıfırla
            setResult(null); // Sonucu sıfırla
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(""); // Geri dönerken seçimi sıfırla
            setResult(null); // Sonucu sıfırla
        }
    };

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const currentQuestion = questions[currentQuestionIndex];

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
                        <h4 className="question-text">{currentQuestion.question}</h4>
                        <div className="options-container w-100">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-option ${selectedAnswer === option
                                        ? result === "correct" && option === currentQuestion.correctAnswer
                                            ? "correct"
                                            : result === "wrong" && selectedAnswer === option
                                                ? "wrong"
                                                : "selected"
                                        : ""
                                        }`}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={result !== null} // Kontrol sonrası tıklamayı devre dışı bırak
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`card col-3 question-card2 p-4 ${flipped ? "flip" : ""}`}
                        onClick={handleCardClick}
                    >
                        <div className="card-front">
                            <h4 className="question-text">Soru Bilgisi</h4>
                        </div>
                        <div className="card-back">
                            <h4 className="question-text">{currentQuestion.info}</h4>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 next-buton-train-container">
                        <button className="next-buton-train" role="button" onClick={handlePrevious}>
                            Geri
                        </button>
                        <button className="next-buton-train" role="button" onClick={handleNext}>
                            İleri
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrainPages;
