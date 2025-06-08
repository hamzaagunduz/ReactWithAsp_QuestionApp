import React from 'react';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const UserEngagementChart = () => {
    // Grafik verileri
    const data = [
        { day: 'Pzt', users: 45 },
        { day: 'Sal', users: 78 },
        { day: 'Çar', users: 63 },
        { day: 'Per', users: 89 },
        { day: 'Cum', users: 95 },
        { day: 'Cmt', users: 54 },
        { day: 'Paz', users: 70 }
    ];

    const maxUsers = Math.max(...data.map(item => item.users));

    return (
        <div className={styles.chartContainer}>
            <h2>Kullanıcı Etkileşimi</h2>
            <div className={styles.chart}>
                {data.map((item, index) => (
                    <div key={index} className={styles.chartBarContainer}>
                        <div
                            className={styles.chartBar}
                            style={{ height: `${(item.users / maxUsers) * 100}%` }}
                        >
                            <span className={styles.chartValue}>{item.users}</span>
                        </div>
                        <div className={styles.chartLabel}>{item.day}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserEngagementChart;