// Sidebar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/leftbar.css'; // leftbar.css dosyasını import ettik
import { Link, useLocation } from 'react-router-dom'; // Link ve useLocation import edildi

// Resimleri import et
import housekeeper from '../assets/housekeeper.png';
import calender from '../assets/calender.png';
import speedometer from '../assets/speedometer.png';
import house from '../assets/house.png';

export const Leftbar = () => {
    const location = useLocation(); // Geçerli sayfa bilgisini almak için useLocation kullanıyoruz

    return (
        <div className="col-md-2 d-none d-md-flex flex-md-column bg-light position-fixed h-100 z-1 border-r ms-xxx">
            <a href="/" className="d-flex align-items-center side-logo text-dark text-decoration-none">
                <span className="logo-font">Sidebar</span>
            </a>

            <ul className="nav flex-column li-text">
                <li>
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} // Geçerli sayfaya göre active sınıfı ekliyoruz
                    >
                        <img src={house} alt="Anasayfa" className="icon-size " /> {/* house.png ikonu */}
                        <span>Anasayfa</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/exam"
                        className={`nav-link ${location.pathname === '/exam' ? 'active' : ''}`} // Geçerli sayfaya göre active sınıfı ekliyoruz
                    >
                        <img src={speedometer} alt="Sınavlar" className="icon-size " /> {/* speedometer.png ikonu */}
                        <span>Sınavlar</span>
                    </Link>
                </li>

                <li>
                    <a href="#" className="nav-link">
                        <img src={calender} alt="Konular" className="icon-size" /> {/* calender.png ikonu */}
                        <span>Konular</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="nav-link">
                        <img src={housekeeper} alt="Profil" className="icon-size" /> {/* housekeeper.png ikonu */}
                        <span>Profil</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};
