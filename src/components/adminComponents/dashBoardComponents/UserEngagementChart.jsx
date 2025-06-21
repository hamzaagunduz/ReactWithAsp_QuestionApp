import { useSelector } from 'react-redux';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const UserEngagementChart = () => {
    const weeklyActiveUsers = useSelector((state) => state.dashboard.data?.weeklyActiveUsers || []);

    // Format the data for the chart
    const data = weeklyActiveUsers.map(item => ({
        day: item.dayName,
        users: item.count
    }));

    const maxUsers = Math.max(...data.map(item => item.users), 1) || 1; // Ensure at least 1 to avoid division by zero

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