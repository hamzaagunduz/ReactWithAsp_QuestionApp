import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../features/Payment/PaymentSlice';
import { startConnection, getConnection } from '../services/signalrService';
import { purchaseDiamond } from '../features/Purchase/PurchaseSlice'; // import etmeyi unutmayın

const Payment = () => {
    const dispatch = useDispatch();
    const [paymentData, setPaymentData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expireMonth: '',
        expireYear: '',
        cvc: ''
    });

    const [iframeContent, setIframeContent] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [callbackMessage, setCallbackMessage] = useState(null);

    const { status, error } = useSelector(state => state.payment);

    useEffect(() => {
        const connectSignalR = async () => {
            await startConnection('payhub'); // backendte [Route("payhub")] varsa bunu kullanın
            const connection = getConnection();

            if (conversationId) {
                connection.invoke('RegisterTransaction', conversationId);
                console.log('📡 RegisterTransaction çağrıldı:', conversationId);
            }

            connection.on('Receive', (data) => {
                console.log('📨 SignalR Mesajı Alındı:', data);
                setCallbackMessage(data);

            });
        };

        if (conversationId) {
            connectSignalR();
        }
    }, [conversationId]);

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(pay(paymentData));

        if (pay.fulfilled.match(result)) {
            const html = result.payload.content;
            const base64Html = btoa(unescape(encodeURIComponent(html)));
            setIframeContent(`data:text/html;base64,${base64Html}`);

            // SignalR için conversationId ayarla
            setConversationId(result.payload.conversationId);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ödeme Sayfası</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Kart Üzerindeki İsim</label>
                    <input type="text" name="cardHolderName" className="form-control" value={paymentData.cardHolderName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Kart Numarası</label>
                    <input type="text" name="cardNumber" className="form-control" value={paymentData.cardNumber} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Ay</label>
                    <input type="text" name="expireMonth" className="form-control" value={paymentData.expireMonth} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Yıl</label>
                    <input type="text" name="expireYear" className="form-control" value={paymentData.expireYear} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                    <label className="form-label">CVC</label>
                    <input type="text" name="cvc" className="form-control" value={paymentData.cvc} onChange={handleChange} required />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Gönderiliyor...' : 'Ödemeyi Gönder'}
                    </button>
                </div>
            </form>

            {error && <div className="alert alert-danger mt-3">Hata: {error}</div>}

            {iframeContent && (
                <div className="mt-5">
                    <h5>3D Secure Yönlendirme</h5>
                    <iframe
                        title="3D Secure"
                        src={iframeContent}
                        style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
                    />
                </div>
            )}

            {callbackMessage && (
                <div className="alert alert-success mt-4">
                    <strong>Ödeme Durumu:</strong> {callbackMessage.status}<br />
                    <strong>Mesaj:</strong> {callbackMessage?.paymentId && `Ödeme ID: ${callbackMessage.paymentId}`}
                </div>
            )}
        </div>
    );
};

export default Payment;
