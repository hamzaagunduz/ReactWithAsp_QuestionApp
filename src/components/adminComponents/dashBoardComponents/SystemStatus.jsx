import React from 'react';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const SystemStatus = () => {
    const systemMetrics = [
        { name: 'CPU Kullanımı', value: 65, status: 'warning' },
        { name: 'Bellek', value: 42, status: 'normal' },
        { name: 'Depolama', value: 78, status: 'critical' },
        { name: 'Ağ Trafiği', value: 34, status: 'normal' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'normal': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'critical': return '#ef4444';
            default: return '#64748b';
        }
    };

    return (
        <div className={styles.systemStatus}>
            <h2>Sistem Durumu</h2>
            <div className={styles.metricsContainer}>
                {systemMetrics.map((metric, index) => (
                    <div key={index} className={styles.metricItem}>
                        <div className={styles.metricHeader}>
                            <span>{metric.name}</span>
                            <span className={styles.metricValue}>{metric.value}%</span>
                        </div>
                        <div className={styles.metricBar}>
                            <div
                                className={styles.metricFill}
                                style={{
                                    width: `${metric.value}%`,
                                    backgroundColor: getStatusColor(metric.status)
                                }}
                            ></div>
                        </div>
                        <div className={styles.metricStatus} style={{ color: getStatusColor(metric.status) }}>
                            {metric.status === 'normal' && 'Normal'}
                            {metric.status === 'warning' && 'Uyarı'}
                            {metric.status === 'critical' && 'Kritik'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemStatus;