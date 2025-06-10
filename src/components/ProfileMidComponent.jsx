import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileStatistics } from '../features/Statistics/StatisticsSlice';
import { logout } from '../app/authService';

import '../style/profile.css';
import human from '../assets/human.png';
import { useNavigate } from 'react-router-dom'; // <--- EKLE
import foreverIcon from '../assets/forever.png';

const ProfileMidComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // <--- EKLE

    const MAX_CONSECUTIVE_DAYS = 60;
    const MAX_TOTAL_SCORE = 20000;

    const { data: statistics, status, error } = useSelector((state) => state.statistic.profileStats);

    useEffect(() => {
        dispatch(fetchUserProfileStatistics());
    }, [dispatch]);
    const handleLogout = () => {
        logout(); // localStorage temizle
        navigate('/login'); // login sayfasına yönlendir
    };

    return (
        <div className="col-12 col-md-6 bg-light position-relative">
            <div className="profile-container">
                {/* Profil Bilgileri */}
                <section className="profile-block profile-top">
                    <div className="block-header">Profil Bilgileri</div>
                    <div className="profile-content">
                        <div className="user-details">
                            <h5 className="user-name">{statistics?.firstName} {statistics?.surName}</h5>
                            <p className="user-info"> E-posta: <span>{statistics?.email} 📧</span></p>
                            <p className="user-info">
                                Can: <span>
                                    {statistics?.lives > 100 ? (
                                        <>
                                            <img
                                                src={foreverIcon}
                                                alt="Sonsuz"
                                                style={{ width: '30px', height: '30px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {statistics?.lives}❤️
                                        </>
                                    )}
                                </span>
                            </p>


                            <p className="user-info">
                                Elmas: <span>{statistics?.diamond}💎</span>
                            </p>
                        </div>
                        <div className="profile-image">
                            <img src={statistics?.imageURL || human} alt="Profil Resmi" className="profile-pic" />
                        </div>
                    </div>
                </section>

                {/* İstatistikler */}
                <section className="profile-block">
                    <div className="block-header">İstatistikler</div>
                    <div className="profile-stats">
                        <div className="stat-item"><span className="stat-title">Günlük Seri:</span><span className="stat-value">{statistics?.consecutiveDays || 0}</span></div>
                        <div className="stat-item"><span className="stat-title">Toplam Puan:</span><span className="stat-value">{statistics?.totalScore || 0}</span></div>
                        <div className="stat-item"><span className="stat-title">Mevcut Lig:</span><span className="stat-value">{statistics?.league || 'Bronz'}</span></div>
                        <div className="stat-item"><span className="stat-title">Kusursuz Testler:</span><span className="stat-value">{statistics?.perfectTestsCompleted}</span></div>
                    </div>
                </section>

                {/* Başarılar */}
                <section className="profile-block">
                    <div className="block-header">Başarılar</div>
                    <div className="achievements">

                        <div className="achievement-item">
                            <div className="profile-progress-bar">
                                <div
                                    className="profile-progress-bar-fill"
                                    style={{
                                        width: `${Math.min(((statistics?.consecutiveDays || 0) / MAX_CONSECUTIVE_DAYS) * 100, 100)}%`
                                    }}
                                ></div>
                            </div>
                            <div className="achievement-info">
                                <span className="achievement-title">İstikrarlı</span>
                                <span className="achievement-progress">{statistics?.consecutiveDays || 0}/{MAX_CONSECUTIVE_DAYS}</span>
                            </div>
                        </div>

                        <div className="achievement-item">
                            <div className="profile-progress-bar">
                                <div
                                    className="profile-progress-bar-fill"
                                    style={{
                                        width: `${Math.min(((statistics?.totalScore || 0) / MAX_TOTAL_SCORE) * 100, 100)}%`
                                    }}
                                ></div>
                            </div>
                            <div className="achievement-info">
                                <span className="achievement-title">Bilgili</span>
                                <span className="achievement-progress">{statistics?.totalScore || 0}/{MAX_TOTAL_SCORE}</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Butonlar */}
                <div className="profile-actions">
                    <button className="action-btn edit-profile">Profili Düzenle</button>
                    <button className="action-btn logout" onClick={handleLogout}>Çıkış Yap</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileMidComponent;
