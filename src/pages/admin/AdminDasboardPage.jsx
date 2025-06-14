import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import styles from '../../style/adminPage/Dasboard/AdminDasboard.module.css';
import StatCard from '../../components/adminComponents/dashBoardComponents/StatCard';
import QuickAction from '../../components/adminComponents/dashBoardComponents/QuickAction';
import RecentActivity from '../../components/adminComponents/dashBoardComponents/RecentActivity';
import UserEngagementChart from '../../components/adminComponents/dashBoardComponents/UserEngagementChart';
import TaskManager from '../../components/adminComponents/dashBoardComponents/TaskManager';
import SystemStatus from '../../components/adminComponents/dashBoardComponents/SystemStatus';
import { fetchDashboardData } from '../../features/Dashboard/DashboardSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.dashboard.status);
    const error = useSelector((state) => state.dashboard.error);
    const dashboardData = useSelector((state) => state.dashboard.data);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    // Önce loading ve error durumlarını kontrol ediyoruz
    if (status === 'loading' || status === 'idle') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if (status === 'failed') return <div>Error: {error}</div>;
    if (!dashboardData) return <div>No data available</div>;

    // Format stats data from API response
    const stats = [
        {
            title: "Toplam Kullanıcı",
            value: dashboardData.totalUsers,
            change: "+", // This would ideally come from API
            icon: "👥"
        },
        {
            title: "Günlük Aktif Kullanıcı",
            value: dashboardData.dailyActiveUsers,
            change: "+", // This would ideally come from API
            icon: "🚀"
        },
        {
            title: "Ort. Test Tamamlama",
            value: dashboardData.averageTestCompletion.toFixed(1),
            change: "+", // This would ideally come from API
            icon: "✅"
        },
        {
            title: "Elmas Harcaması",
            value: `₿ ${dashboardData.totalDiamonds.toLocaleString()}`,
            change: "+", // This would ideally come from API
            icon: "💎"
        }
    ];

    const actions = [
        { label: "Soru Ekle", icon: "❓", path: "admin/question" },
        { label: "Kullanıcı Engelle", icon: "🚫", path: "admin/user" },
        { label: "Mağaza Yönetimi", icon: "🛒", path: "admin/shop" }
    ];

    // Format recent activities from last five users
    const recentActivities = dashboardData.lastFiveUsers.map(user => ({
        user: `${user.firstName} ${user.surName}`,
        action: "Sisteme kayıt oldu",
        time: "Yeni"
    }));

    return (
        <AdminLayout>
            <div className={styles.dashboardContainer}>
                {/* Başlık Alanı */}
                <div className={styles.header}>
                    <h1>Eğitim Platformu Yönetim Paneli</h1>
                    <p>Son 24 saatte {dashboardData.dailyActiveUsers} aktif kullanıcı | {dashboardData.averageTestCompletion.toFixed(2)} ortalama test tamamlama</p>
                </div>

                {/* İstatistik Kartları */}
                <div className={styles.statsContainer}>
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Grafik ve Sistem Durumu */}
                <div className={styles.chartRow}>
                    <UserEngagementChart
                        title="Haftalık Kullanıcı Aktivitesi"
                        data={dashboardData.weeklyActiveUsers}
                    />

                    <SystemStatus
                        serverStatus="normal"
                        dbStatus="normal"
                        activeUsers={dashboardData.dailyActiveUsers}
                        systemInfo={dashboardData.systemInfo}
                    />
                </div>

                {/* Hızlı Erişim ve Son Aktivite */}
                <div className={styles.contentRow}>
                    <div className={styles.leftColumn}>
                        <div className={styles.actionsContainer}>
                            <h2>Yönetim Araçları</h2>
                            <div className={styles.actionsGrid}>
                                {actions.map((action, index) => (
                                    <QuickAction key={index} {...action} />
                                ))}
                            </div>
                        </div>

                        {/* <TaskManager
                            tasks={[
                                { title: "Yeni soru onayı", count: 24 },
                                { title: "Şikayetler", count: 12 }
                            ]}
                        /> */}
                    </div>

                    <div className={styles.activityContainer}>
                        <RecentActivity
                            title="Son Aktivite Kayıtları"
                            activities={recentActivities}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;