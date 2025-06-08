import React, { useState } from 'react';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';

const UserActions = ({ user, onActionComplete }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleAction = (actionType) => {
        setShowMenu(false);
        let message = "";

        switch (actionType) {
            case 'ban':
                message = user.status === 'banned'
                    ? `${user.name} kullanıcısının banı kaldırıldı!`
                    : `${user.name} kullanıcısı banlandı!`;
                break;
            case 'premium':
                message = user.type === 'premium'
                    ? `${user.name} kullanıcısının premium üyeliği kaldırıldı!`
                    : `${user.name} kullanıcısı premium üye yapıldı!`;
                break;
            case 'delete':
                message = `${user.name} kullanıcısı silindi!`;
                break;
            default:
                break;
        }

        alert(message);
        // Burada gerçek API çağrısı yapılacak
        // onActionComplete(); // Eğer üst bileşende listeyi güncellemek gerekirse
    };

    return (
        <div className={styles.actionsContainer}>
            <button
                className={styles.actionButton}
                onClick={() => setShowMenu(!showMenu)}
            >
                •••
            </button>

            {showMenu && (
                <div className={styles.actionMenu}>
                    <button
                        className={`${styles.menuItem} ${user.status === 'banned' ? styles.unban : styles.ban}`}
                        onClick={() => handleAction('ban')}
                    >
                        {user.status === 'banned' ? 'Banı Kaldır' : 'Hesabı Banla'}
                    </button>

                    <button
                        className={`${styles.menuItem} ${user.type === 'premium' ? styles.removePremium : styles.addPremium}`}
                        onClick={() => handleAction('premium')}
                    >
                        {user.type === 'premium' ? 'Premiumu Kaldır' : 'Premium Yap'}
                    </button>

                    <button
                        className={`${styles.menuItem} ${styles.delete}`}
                        onClick={() => handleAction('delete')}
                    >
                        Hesabı Sil
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserActions;