import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../style/rightbar.css'; // leftbar.css dosyasını import ettik
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'; // Link ve useLocation import edildi

import heart from '../../assets/heart.png';
import goal from '../../assets/goal.png';
import target from '../../assets/target.png';
import diamond from '../../assets/diamond.png';

import DailyMissions from './DailyMissions'; // doğru path'e göre güncelleyin


import { fetchLivesInfo } from '../../features/Layout/LayoutSlice';
import { getUserDailyMissions } from '../../features/DailyMission/DailyMissionSlice';


export const Rightbar = () => {

    const [showModal, setShowModal] = useState(false);
    const [livesData, setLivesData] = useState(null);
    const userId = localStorage.getItem('userId');
    const [timeLeft, setTimeLeft] = useState(null); // Bir sonraki can eklemeye kalan saniye

    const dispatch = useDispatch();
    const healthStatus = useSelector((state) => state.layout.healthStatus);
    const healthResult = useSelector((state) => state.layout.healthResult);
    const { missions, missionsStatus, error } = useSelector(state => state.dailyMission);

    const handleHeartClick = () => {
        dispatch(fetchLivesInfo(userId));
        setShowModal(true);  // Modal açmak için
    };
    useEffect(() => {
        if (userId) {
            dispatch(getUserDailyMissions(userId));
        }
    }, [dispatch, userId]);

    const sidebarRef = useRef(null);
    const contentWrapperRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    useEffect(() => {
        const handleScroll = () => {
            if (!sidebarRef.current || !contentWrapperRef.current) return;

            const scrollTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const sidebarTop = sidebarRef.current.getBoundingClientRect().top + window.pageYOffset;
            const contentHeight = contentWrapperRef.current.getBoundingClientRect().height;

            // sticky mantığı
            if (scrollTop >= sidebarTop) {
                // `position: sticky`'yi CSS ile işletebiliriz, JS'te `top` değerini güncelliyoruz
                contentWrapperRef.current.style.position = "sticky";
                contentWrapperRef.current.style.top = "20px";  // Sayfa kaydırıldığında üstte sabit tutmak için

                // Eğer başka bir kaydırma koşulu varsa, burada translateY gibi başka stil ayarlarını yapabilirsiniz
                if (scrollTop >= contentHeight - viewportHeight + sidebarTop) {
                    // Sabitleme sonrası içerik kayması durumu
                    contentWrapperRef.current.style.transform = `translateY(-${contentHeight - viewportHeight + sidebarTop - 30}px)`;
                } else {

                    contentWrapperRef.current.style.transform = ""; // Kayma öncesi eski konum
                }
            } else {
                contentWrapperRef.current.style.position = "";
                contentWrapperRef.current.style.top = "";
                contentWrapperRef.current.style.transform = "";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Zamanı dakika:saniye formatında gösterelim
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        if (!showModal) {
            // Modal kapalıysa hiçbir şey yapma
            return;
        }

        if (!healthResult?.lastLifeAddedTime) return;

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
        <div
            ref={sidebarRef}
            className="sidebar col-md-4 flex-column bg-light d-none d-md-flex align-items-start justify-content-start h-auto "
            style={{
                position: 'relative',
                right: 0,
                top: 0,
                zIndex: 10,
            }}
        >
            <div ref={contentWrapperRef} className="content-wrapper  mt-3">

                <div className="score">
                    <ul className="list-unstyled d-flex justify-content-center align-items-center">
                        {/* Dil Seçimi Menüsü */}
                        <li
                            className="mx-3 text-center position-relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="menu-trigger d-flex flex-column align-items-center">
                                <img src={target} alt="Dil Seçimi" className="icon-sizes" />
                                <p className="mb-0 small">KPSS</p>
                            </div>

                        </li>

                        <li className="mx-3 text-center">
                            <img src={diamond} alt="Gems" className="icon-sizes " />
                            <p className="mb-0 small">Elmas</p>
                        </li>
                        <Link to="/achievements#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <li className="mx-3 text-center cursor-pointer list-none">
                                <img src={goal} alt="Başarı" className="icon-sizes" />
                                <p className="mb-0 small">Başarı</p>
                            </li>
                        </Link>
                        <li className="mx-3 text-center" onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
                            <img src={heart} alt="Hearts" className="icon-sizes " />
                            <p className="mb-0 small">Can</p>
                        </li>

                    </ul>
                </div>


                <div className="info bg-light p-3 shadow-sm">
                    <div className="info_top"></div>
                    <p className="text-right-top">Sonuz Can Hakkı</p>

                    <div className="text-container d-flex align-items-center">
                        <p className="text-muted text-right ">Burada bilgi metni yer alacak. Kullanıcının aktiviteleri.</p>
                    </div>
                    <img className=" img-small" src="https://cdn-icons-png.flaticon.com/512/15695/15695095.png" alt="" />

                    <button className=" info_btn_1 "> 2 HAFTA ÜCRETSİZ DENE</button>
                </div>


                <div className="info bg-light p-3 shadow-sm info2">
                    <div className="info_top2"></div>
                    <p className="text-right-top">Sonuz Can Hakkı</p>

                    <div className="text-container d-flex align-items-center">
                        <p className="text-muted text-right ">Burada bilgi metni yer alacak. Kullanıcının aktiviteleri.</p>
                    </div>
                    <img className=" img-small" src="https://cdn-icons-png.flaticon.com/512/10473/10473357.png" alt="" />

                    <button className="btn btn-primary "> 2 HAFTA ÜCRETSİZ DENE</button>
                </div>
                {missions && <DailyMissions missions={missions} />}


                {showModal && (
                    <div
                        className="duo-modal-overlay"
                        onClick={closeModal}
                    >
                        <div
                            className="duo-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="duo-modal-close"
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                &times;
                            </button>

                            <h4>Can Durumu</h4>
                            {healthResult ? (
                                <>
                                    <p>Can Sayısı: <strong>{healthResult.lives}</strong></p>
                                    {timeLeft !== null && healthResult.lives < 10 && (
                                        <p>Bir sonraki can eklemesine kalan süre: <strong>{formatTime(timeLeft)}</strong></p>
                                    )}

                                </>
                            ) : (
                                <p>Yükleniyor...</p>
                            )}
                        </div>
                    </div>
                )}





            </div>


        </div>
    );
};
