import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminProfileHeader from '../../components/adminComponents/profileComponents/AdminProfileHeader';
import AdminInfoCard from '../../components/adminComponents/profileComponents/AdminInfoCard';
import SecuritySettings from '../../components/adminComponents/profileComponents/SecuritySettings';
import ActivityLog from '../../components/adminComponents/profileComponents/ActivityLog';
import NotificationSettings from '../../components/adminComponents/profileComponents/NotificationSettings';
import styles from '../../style/adminPage/profile/AdminProfile.module.css';

const AdminProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    // Admin verileri (örnek)
    const adminData = {
        name: "Mehmet Kaya",
        title: "Sistem Yöneticisi",
        email: "mehmet@dobira.com",
        lastLogin: "2023-10-15 14:30:45",
        joinDate: "15 Ocak 2023",
        permissions: ["Kullanıcı Yönetimi", "İçerik Yönetimi", "Raporlama"],
        profileImage: "/images/avatars/admin.jpg",
        activityLog: [
            { id: 1, action: "Kullanıcı ekledi", target: "Ahmet Yılmaz", time: "2 saat önce" },
            { id: 2, action: "Sınav güncelledi", target: "YKS", time: "1 gün önce" },
            { id: 3, action: "Rapor oluşturdu", target: "Aylık İstatistikler", time: "2 gün önce" },
            { id: 4, action: "Ürün ekledi", target: "500 Elmas Paketi", time: "3 gün önce" }
        ]
    };

    return (
        <AdminLayout>
            <div className={styles.adminProfileContainer}>
                <AdminProfileHeader
                    admin={adminData}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <div className={styles.profileContent}>
                    {activeTab === 'profile' && (
                        <div className={styles.profileGrid}>
                            <div className={styles.leftColumn}>
                                <AdminInfoCard admin={adminData} />
                                <SecuritySettings />
                            </div>

                            <div className={styles.rightColumn}>
                                <ActivityLog activities={adminData.activityLog} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className={styles.notificationsSection}>
                            <NotificationSettings />
                        </div>
                    )}

                    {activeTab === 'permissions' && (
                        <div className={styles.permissionsSection}>
                            <h2>Yetki Yönetimi</h2>
                            <div className={styles.permissionsCard}>
                                <p>Bu bölümde yetkilerinizi görüntüleyebilir ve yönetebilirsiniz.</p>

                                <div className={styles.permissionsList}>
                                    {adminData.permissions.map((permission, index) => (
                                        <div key={index} className={styles.permissionItem}>
                                            <i className="fas fa-check-circle"></i>
                                            <span>{permission}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={styles.requestButton}>
                                    <i className="fas fa-plus"></i> Yeni Yetki İsteği
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfilePage;