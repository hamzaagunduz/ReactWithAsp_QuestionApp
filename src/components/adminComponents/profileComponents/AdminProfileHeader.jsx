import styles from '../../../style/adminPage/profile/AdminProfile.module.css';

const AdminProfileHeader = ({ admin, activeTab, setActiveTab }) => {
    return (
        <div className={styles.profileHeader}>
            <div className={styles.headerTop}>
                <div className={styles.userInfo}>
                    <div className={styles.avatarContainer}>
                        <img src={admin.profileImage} alt={admin.name} className={styles.profileAvatar} />
                        <button className={styles.editAvatarButton}>
                            <i className="fas fa-camera"></i>
                        </button>
                    </div>

                    <div>
                        <h1>{admin.name}</h1>
                        <p className={styles.userTitle}>{admin.title}</p>
                    </div>
                </div>

                <div className={styles.headerActions}>
                    <button className={styles.editProfileButton}>
                        <i className="fas fa-edit"></i> Profili Düzenle
                    </button>
                </div>
            </div>

            <div className={styles.profileTabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <i className="fas fa-user"></i> Profil Bilgileri
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'notifications' ? styles.active : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    <i className="fas fa-bell"></i> Bildirimler
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'permissions' ? styles.active : ''}`}
                    onClick={() => setActiveTab('permissions')}
                >
                    <i className="fas fa-shield-alt"></i> Yetkiler
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'activity' ? styles.active : ''}`}
                    onClick={() => setActiveTab('activity')}
                >
                    <i className="fas fa-history"></i> Aktivite Geçmişi
                </button>
            </div>
        </div>
    );
};

export default AdminProfileHeader;