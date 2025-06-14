import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const RecentActivity = () => {
    const lastFiveUsers = useSelector((state) => state.dashboard.data?.lastFiveUsers || []);
    console.log(lastFiveUsers)
    // Format the activities data
    const activities = lastFiveUsers.map(user => ({
        user: `${user.email} `,
        action: "sisteme kayıt oldu",
        time: "Yeni"
    }));

    return (
        <div>
            <h2>Son Kullanıcılar</h2>
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