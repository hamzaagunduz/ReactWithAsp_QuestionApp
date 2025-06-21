import { useSelector } from 'react-redux';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const SystemStatus = () => {
    const systemInfo = useSelector((state) => state.dashboard.data?.systemInfo || {});

    const systemMetrics = [
        { name: 'CPU Kullanımı', value: systemInfo.cpuUsage || 0, status: getUsageStatus(systemInfo.cpuUsage) },
        { name: 'Bellek', value: systemInfo.memoryUsage || 0, status: getUsageStatus(systemInfo.memoryUsage) },
        { name: 'Depolama', value: systemInfo.diskUsage || 0, status: getUsageStatus(systemInfo.diskUsage) },
        { name: 'Ağ Trafiği', value: systemInfo.networkUsage || 0, status: getUsageStatus(systemInfo.networkUsage) }
    ];

    function getUsageStatus(value) {
        if (!value) return 'normal';
        if (value > 80) return 'critical';
        if (value > 60) return 'warning';
        return 'normal';
    }

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
                            <span className={styles.metricValue}>{metric.value.toFixed(1)}%</span>
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