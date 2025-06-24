import { useState, useEffect, useRef } from 'react';
import '../../style/leftbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../app/authService';

import housekeeper from '../../assets/leftbar/housekeeper.png';
import store from '../../assets/leftbar/store.png';
import speedometer from '../../assets/leftbar/speedometer.png';
import house from '../../assets/leftbar/house.png';
import card from '../../assets/leftbar/card-game.png';
import logoutIcon from '../../assets/leftbar/logout.png';
import menuIcon from '../../assets/leftbar/menubot.png';

export const Leftbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Menü ve buton referansları
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Menü dışına tıklanırsa menüyü kapat
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };



    // Mobile için sadece ikon gösteren bileşen
    const MobileNavIcon = ({ to, icon, text }) => (
        <Link
            to={to}
            className={`mobile-nav-icon ${location.pathname === to ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
        >
            <img src={icon} alt={text} className="icon-size" />
        </Link>
    );

    // Desktop için tam menü bileşeni
    const DesktopNavItem = ({ to, icon, text }) => (
        <li>
            <Link
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
            >
                <img src={icon} alt={text} className="icon-size" />
                <span>{text}</span>
            </Link>
        </li>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div
                className={`sidebar-container d-none d-md-block ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{ width: '19%' }}
            >
                <a href="/home" className="side-logo">
                    <span className="logo-font">
                        <span className="dob-green">Do</span><span className="bilim-blue">bilim</span>
                    </span>
                </a>

                <ul className="nav-menu">
                    <DesktopNavItem to="/home" icon={house} text="Anasayfa" />
                    <DesktopNavItem to="/card" icon={card} text="Kartlarım" />
                    <DesktopNavItem to="/exam" icon={speedometer} text="Sınavlar" />
                    <DesktopNavItem to="/shop" icon={store} text="Mağaza" />
                    <DesktopNavItem to="/profile" icon={housekeeper} text="Profil" />

                    <li>
                        <div className="nav-link logout-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <img src={logoutIcon} alt="Çıkış" className="icon-size" />
                            <span>Çıkış</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="d-md-none mobile-bottom-nav">
                <div className="mobile-nav-icons">
                    <MobileNavIcon to="/exam" icon={speedometer} text="Sınavlar" />
                    <MobileNavIcon to="/card" icon={card} text="Kartlarım" />
                    <MobileNavIcon to="/home" icon={house} text="Anasayfa" />
                    <MobileNavIcon to="/shop" icon={store} text="Mağaza" />
                    <MobileNavIcon to="/profile" icon={housekeeper} text="Profil" />
                </div>
            </div>
        </>
    );
};