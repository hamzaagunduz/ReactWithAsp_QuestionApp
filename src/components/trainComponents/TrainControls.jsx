function TrainControls({ onNext, onPrevious, onFinish, onShowAnswer, isLast }) {
    return (
        <div className="col-12 next-buton-train-container mt-3">
            <button className="next-buton-train" onClick={onPrevious}>Geri</button>
            <button className="next-buton-train" onClick={onShowAnswer}>Cevap</button>
            {isLast ? (
                <button className="next-buton-train finish" onClick={onFinish}>Bitir</button>
            ) : (
                <button className="next-buton-train" onClick={onNext}>İleri</button>
            )}
        </div>
    );
}
export default TrainControls;
