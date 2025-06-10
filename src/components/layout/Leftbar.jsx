// Leftbar.js with Bootstrap integration
import React, { useState } from 'react';
import '../../style/leftbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../app/authService';

// Resimleri import et
import housekeeper from '../../assets/leftbar/housekeeper.png';
import store from '../../assets/leftbar/store.png';
import speedometer from '../../assets/leftbar/speedometer.png';
import house from '../../assets/leftbar/house.png';
import card from '../../assets/leftbar/card-game.png';
import logoutIcon from '../../assets/leftbar/logout.png';
import menuIcon from '../../assets/leftbar/house.png';

export const Leftbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
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
            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="mobile-menu-button d-md-none" onClick={toggleMobileMenu}>
                <img src={menuIcon} alt="Menu" className="menu-icon" />
            </div>

            <div
                className={`sidebar-container  d-none d-md-block ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{ width: '19%' }} // 2.5 / 12 = 20.83%
            >                <a href="/" className="side-logo">
                    <span className="logo-font">Dobi</span>
                </a>

                <ul className="nav-menu">
                    <NavItem to="/" icon={house} text="Anasayfa" />
                    <NavItem to="/card" icon={card} text="Kartlarım" />
                    <NavItem to="/exam" icon={speedometer} text="Sınavlar" />
                    <NavItem to="/shop" icon={store} text="Mağaza" />
                    <NavItem to="/profile" icon={housekeeper} text="Profil" />

                    <li>
                        <div
                            className="nav-link logout-link"
                            onClick={handleLogout}
                        >
                            <img src={logoutIcon} alt="Çıkış" className="icon-size" />
                            <span>Çıkış</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Mobile Sidebar - Overlay on mobile */}
            <div className={`sidebar-container d-md-none mobile-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <a href="/" className="side-logo">
                    <span className="logo-font">Dobi</span>
                </a>

                <ul className="nav-menu">
                    <NavItem to="/" icon={house} text="Anasayfa" />
                    <NavItem to="/card" icon={card} text="Kartlarım" />
                    <NavItem to="/exam" icon={speedometer} text="Sınavlar" />
                    <NavItem to="/shop" icon={store} text="Mağaza" />
                    <NavItem to="/profile" icon={housekeeper} text="Profil" />

                    <li>
                        <div
                            className="nav-link logout-link"
                            onClick={handleLogout}
                        >
                            <img src={logoutIcon} alt="Çıkış" className="icon-size" />
                            <span>Çıkış</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};