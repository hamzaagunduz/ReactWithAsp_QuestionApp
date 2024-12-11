import React from 'react';
import '../style/profile.css'; // CSS dosyasını bağlayabilirsiniz.
import { FaUser, FaTrophy, FaUsers, FaStar } from 'react-icons/fa'; // React Icons'dan logolar
import human from '../assets/human.png';

const ProfileMidComponent = () => {
    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">

            <div className="profile-container">

                {/* Profil Bilgileri */}
                <section className="profile-block profile-top">
                    <div className="block-header">
                        Profil Bilgileri
                    </div>
                    <div className="profile-content">

                        <div className="user-details">
                            <h5 className="user-name">Hamza Gündüz</h5>
                            <p className="user-info">E-posta: example@example.com</p>
                            <p className="user-info">Katılma Tarihi: Mart 2021</p>
                        </div>
                        <div className="profile-image">
                            <img src={human} alt="Profil Resmi" className="profile-pic" />
                        </div>
                    </div>
                </section>

                {/* İstatistikler */}
                <section className="profile-block">
                    <div className="block-header">
                        İstatistikler
                    </div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-title">Günlük Seri:</span>
                            <span className="stat-value">0</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">Toplam Puan:</span>
                            <span className="stat-value">14234</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">Mevcut Lig:</span>
                            <span className="stat-value">Yakut</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-title">İlk 3'te Tamamlama:</span>
                            <span className="stat-value">4</span>
                        </div>
                    </div>
                </section>


                {/* Arkadaş Önerileri */}

                {/* Başarılar */}
                <section className="profile-block">
                    <div className="block-header">
                        Başarılar
                    </div>
                    <div className="achievements">
                        <div className="achievement-item">
                            <div className="profile-progress-bar">
                                <div className="profile-progress-bar-fill" ></div>
                            </div>
                            <div className="achievement-info">
                                <span className="achievement-title">İstikrarlı</span>
                                <span className="achievement-progress">31/50</span>
                            </div>
                        </div>

                        <div className="achievement-item">
                            <div className="profile-progress-bar">
                                <div className="profile-progress-bar-fill" > 50</div>
                            </div>
                            <div className="achievement-info">
                                <span className="achievement-title">Bilge</span>
                                <span className="achievement-progress">14234/20000</span>
                            </div>
                        </div>
                        <div className="achievement-item">
                            <div className="profile-progress-bar">
                                <div className="profile-progress-bar-fill" ></div>
                            </div>
                            <div className="achievement-info">
                                <span className="achievement-title">Bilgin</span>
                                <span className="achievement-progress">1243/1500</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Butonlar */}
                <div className="profile-actions">
                    <button className="action-btn edit-profile">Profili Düzenle</button>
                    <button className="action-btn logout">Çıkış Yap</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileMidComponent;
