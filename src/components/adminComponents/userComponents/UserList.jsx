import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserActions from './UserActions';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';
import { fetchAllAppUser } from '../../../features/AppUser/AppUserSlice';

const UserList = ({ onSelectUser }) => {
    const dispatch = useDispatch();
    const { users: appUsers, status, error } = useSelector(state => state.appUser);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        search: ''
    });

    // Kullanıcı verilerini çek
    useEffect(() => {
        dispatch(fetchAllAppUser());
    }, [dispatch]);

    // Filtreleme fonksiyonu
    useEffect(() => {
        if (!appUsers || appUsers.length === 0) {
            setFilteredUsers([]);
            return;
        }

        // API'den gelen kullanıcıları bileşenin beklediği formata dönüştür
        const mappedUsers = appUsers.map(user => ({
            id: user.userId,
            name: `${user.firstName} ${user.surName}`,
            email: user.email,
            status: user.ban ? 'banned' : 'active',
            type: user.diamond > 500 ? 'premium' : 'free', // Örnek premium belirleme mantığı
            diamonds: user.diamond,
            rawData: user // Orijinal veriyi sakla
        }));

        let result = mappedUsers;

        if (filters.status !== 'all') {
            result = result.filter(user =>
                filters.status === 'banned' ? user.rawData.ban : !user.rawData.ban
            );
        }

        if (filters.type !== 'all') {
            result = result.filter(user => user.type === filters.type);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredUsers(result);
    }, [filters, appUsers]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Kullanıcı avatarı oluştur
    const getAvatar = (name) => {
        if (!name) return '?';
        const names = name.split(' ');
        return names.length > 1
            ? `${names[0].charAt(0)}${names[1].charAt(0)}`
            : name.charAt(0);
    };

    return (
        <div className={styles.userListContainer}>
            <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                    <label>Durum:</label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="all">Tümü</option>
                        <option value="active">Aktif</option>
                        <option value="banned">Banlı</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Tip:</label>
                    <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="all">Tümü</option>
                        <option value="premium">Premium</option>
                        <option value="free">Ücretsiz</option>
                    </select>
                </div>

                <div className={styles.searchGroup}>
                    <input
                        type="text"
                        placeholder="Kullanıcı ara..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>
            </div>

            {status === 'loading' && (
                <div className={styles.loadingContainer}>
                    <p>Kullanıcılar yükleniyor...</p>
                </div>
            )}

            {status === 'failed' && (
                <div className={styles.errorContainer}>
                    <p>Hata: {error || 'Kullanıcılar alınamadı'}</p>
                </div>
            )}

            {status === 'succeeded' && (
                <div className={styles.userTable}>
                    <div className={styles.tableHeader}>
                        <div>Kullanıcı</div>
                        <div>Durum</div>
                        <div>Lig</div>
                        <div>Testler</div>
                        <div>Elmas</div>
                        <div>İşlemler</div>
                    </div>

                    <div className={styles.tableBody}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    className={`${styles.tableRow} ${user.status === 'banned' ? styles.banned : ''}`}
                                    onClick={() => onSelectUser(user.rawData)}
                                >
                                    <div className={styles.userInfo}>
                                        <div className={styles.avatar}>
                                            {getAvatar(user.name)}
                                        </div>
                                        <div>
                                            <div className={styles.userName}>{user.name}</div>
                                            {/* <div className={styles.userEmail}>{user.email}</div> */}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                                            {user.status === 'banned' ? 'Banlı' : 'Aktif'}
                                        </span>
                                    </div>
                                    {/* Add League Badge */}
                                    <div>
                                        <span className={`${styles.leagueBadge} ${styles[user.rawData.league?.toLowerCase() || 'bronze']}`}>
                                            {user.rawData.league || 'Bronze'}
                                        </span>
                                    </div>
                                    {/* Add Test Stats */}
                                    <div className={styles.testStats}>
                                        <div className={styles.testStat}>
                                            <span>📝</span> {user.rawData.totalTestsCompleted || 0}
                                        </div>
                                        <div className={styles.testStat}>
                                            <span>⭐</span> {user.rawData.perfectTestsCompleted || 0}
                                        </div>
                                        <div className={styles.testStat}>
                                            <span>📊</span> {user.rawData.averageScore || 0}%
                                        </div>
                                    </div>
                                    <div className={styles.diamondCount}>
                                        <span>💎</span> {user.diamonds}
                                    </div>
                                    <div>
                                        <UserActions user={user.rawData} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                <p>Filtrenizle eşleşen kullanıcı bulunamadı</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;