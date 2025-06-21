import { useState } from 'react';
import AdminLayout from './AdminLayout';
import BasicSettings from '../../components/adminComponents/settingsComponents/BasicSettings';
import ThemeSettings from '../../components/adminComponents/settingsComponents/ThemeSettings';
import SocialSettings from '../../components/adminComponents/settingsComponents/SocialSettings';
import SeoSettings from '../../components/adminComponents/settingsComponents/SeoSettings';
import MaintenanceSettings from '../../components/adminComponents/settingsComponents/MaintenanceSettings';
import styles from '../../style/adminPage/SiteSettings/SiteSettings.module.css';

const SiteSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <AdminLayout>
            <div className={styles.settingsContainer}>
                <div className={styles.header}>
                    <h1>Site Ayarları</h1>
                    <p>Platformunuzun genel yapılandırmasını yönetin</p>
                </div>

                <div className={styles.settingsTabs}>
                    <div className={styles.tabButtons}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'basic' ? styles.active : ''}`}
                            onClick={() => setActiveTab('basic')}
                        >
                            <i className="fas fa-cog"></i> Temel Ayarlar
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'theme' ? styles.active : ''}`}
                            onClick={() => setActiveTab('theme')}
                        >
                            <i className="fas fa-palette"></i> Tema
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'social' ? styles.active : ''}`}
                            onClick={() => setActiveTab('social')}
                        >
                            <i className="fas fa-share-alt"></i> Sosyal Medya
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'seo' ? styles.active : ''}`}
                            onClick={() => setActiveTab('seo')}
                        >
                            <i className="fas fa-chart-line"></i> SEO
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'maintenance' ? styles.active : ''}`}
                            onClick={() => setActiveTab('maintenance')}
                        >
                            <i className="fas fa-tools"></i> Bakım Modu
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'basic' && <BasicSettings />}
                        {activeTab === 'theme' && <ThemeSettings />}
                        {activeTab === 'social' && <SocialSettings />}
                        {activeTab === 'seo' && <SeoSettings />}
                        {activeTab === 'maintenance' && <MaintenanceSettings />}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SiteSettingsPage;