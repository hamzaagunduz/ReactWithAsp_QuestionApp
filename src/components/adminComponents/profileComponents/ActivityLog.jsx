import React from 'react';
import styles from '../../../style/adminPage/profile/AdminProfile.module.css';

const ActivityLog = ({ activities }) => {
    return (
        <div className={styles.activityCard}>
            <div className={styles.cardHeader}>
                <h2>Aktivite Geçmişi</h2>
                <button className={styles.exportButton}>
                    <i className="fas fa-download"></i> Dışa Aktar
                </button>
            </div>

            <div className={styles.activityList}>
                {activities.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                        <div className={styles.activityIcon}>
                            <i className="fas fa-history"></i>
                        </div>
                        <div className={styles.activityContent}>
                            <div className={styles.activityAction}>
                                <strong>{activity.action}</strong>
                                <span>{activity.target}</span>
                            </div>
                            <div className={styles.activityTime}>
                                {activity.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.seeAll}>
                <button className={styles.seeAllButton}>
                    Tüm Aktivite Geçmişini Gör <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default ActivityLog;