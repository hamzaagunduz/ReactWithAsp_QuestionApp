// Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaChartPie,
    FaQuestionCircle,
    FaUserFriends,
    FaStore,
    FaSlidersH,
    FaSignOutAlt
} from "react-icons/fa";
import styles from '../../../style/adminPage/Layout/Layout.module.css';

const Sidebar = () => {
    const [activeHover, setActiveHover] = useState(null);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={styles.adminSidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>👑</div>
                <h2>Admin Panel</h2>
            </div>

            <ul>
                {[
                    { path: "/admin/dashboard", icon: <FaChartPie />, label: "Dashboard" }, // Genel gösterge için daha uygun
                    { path: "/admin/question", icon: <FaQuestionCircle />, label: "İşlemler" }, // Soru veya işlem için uygun
                    { path: "/admin/exam", icon: <FaQuestionCircle />, label: "Sınavlar" }, // Soru veya işlem için uygun
                    { path: "/admin/user", icon: <FaUserFriends />, label: "Kullanıcılar" }, // Kullanıcılar için daha anlamlı
                    { path: "/admin/shop", icon: <FaStore />, label: "Mağaza" }, // Mağaza için direkt ikon
                    { path: "/admin/settings", icon: <FaSlidersH />, label: "Settings" }, // Ayarlar için modern bir alternatif
                    { path: "/logout", icon: <FaSignOutAlt />, label: "Logout" } // Çıkış ikonu zaten uygun

                ].map((item, index) => (
                    <li
                        key={index}
                        className={`${isActive(item.path) ? styles.activeItem : ''}`}
                        onMouseEnter={() => setActiveHover(index)}
                        onMouseLeave={() => setActiveHover(null)}
                    >
                        <Link to={item.path}>
                            <div className={styles.iconBubble}>
                                {React.cloneElement(item.icon, {
                                    className: `${styles.sidebarIcon} ${activeHover === index ? styles.iconHover : ''}`
                                })}
                            </div>
                            <span>{item.label}</span>
                            {isActive(item.path) && <div className={styles.activeIndicator}></div>}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={styles.sidebarFooter}>
                <p>Yönetim Paneli v2.0</p>
            </div>
        </div>
    );
};

export default Sidebar;