import React, { useState } from 'react';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';

const DiamondManagement = ({ user }) => {
    const [diamonds, setDiamonds] = useState(user.diamonds);
    const [amount, setAmount] = useState(0);
    const [reason, setReason] = useState('');

    const handleAddDiamonds = () => {
        if (amount > 0) {
            setDiamonds(prev => prev + amount);
            // Burada API çağrısı yapılabilir
            alert(`${amount} elmas ${user.name} kullanıcısına eklendi!`);
            setAmount(0);
            setReason('');
        }
    };

    const handleRemoveDiamonds = () => {
        if (amount > 0 && amount <= diamonds) {
            setDiamonds(prev => prev - amount);
            // Burada API çağrısı yapılabilir
            alert(`${amount} elmas ${user.name} kullanıcısından çıkarıldı!`);
            setAmount(0);
            setReason('');
        }
    };

    return (
        <div className={styles.diamondContainer}>
            <div className={styles.currentDiamonds}>
                <span className={styles.diamondIcon}>💎</span>
                <span className={styles.diamondCount}>{diamonds}</span>
                <span className={styles.diamondLabel}>Mevcut Elmas</span>
            </div>

            <div className={styles.diamondControls}>
                <div className={styles.controlGroup}>
                    <label>Miktar:</label>
                    <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className={styles.controlGroup}>
                    <label>Sebep:</label>
                    <input
                        type="text"
                        placeholder="Elmas ekleme/çıkarma sebebi..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>

                <div className={styles.actionButtons}>
                    <button
                        className={styles.addButton}
                        onClick={handleAddDiamonds}
                        disabled={!amount || !reason}
                    >
                        Elmas Ekle
                    </button>
                    <button
                        className={styles.removeButton}
                        onClick={handleRemoveDiamonds}
                        disabled={!amount || !reason || amount > diamonds}
                    >
                        Elmas Çıkar
                    </button>
                </div>
            </div>

            <div className={styles.diamondHistory}>
                <h4>Son İşlemler</h4>
                <ul>
                    <li>
                        <span>+50 elmas</span>
                        <span>Ödüllü test tamamlama</span>
                        <span>2023-10-15</span>
                    </li>
                    <li>
                        <span>-20 elmas</span>
                        <span>Flashcard paketi satın alma</span>
                        <span>2023-10-10</span>
                    </li>
                    <li>
                        <span>+100 elmas</span>
                        <span>Premium üyelik bonusu</span>
                        <span>2023-10-01</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DiamondManagement;