import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pay } from '../../features/Payment/PaymentSlice';
import { purchaseDiamond } from '../../features/Purchase/PurchaseSlice';
import { startConnection, getConnection } from '../../services/signalrService';
import './../../style/diamondPage/diamondPaymentModal.css';

const DiamondPaymentModal = ({ onClose, packageInfo }) => {
    const dispatch = useDispatch();
    const { status: paymentStatus } = useSelector(state => state.payment);
    const { status: purchaseStatus, error: purchaseError } = useSelector(state => state.purchase);

    const [form, setForm] = useState({
        cardNumber: '',
        cardHolderName: '',
        expireMonth: '',
        expireYear: '',
        cvc: ''
    });

    const [errors, setErrors] = useState({});
    const [iframeContent, setIframeContent] = useState(null);
    const [conversationId, setConversationId] = useState(null);
    const [callbackMessage, setCallbackMessage] = useState(null);

    useEffect(() => {
        const connectSignalR = async () => {
            await startConnection('payhub');
            const connection = getConnection();

            if (conversationId) {
                connection.invoke('RegisterTransaction', conversationId);
            }

            connection.on('Receive', (data) => {
                setCallbackMessage(data);
                if (data.status === 'success') {
                    dispatch(purchaseDiamond({
                        diamondCount: packageInfo.diamondCount,
                        amount: packageInfo.amount,
                    }));
                }
            });
        };

        if (conversationId) {
            connectSignalR();
        }
    }, [conversationId, dispatch, packageInfo]);

    const validate = () => {
        const newErrors = {};
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const currentYearTwoDigit = currentYear % 100;
        const currentYearFourDigit = currentYear;

        // Luhn algoritması ile kredi kartı numarası doğrulama
        const isValidLuhn = (number) => {
            if (!/^\d+$/.test(number)) return false;
            let sum = 0;
            let shouldDouble = false;
            for (let i = number.length - 1; i >= 0; i--) {
                let digit = parseInt(number.charAt(i), 10);
                if (shouldDouble) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum += digit;
                shouldDouble = !shouldDouble;
            }
            return sum % 10 === 0;
        };

        // Kart Numarası (16 haneli, sadece rakam)
        if (!form.cardNumber) {
            newErrors.cardNumber = 'Kart numarası zorunludur.';
        } else if (!/^\d{16}$/.test(form.cardNumber)) {
            newErrors.cardNumber = 'Kart numarası 16 haneli olmalıdır.';
        } else if (!isValidLuhn(form.cardNumber)) {
            newErrors.cardNumber = 'Geçersiz kart numarası.';
        }

        // Kart üzerindeki isim
        if (!form.cardHolderName?.trim()) {
            newErrors.cardHolderName = 'Kart üzerindeki isim zorunludur.';
        } else {
            const name = form.cardHolderName.trim();
            if (name.length < 5 || name.length > 50) {
                newErrors.cardHolderName = 'İsim 5-50 karakter arasında olmalıdır.';
            } else if (!/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/.test(name)) {
                newErrors.cardHolderName = 'İsim sadece harf ve boşluk içermelidir.';
            }
        }

        // Ay (01-12 arası, 2 haneli)
        if (!form.expireMonth) {
            newErrors.expireMonth = 'Son kullanma ayı zorunludur.';
        } else if (!/^(0[1-9]|1[0-2])$/.test(form.expireMonth)) {
            newErrors.expireMonth = 'Geçerli bir ay giriniz (01-12).';
        }

        // Yıl (4 haneli, geçerli yıl veya gelecek)
        if (!form.expireYear) {
            newErrors.expireYear = 'Son kullanma yılı zorunludur.';
        } else if (!/^\d{4}$/.test(form.expireYear)) {
            newErrors.expireYear = 'Geçerli bir yıl giriniz (4 haneli).';
        } else {
            const enteredYear = parseInt(form.expireYear);
            const enteredMonth = parseInt(form.expireMonth);

            if (enteredYear < currentYearFourDigit) {
                newErrors.expireYear = 'Son kullanma yılı geçmiş olamaz.';
            } else if (
                enteredYear === currentYearFourDigit &&
                enteredMonth < currentMonth
            ) {
                newErrors.expireMonth = 'Kartın son kullanma tarihi geçmiş.';
            } else if (enteredYear > currentYearFourDigit + 20) {
                newErrors.expireYear = 'Yıl çok ileri bir tarih olamaz.';
            }
        }

        // CVC (3 veya 4 haneli, sadece rakam)
        if (!form.cvc) {
            newErrors.cvc = 'CVC numarası zorunludur.';
        } else if (!/^\d{3,4}$/.test(form.cvc)) {
            newErrors.cvc = 'CVC 3 veya 4 haneli sayı olmalıdır.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        const numericFields = ['cardNumber', 'expireMonth', 'expireYear', 'cvc'];
        const formattedValue = numericFields.includes(name)
            ? value.replace(/\D/g, '')
            : value;

        setForm(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCallbackMessage(null);

        if (!validate()) return;

        const result = await dispatch(pay({ ...form }));

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

    useEffect(() => {
        if (callbackMessage?.status === 'failure' || callbackMessage?.status === 'error') {
            setIframeContent(null);
        }
    }, [callbackMessage]);

    const renderMessage = () => {
        if (!callbackMessage) return null;

        switch (callbackMessage.status) {
            case 'success':
                return <div className="diamond-success-message">✅ Ödeme başarılı. Elmaslar eklendi!</div>;
            case 'failure':
                return <div className="diamond-status-message error">❌ 3D Ödeme başarısız. Lütfen tekrar deneyin.</div>;
            case 'error':
                return <div className="diamond-status-message error">{callbackMessage.message}</div>;
            default:
                return null;
        }
    };

    return (
        <div className="diamond-modal-overlay">
            <div className="diamond-modal">
                <button className="diamond-close-button" onClick={onClose}>×</button>
                <h2>{packageInfo.name} Satın Al</h2>

                {!iframeContent && (
                    <form className="diamond-payment-form" onSubmit={handleSubmit} noValidate>

                        <input
                            name="cardNumber"
                            placeholder="Kart Numarası (16 haneli)"
                            value={form.cardNumber}
                            onChange={handleChange}
                            maxLength={16}
                            pattern="\d*"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
                            }}
                            required
                        />
                        {errors.cardNumber && <div className="valid-message">{errors.cardNumber}</div>}

                        <input
                            name="cardHolderName"
                            placeholder="Kart Üzerindeki İsim"
                            value={form.cardHolderName}
                            onChange={handleChange}
                            maxLength={50}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ\s]/g, '');
                            }}
                            required
                        />
                        {errors.cardHolderName && <div className="valid-message">{errors.cardHolderName}</div>}

                        <div className="diamond-card-details">
                            <div className="input-group">
                                <input
                                    name="expireMonth"
                                    placeholder="Ay (MM)"
                                    value={form.expireMonth}
                                    onChange={handleChange}
                                    maxLength={2}
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                                    }}
                                    required
                                />
                                {errors.expireMonth && <div className="valid-message">{errors.expireMonth}</div>}
                            </div>

                            <div className="input-group">
                                <input
                                    name="expireYear"
                                    placeholder="Yıl (YYYY)"
                                    value={form.expireYear}
                                    onChange={handleChange}
                                    maxLength={4}
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                    }}
                                    required
                                />
                                {errors.expireYear && <div className="valid-message">{errors.expireYear}</div>}
                            </div>

                            <div className="input-group">
                                <input
                                    name="cvc"
                                    placeholder="CVV"
                                    value={form.cvc}
                                    onChange={handleChange}
                                    maxLength={4}
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                    }}
                                    required
                                />
                                {errors.cvc && <div className="valid-message">{errors.cvc}</div>}
                            </div>
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
                    <div className="diamond-status-message error" style={{ marginTop: '10px' }}>
                        {purchaseError}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiamondPaymentModal;
