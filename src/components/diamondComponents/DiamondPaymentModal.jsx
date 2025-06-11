import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../../features/Payment/PaymentSlice';
import { purchaseDiamond } from '../../features/Purchase/PurchaseSlice';
import { startConnection, getConnection } from '../../services/signalrService';
import './../../style/diamondPage/diamondPaymentModal.css';

const DiamondPaymentModal = ({ onClose, packageInfo }) => {
    const dispatch = useDispatch();
    const { status: purchaseStatus, error, successMessage } = useSelector(state => state.purchase);
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
    const [errors, setErrors] = useState({});
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    // SignalR bağlantısı
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

        // Format card number with spaces
        if (name === 'cardNumber') {
            const digitsOnly = value.replace(/\D/g, '');
            const limited = digitsOnly.slice(0, 16);
            const formatted = limited.replace(/(\d{4})/g, '$1 ').trim();
            setForm(prev => ({ ...prev, [name]: formatted }));
            return;
        }

        // Format expiration month
        if (name === 'expireMonth') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 2);
            setForm(prev => ({ ...prev, [name]: digitsOnly }));
            return;
        }

        // Format expiration year
        if (name === 'expireYear') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
            setForm(prev => ({ ...prev, [name]: digitsOnly }));
            return;
        }

        // Format CVC
        if (name === 'cvc') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 3);
            setForm(prev => ({ ...prev, [name]: digitsOnly }));
            return;
        }

        // For other fields
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Card number validation (16 digits)
        const cardDigits = form.cardNumber.replace(/\D/g, '');
        if (cardDigits.length !== 16) {
            newErrors.cardNumber = '16 haneli olmalıdır';
        }

        // Card holder validation
        if (!form.cardHolderName.trim()) {
            newErrors.cardHolderName = 'Ad soyad gereklidir';
        }

        // Expiration month validation
        const month = parseInt(form.expireMonth, 10);
        if (!form.expireMonth || isNaN(month) || month < 1 || month > 12) {
            newErrors.expireMonth = 'Geçersiz ay';
        }

        // Expiration year validation
        const currentYear = new Date().getFullYear();
        const year = parseInt(form.expireYear, 10);
        if (!form.expireYear || isNaN(year) || year < currentYear || year > currentYear + 10) {
            newErrors.expireYear = `Geçersiz yıl`;
        }

        // CVC validation
        if (!form.cvc || form.cvc.length !== 3) {
            newErrors.cvc = '3 haneli olmalı';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await dispatch(pay({
            cardHolderName: form.cardHolderName,
            cardNumber: form.cardNumber.replace(/\D/g, ''),
            expireMonth: form.expireMonth,
            expireYear: form.expireYear,
            cvc: form.cvc
        }));

        if (pay.fulfilled.match(result)) {
            const html = result.payload.content;
            const base64Html = btoa(unescape(encodeURIComponent(html)));
            setIframeContent(`data:text/html;base64,${base64Html}`);
            setConversationId(result.payload.conversationId);
        }
    };

    return (
        <div className="diamond-modal-overlay">
            <div className="diamond-modal">
                <button className="diamond-close-button" onClick={onClose}>×</button>
                <h2>{packageInfo.name} Paketi</h2>
                <div className="diamond-package-info">
                    <div className="diamond-count">{packageInfo.diamondCount} 💎</div>
                    <div className="diamond-price">₺{packageInfo.amount.toFixed(2)}</div>
                </div>

                {!iframeContent ? (
                    <div className="diamond-payment-container">
                        <div
                            className={`diamond-credit-card ${isCardFlipped ? 'flipped' : ''}`}
                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                        >
                            <div className="diamond-card-front">
                                <div className="diamond-card-logo">VISA</div>
                                <div className="diamond-card-number">
                                    {form.cardNumber || '•••• •••• •••• ••••'}
                                </div>
                                <div className="diamond-card-details">
                                    <div className="diamond-card-holder">
                                        <div className="diamond-card-label">Kart Sahibi</div>
                                        <div className="diamond-card-value">
                                            {form.cardHolderName || 'Ad Soyad'}
                                        </div>
                                    </div>
                                    <div className="diamond-card-expiry">
                                        <div className="diamond-card-label">Son Kullanma</div>
                                        <div className="diamond-card-value">
                                            {form.expireMonth || 'MM'}/{form.expireYear || 'YYYY'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="diamond-card-back">
                                <div className="diamond-card-stripe"></div>
                                <div className="diamond-card-cvc">
                                    <div className="diamond-card-label">CVV</div>
                                    <div className="diamond-card-value">
                                        {form.cvc || '•••'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="diamond-payment-form" onSubmit={handleSubmit}>
                            <div className="diamond-form-group">
                                <label>Kart Numarası</label>
                                <input
                                    name="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    value={form.cardNumber}
                                    onChange={handleChange}
                                    maxLength={19}
                                    required
                                    className={errors.cardNumber ? 'error' : ''}
                                />
                                {errors.cardNumber && <div className="diamond-error">{errors.cardNumber}</div>}
                            </div>

                            <div className="diamond-form-group">
                                <label>Kart Üzerindeki İsim</label>
                                <input
                                    name="cardHolderName"
                                    placeholder="Ad Soyad"
                                    value={form.cardHolderName}
                                    onChange={handleChange}
                                    required
                                    className={errors.cardHolderName ? 'error' : ''}
                                />
                                {errors.cardHolderName && <div className="diamond-error">{errors.cardHolderName}</div>}
                            </div>

                            <div className="diamond-card-details">
                                <div className="diamond-form-group">
                                    <label>Son Kullanma</label>
                                    <div className="diamond-expiry-group">
                                        <input
                                            name="expireMonth"
                                            placeholder="AA"
                                            value={form.expireMonth}
                                            onChange={handleChange}
                                            maxLength={2}
                                            required
                                            className={errors.expireMonth ? 'error' : ''}
                                        />
                                        <span>/</span>
                                        <input
                                            name="expireYear"
                                            placeholder="YYYY"
                                            value={form.expireYear}
                                            onChange={handleChange}
                                            maxLength={4}
                                            required
                                            className={errors.expireYear ? 'error' : ''}
                                        />
                                    </div>
                                    {(errors.expireMonth || errors.expireYear) && (
                                        <div className="diamond-error">
                                            {errors.expireMonth || errors.expireYear}
                                        </div>
                                    )}
                                </div>

                                <div className="diamond-form-group">
                                    <label>
                                        CVV
                                        <span
                                            className="diamond-info-icon"
                                            onMouseEnter={() => setIsCardFlipped(true)}
                                            onMouseLeave={() => setIsCardFlipped(false)}
                                        >
                                            i
                                        </span>
                                    </label>
                                    <input
                                        name="cvc"
                                        placeholder="000"
                                        maxLength={3}
                                        value={form.cvc}
                                        onChange={handleChange}
                                        required
                                        className={errors.cvc ? 'error' : ''}
                                    />
                                    {errors.cvc && <div className="diamond-error">{errors.cvc}</div>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="diamond-submit-button"
                                disabled={paymentStatus === 'loading' || purchaseStatus === 'loading'}
                            >
                                {paymentStatus === 'loading' ? (
                                    <div className="diamond-spinner"></div>
                                ) : (
                                    `₺${packageInfo.amount.toFixed(2)} - Satın Al`
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="diamond-iframe-wrapper">
                        {callbackMessage?.status === 'success' ? (
                            <div className="diamond-success-container">
                                <div className="diamond-success-icon">✓</div>
                                <div className="diamond-success-message">
                                    <h3>Ödeme Başarılı!</h3>
                                    <p>{packageInfo.diamondCount} elmas hesabınıza eklendi.</p>
                                </div>
                                <button className="diamond-close-success" onClick={onClose}>
                                    Kapat
                                </button>
                            </div>
                        ) : (
                            <>
                                <h4 className="iframe-title">3D Secure Doğrulama</h4>
                                <iframe
                                    title="3D Secure"
                                    src={iframeContent}
                                    className="diamond-payment-iframe"
                                />
                            </>
                        )}
                    </div>
                )}

                {error && <div className="diamond-status-message error">{error}</div>}
            </div>
        </div>
    );
};

export default DiamondPaymentModal;