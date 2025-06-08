import React from 'react';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const RecentActivity = () => {
    const activities = [
        { user: "Ahmet Yılmaz", action: "yeni kullanıcı ekledi", time: "2 dakika önce" },
        { user: "Mehmet Kaya", action: "proje güncelledi", time: "1 saat önce" },
        { user: "Zeynep Demir", action: "rapor oluşturdu", time: "3 saat önce" },
        { user: "Selin Şahin", action: "ayarları güncelledi", time: "1 gün önce" }
    ];

    return (
        <div>
            <h2>Son Aktivite</h2>
            <ul className={styles.activityList}>
                {activities.map((activity, index) => (
                    <li key={index} className={styles.activityItem}>
                        <div className={styles.activityIcon}>●</div>
                        <div>
                            <strong>{activity.user}</strong> {activity.action}
                            <div className={styles.activityTime}>{activity.time}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;