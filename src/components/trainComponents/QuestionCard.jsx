function QuestionCard({ question, selectedAnswer, result, onSelect }) {
    const options = [
        { key: 1, text: question.optionA },
        { key: 2, text: question.optionB },
        { key: 3, text: question.optionC },
        { key: 4, text: question.optionD },
        { key: 5, text: question.optionE },
    ];

    return (
        <div className="card col-9 question-card p-4">
            <h4 className="question-text">{question.text}</h4>
            <div className="options-container w-100">
                {options.map(option => (
                    <button
                        key={option.key}
                        className={`btn btn-option ${selectedAnswer === option.key
                            ? result === "correct" && option.key === question.answer
                                ? "correct"
                                : result === "wrong" && selectedAnswer === option.key
                                    ? "wrong"
                                    : "selected"
                            : ""
                            }`}
                        onClick={() => onSelect(option.key)}
                        disabled={result !== null}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
}
export default QuestionCard;
