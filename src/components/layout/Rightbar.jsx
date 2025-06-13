import React, { useEffect, useRef, useState } from "react";
import '../../style/rightbar.css';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import foreverIcon from '../../assets/forever.png';

import heart from '../../assets/rightbar/rightTopIcons/heart.png';
import goal from '../../assets/rightbar/rightTopIcons/goal.png';
import target from '../../assets/rightbar/rightTopIcons/target.png';
import diamond from '../../assets/rightbar/rightTopIcons/diamond.png';
import menu from '../../assets/rightbar/rightTopIcons/menutop.png';

import DailyMissions from './DailyMissions';

import { fetchLivesInfo } from '../../features/Layout/LayoutSlice';
import { getUserDailyMissions } from '../../features/DailyMission/DailyMissionSlice';

export const Rightbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [livesData, setLivesData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const healthStatus = useSelector((state) => state.layout.healthStatus);
    const healthResult = useSelector((state) => state.layout.healthResult);
    const { missions, missionsStatus, error } = useSelector(state => state.dailyMission);

    const handleHeartClick = () => {
        dispatch(fetchLivesInfo());
        setShowModal(true);
    };

    useEffect(() => {
        dispatch(getUserDailyMissions());
    }, [dispatch]);

    const sidebarRef = useRef(null);
    const contentWrapperRef = useRef(null);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const closeModal = () => setShowModal(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (!showModal || !healthResult?.lastLifeAddedTime) return;

        const updateTimer = () => {
            const lastLifeDate = new Date(healthResult.lastLifeAddedTime + "Z");
            const now = new Date();
            const elapsedSeconds = (now.getTime() - lastLifeDate.getTime()) / 1000;
            const intervalSeconds = 20 * 60;
            const secondsLeft = intervalSeconds - (elapsedSeconds % intervalSeconds);
            setTimeLeft(secondsLeft);
        };

        updateTimer();
        const timerId = setInterval(updateTimer, 1000);

        return () => clearInterval(timerId);
    }, [showModal, healthResult]);

    return (
        <>
            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <div className={`circle-icon-button ${isMobileMenuOpen ? 'open' : ''}`}>
                    <img
                        src={menu}
                        alt="Menü"
                        className="target-menu-icon"
                    />
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>&times;</button>
                        <h4 className="modal-title">Can Durumu</h4>
                        {healthResult ? (
                            <>
                                <p className="modal-text">
                                    Can Sayısı: <strong>
                                        {healthResult.lives > 100 ? (
                                            <img
                                                src={foreverIcon}
                                                alt="Sonsuz"
                                                className="infinite-icon"
                                            />
                                        ) : (
                                            healthResult.lives
                                        )}
                                    </strong>
                                </p>
                                {timeLeft !== null && healthResult.lives < 10 && (
                                    <p className="modal-text">
                                        Bir sonraki can eklemesine kalan süre:
                                        <strong> {formatTime(timeLeft)}</strong>
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="modal-text">Yükleniyor...</p>
                        )}
                    </div>
                </div>
            )}

            <div
                ref={sidebarRef}
                className={`right-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{ width: '29%' }}
            >
                <div ref={contentWrapperRef} className="sidebar-content">
                    <div className="score-container">
                        <ul className="score-items">
                            <Link to="/analysis" className="score-link">
                                <li className="score-item">
                                    <div className="score-icon-container">
                                        <img src={target} alt="Analiz" className="score-icon" />
                                        <p className="score-label">Analiz</p>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/diamond" className="score-link">
                                <li className="score-item">
                                    <div className="score-icon-container">
                                        <img src={diamond} alt="Elmas" className="score-icon" />
                                        <p className="score-label">Elmas</p>
                                    </div>
                                </li>
                            </Link>

                            <Link to="/achievements" className="score-link">
                                <li className="score-item">
                                    <div className="score-icon-container">
                                        <img src={goal} alt="Başarı" className="score-icon" />
                                        <p className="score-label">Başarı</p>
                                    </div>
                                </li>
                            </Link>

                            <li className="score-item" onClick={handleHeartClick}>
                                <div className="score-icon-container">
                                    <img src={heart} alt="Can" className="score-icon" />
                                    <p className="score-label">Can</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="promo-card">
                        <div className="promo-header"></div>
                        <p className="promo-title">Yapay Zeka Eklentisi</p>
                        <div className="promo-content">
                            <p className="promo-description">Çözdüğün testlerin analizine istediğinde
                                ulaş.</p>
                            <img
                                className="promo-image"
                                src="https://cdn-icons-png.flaticon.com/512/15695/15695095.png"
                                alt="AI Eklentisi"
                            />
                        </div>
                        <Link to="/shop" className="promo-link">
                            <button className="promo-button">2 HAFTA ÜCRETSİZ DENE</button>
                        </Link>
                    </div>

                    <div className="promo-card promo-card-green">
                        <div className="promo-header"></div>
                        <p className="promo-title">Sonuz Can Hakkı</p>
                        <div className="promo-content">
                            <p className="promo-description">Hiçbir kısıtlama olmadan sınırsız ders çalış</p>
                            <img
                                className="promo-image"
                                src="https://cdn-icons-png.flaticon.com/512/10473/10473357.png"
                                alt="Sınırsız Can"
                            />
                        </div>
                        <Link to="/shop" className="promo-link">
                            <button className="promo-button promo-button-green">2 HAFTA ÜCRETSİZ DENE</button>
                        </Link>
                    </div>

                    {missions && <DailyMissions missions={missions} />}


                </div>
            </div>
        </>
    );
};