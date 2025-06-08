import React from 'react';
import AdminLayout from './AdminLayout';
import styles from '../../style/adminPage/Dasboard/AdminDasboard.module.css';
import StatCard from '../../components/adminComponents/dashBoardComponents/StatCard';
import QuickAction from '../../components/adminComponents/dashBoardComponents/QuickAction';
import RecentActivity from '../../components/adminComponents/dashBoardComponents/RecentActivity';
import UserEngagementChart from '../../components/adminComponents/dashBoardComponents/UserEngagementChart';
import TaskManager from '../../components/adminComponents/dashBoardComponents/TaskManager';
import SystemStatus from '../../components/adminComponents/dashBoardComponents/SystemStatus';

const Dashboard = () => {
    // İstatistik verileri
    const stats = [
        { title: "Toplam Kullanıcı", value: "2,458", change: "+12%", icon: "👥" },
        { title: "Aylık Gelir", value: "$24,600", change: "+18%", icon: "💰" },
        { title: "Görev Tamamlama", value: "82%", change: "+8%", icon: "✅" },
        { title: "Bekleyen İstekler", value: "18", change: "-3", icon: "⏱️" }
    ];

    // Hızlı Aksiyonlar
    const actions = [
        { label: "Kullanıcı Ekle", icon: "➕", path: "/users/add" },
        { label: "Rapor Oluştur", icon: "📊", path: "/reports" },
        { label: "Ayarlar", icon: "⚙️", path: "/settings" },
        { label: "Bildirimler", icon: "🔔", path: "/notifications" }
    ];

    return (
        <AdminLayout>
            <div className={styles.dashboardContainer}>
                {/* Başlık Alanı */}
                <div className={styles.header}>
                    <h1>Yönetim Paneli</h1>
                    <p>Hoş geldiniz! Sistem istatistikleri ve yönetim araçları</p>
                </div>

                {/* İstatistikler ve Sistem Durumu */}
                <div className={styles.statsAndSystem}>
                    <div className={styles.statsContainer}>
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    <SystemStatus />
                </div>

                {/* Kullanıcı Etkileşim Grafiği */}
                <UserEngagementChart />

                {/* Hızlı Aksiyonlar ve Aktivite */}
                <div className={styles.contentRow}>
                    <div className={styles.leftColumn}>
                        <div className={styles.actionsContainer}>
                            <h2>Hızlı Erişim</h2>
                            <div className={styles.actionsGrid}>
                                {actions.map((action, index) => (
                                    <QuickAction key={index} {...action} />
                                ))}
                            </div>
                        </div>

                        <TaskManager />
                    </div>

                    <div className={styles.activityContainer}>
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;