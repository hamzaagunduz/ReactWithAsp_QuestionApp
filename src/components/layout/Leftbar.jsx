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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const NavItem = ({ to, icon, text }) => (
        <li>
            <Link
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <img src={icon} alt={text} className="icon-size" />
                <span>{text}</span>
            </Link>
        </li>
    );

    return (
        <>
            {/* Mobile Menu Button (sadece küçük ekranlarda görünür) */}
            <div
                ref={buttonRef}
                className="mobile-menu-button d-md-none"
                onClick={toggleMobileMenu}
                style={{ cursor: 'pointer' }}
            >
                <img src={menuIcon} alt="Menu" className="menu-icon" />
            </div>

            {/* Desktop Sidebar */}
            <div
                className={`sidebar-container d-none d-md-block ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{ width: '19%' }}
            >
                <a href="/" className="side-logo">
                    <span className="logo-font">Dobi</span>
                </a>

                <ul className="nav-menu">
                    <NavItem to="/home" icon={house} text="Anasayfa" />
                    <NavItem to="/card" icon={card} text="Kartlarım" />
                    <NavItem to="/exam" icon={speedometer} text="Sınavlar" />
                    <NavItem to="/shop" icon={store} text="Mağaza" />
                    <NavItem to="/profile" icon={housekeeper} text="Profil" />

                    <li>
                        <div className="nav-link logout-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <img src={logoutIcon} alt="Çıkış" className="icon-size" />
                            <span>Çıkış</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Mobile Sidebar */}
            <div
                ref={menuRef}
                className={`sidebar-container d-md-none mobile-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
            >
                <a href="/" className="side-logo">
                    <span className="logo-font">Dobi</span>
                </a>

                <ul className="nav-menu">
                    <NavItem to="/home" icon={house} text="Anasayfa" />
                    <NavItem to="/card" icon={card} text="Kartlarım" />
                    <NavItem to="/exam" icon={speedometer} text="Sınavlar" />
                    <NavItem to="/shop" icon={store} text="Mağaza" />
                    <NavItem to="/profile" icon={housekeeper} text="Profil" />

                    <li>
                        <div className="nav-link logout-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <img src={logoutIcon} alt="Çıkış" className="icon-size" />
                            <span>Çıkış</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};
