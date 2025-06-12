import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../../features/Payment/PaymentSlice';
import { purchaseDiamond } from '../../features/Purchase/PurchaseSlice';
import { startConnection, getConnection } from '../../services/signalrService';
import './../../style/diamondPage/diamondPaymentModal.css';

const DiamondPaymentModal = ({ onClose, packageInfo }) => {
    const dispatch = useDispatch();
    const { status: purchaseStatus, error: purchaseError } = useSelector(state => state.purchase);
    const { status: paymentStatus } = useSelector(state => state.payment);

    const [form, setForm] = useState({
        cardNumber: '',
        cardHolderName: '',
        expireMonth: '',
        expireYear: '',
        cvc: ''
    });

    const [iframeContent, setIframeContent] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [callbackMessage, setCallbackMessage] = useState(null);
    const [paymentStarted, setPaymentStarted] = useState(false);

    // SignalR
    useEffect(() => {
        const connectSignalR = async () => {
            await startConnection('payhub');
            const connection = getConnection();

            if (conversationId) {
                connection.invoke('RegisterTransaction', conversationId);
                console.log('📡 RegisterTransaction çağrıldı:', conversationId);
            }

            connection.on('Receive', (data) => {
                console.log('📨 SignalR Mesajı Alındı:', data);
                setCallbackMessage(data);

                if (data.status === 'success') {
                    dispatch(purchaseDiamond({
                        diamondCount: packageInfo.diamondCount,
                        amount: packageInfo.amount,
                        cardNumber: form.cardNumber,
                        cardHolderName: form.cardHolderName,
                        cvv: form.cvc
                    }));
                }
            });
        };

        if (conversationId) {
            connectSignalR();
        }
    }, [conversationId, dispatch, form, packageInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (['cardNumber', 'expireMonth', 'expireYear', 'cvc'].includes(name)) {
            formattedValue = value.replace(/\D/g, '');
        }

        if (name === 'cardNumber' && formattedValue.length > 16) return;
        if (name === 'expireMonth' && formattedValue.length > 2) return;
        if (name === 'expireYear' && formattedValue.length > 4) return;
        if (name === 'cvc' && formattedValue.length > 3) return;

        setForm({ ...form, [name]: formattedValue });
    };
    useEffect(() => {
        if (callbackMessage?.status === 'failure' || callbackMessage?.status === 'error') {
            setIframeContent(null); // iframe kapansın
        }
    }, [callbackMessage]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setPaymentStarted(true);
        setCallbackMessage(null);

        const result = await dispatch(pay({
            cardHolderName: form.cardHolderName,
            cardNumber: form.cardNumber,
            expireMonth: form.expireMonth,
            expireYear: form.expireYear,
            cvc: form.cvc
        }));

        if (pay.fulfilled.match(result)) {
            if (result.payload.errorMessage) {
                setCallbackMessage({ status: 'error', message: result.payload.errorMessage });
                return;
            }

            const html = result.payload.content;
            const base64Html = btoa(unescape(encodeURIComponent(html)));
            setIframeContent(`data:text/html;base64,${base64Html}`);
            setConversationId(result.payload.conversationId);
        }
    };

    const renderMessage = () => {
        if (!callbackMessage) return null;

        if (callbackMessage.status === 'error') {
            return <div className="diamond-status-message" style={{ color: 'red' }}>{callbackMessage.message}</div>;
        }

        if (callbackMessage.status === 'failure') {
            return <div className="diamond-status-message" style={{ color: 'red' }}>❌ 3D Ödeme başarısız oldu. Lütfen tekrar deneyin.</div>;
        }

        if (callbackMessage.status === 'success') {
            return <div className="diamond-success-message">✅ Ödeme başarıyla tamamlandı. Elmaslarınız eklendi!</div>;
        }

        return null;
    };

    return (
        <div className="diamond-modal-overlay">
            <div className="diamond-modal">
                <button className="diamond-close-button" onClick={onClose}>×</button>
                <h2>{packageInfo.name} Satın Al</h2>

                {!iframeContent && (
                    <form className="diamond-payment-form" onSubmit={handleSubmit}>
                        <input
                            name="cardNumber"
                            placeholder="Kart Numarası"
                            value={form.cardNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="cardHolderName"
                            placeholder="Kart Üzerindeki İsim"
                            value={form.cardHolderName}
                            onChange={handleChange}
                            required
                        />
                        <div className="diamond-card-details">
                            <input
                                name="expireMonth"
                                placeholder="Ay"
                                value={form.expireMonth}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="expireYear"
                                placeholder="Yıl"
                                value={form.expireYear}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="cvc"
                                placeholder="CVV"
                                value={form.cvc}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {renderMessage()}

                        <button
                            type="submit"
                            className="diamond-submit-button"
                            disabled={paymentStatus === 'loading' || purchaseStatus === 'loading'}
                        >
                            {paymentStatus === 'loading' ? 'Ödeme Başlatılıyor...' : 'Satın Al'}
                        </button>
                    </form>
                )}

                {iframeContent && (
                    <div className="diamond-iframe-wrapper">
                        {callbackMessage?.status !== 'success' && (
                            <>
                                <h4 className="iframe-title">3D Secure Doğrulama</h4>
                                <iframe
                                    title="3D Secure"
                                    src={iframeContent}
                                    className="diamond-payment-iframe"
                                />
                            </>
                        )}
                        {renderMessage()}
                    </div>
                )}

                {purchaseError && (
                    <div className="diamond-status-message" style={{ color: 'red', marginTop: '10px' }}>
                        {purchaseError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiamondPaymentModal;
