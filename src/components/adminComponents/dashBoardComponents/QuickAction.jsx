import React from 'react';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const QuickAction = ({ label, icon, path }) => {
    return (
        <div className={styles.actionCard}>
            <div className={styles.actionIcon}>{icon}</div>
            <div className={styles.actionLabel}>{label}</div>
        </div>
    );
};

export default QuickAction;