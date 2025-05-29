import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { purchaseDiamond } from '../../features/Purchase/PurchaseSlice';
import './../../style/diamondPage/diamondPaymentModal.css';

const DiamondPaymentModal = ({ onClose, packageInfo, userId }) => {
    const dispatch = useDispatch();
    const { status, error, successMessage } = useSelector(state => state.purchase);

    const [form, setForm] = useState({
        cardNumber: '',
        cardHolderName: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(purchaseDiamond({
            userId,
            diamondCount: packageInfo.diamondCount,
            amount: packageInfo.amount,
            cardNumber: form.cardNumber,
            cardHolderName: form.cardHolderName,
            cvv: form.cvv
        }));
    };

    return (
        <div className="diamond-modal-overlay">
            <div className="diamond-modal">
                <button className="diamond-close-button" onClick={onClose}>×</button>
                <h2>{packageInfo.name} Satın Al</h2>

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
                    <input
                        name="cvv"
                        placeholder="CVV"
                        maxLength={3}
                        value={form.cvv}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="diamond-submit-button"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Satın Alınıyor...' : 'Satın Al'}
                    </button>
                </form>

                {error && <div className="diamond-status-message" style={{ color: 'red' }}>{error}</div>}
                {successMessage && <div className="diamond-status-message" style={{ color: 'green' }}>{successMessage}</div>}
            </div>
        </div>
    );
};

export default DiamondPaymentModal;
