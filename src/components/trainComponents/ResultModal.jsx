function ResultModal({ correct, incorrect, unanswered, onClose, onFinish }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Test Sonuçları</h4>
                </div>
                <div className="modal-body">
                    <p>Doğru Cevaplar: {correct}</p>
                    <p>Yanlış Cevaplar: {incorrect}</p>
                    <p>Boş Sorular: {unanswered}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onFinish}>Testi Bitir</button>
                    <button onClick={onClose}>İncele</button>
                </div>
            </div>
        </div>
    );
}
export default ResultModal;
