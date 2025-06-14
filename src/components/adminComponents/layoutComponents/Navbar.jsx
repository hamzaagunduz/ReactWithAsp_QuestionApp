import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from '../../../style/adminPage/Layout/Layout.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notifications] = useState([
        { id: 1, text: 'Yeni kullanıcı kaydoldu', time: '2 dakika önce' },
        { id: 2, text: 'Sistem güncellemesi tamamlandı', time: '1 saat önce' },
    ]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        console.log('Çıkış yapılıyor...');
        // Buraya çıkış işlemleri eklenebilir
    };

    return (
        <div className={styles.adminNavbar}>
            {/* Arama bölümü */}
            <div className={styles.searchContainer}>
                <FaSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Ara..."
                    className={styles.searchInput}
                />
            </div>

            {/* Sağ bölüm - Kullanıcı kontrolleri */}
            <div className={styles.navbarRight}>
                {/* Bildirimler */}
                {/* <div className={styles.notificationIcon}>
                    <FaBell />
                    {notifications.length > 0 && (
                        <span className={styles.notificationBadge}>{notifications.length}</span>
                    )}
                </div> */}

                {/* Kullanıcı bilgileri */}
                <div className={styles.userProfile} onClick={toggleDropdown}>
                    <div className={styles.userAvatar}>
                        <FaUserCircle />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.username}>Admin</div>
                        <div className={styles.userRole}>Sistem Yöneticisi</div>
                    </div>

                    {/* Dropdown menü */}
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownHeader}>
                                <div className={styles.dropdownAvatar}>
                                    <FaUserCircle />
                                </div>
                                <div>
                                    <div className={styles.dropdownUsername}>Admin Kullanıcı</div>
                                    <div className={styles.dropdownEmail}>admin@example.com</div>
                                </div>
                            </div>

                            <div className={styles.dropdownDivider}></div>

                            {/* <button className={styles.dropdownItem} onClick={() => navigate('/admin/profile')}>
                                <FaUserCircle className={styles.dropdownIcon} />
                                <span>Profilim</span>
                            </button> */}


                            {/* <button className={styles.dropdownItem}>
                                <FaCog className={styles.dropdownIcon} />
                                <span>Hesap Ayarları</span>
                            </button> */}

                            <div className={styles.dropdownDivider}></div>

                            <button className={`${styles.dropdownItem} ${styles.logout}`} onClick={handleLogout}>
                                <FaSignOutAlt className={styles.dropdownIcon} />
                                <span>Çıkış Yap</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;