import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const StatCard = ({ title, value, change, icon }) => {
    return (
        <div className={styles.statCard}>
            <div className={styles.statIcon}>{icon}</div>
            <div className={styles.statContent}>
                <h3>{title}</h3>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.statChange}>{change}</div>
            </div>
        </div>
    );
};

export default StatCard;