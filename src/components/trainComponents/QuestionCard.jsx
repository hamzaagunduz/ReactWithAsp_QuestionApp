import { imgUrl } from '../../app/apiClient'; // baseURL buradan geliyor

function QuestionCard({ question, selectedAnswer, result, onSelect }) {
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

    const questionImage = getImageUrl(0); // Soru görseli

    return (
        <div className="card col-9 question-card p-4">
            {questionImage && (
                <div className='question-img'>
                    <img
                        src={questionImage}
                        alt="Soru görseli"
                        className=""
                        style={{}}
                    />
                </div>
            )}

            <h4 className="question-text">{question.text}</h4>

            <div className="options-container w-100 mt-3">
                {options.map(option => {
                    const optionImage = getImageUrl(option.key); // 1–5
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
                                    className="option-image"
                                />
                            )}
                            {option.text}
                        </button>

                    );
                })}
            </div>
        </div>
    );
}

export default QuestionCard;
