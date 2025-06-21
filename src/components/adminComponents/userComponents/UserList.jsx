import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';
import { fetchPaginatedUsers } from '../../../features/AppUser/AppUserSlice';

const UserList = ({ onSelectUser }) => {
    const dispatch = useDispatch();
    const {
        paginatedUsers,
        paginationStatus,
        error
    } = useSelector(state => state.appUser);

    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        search: ''
    });

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    console.log(paginatedUsers)

    useEffect(() => {
        dispatch(fetchPaginatedUsers({ pageNumber: currentPage, pageSize }));
    }, [dispatch, currentPage]);

    // API'den gelen veriyi işleme ve filtreleme
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        // API'den gelen kullanıcıları al (users veya data olabilir)
        const apiUsers = paginatedUsers.users || paginatedUsers.data || [];

        if (apiUsers.length === 0) {
            setFilteredUsers([]);
            return;
        }

        const mappedUsers = apiUsers.map(user => ({
            id: user.userId,
            name: `${user.firstName} ${user.surName}`,
            email: user.email,
            status: user.ban ? 'banned' : 'active',
            type: user.diamond > 500 ? 'premium' : 'free',
            diamonds: user.diamond,
            rawData: user
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
    }, [filters, paginatedUsers]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= paginatedUsers.totalPages) {
            setCurrentPage(newPage);
        }
    };

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

            {paginationStatus === 'loading' && (
                <div className={styles.loadingContainer}>
                    <p>Kullanıcılar yükleniyor...</p>
                </div>
            )}

            {paginationStatus === 'failed' && (
                <div className={styles.errorContainer}>
                    <p>Hata: {error || 'Kullanıcılar alınamadı'}</p>
                </div>
            )}

            {paginationStatus === 'succeeded' && (
                <>
                    <div className={styles.userTable}>
                        <div className={styles.tableHeader}>
                            <div>Kullanıcı</div>
                            <div>Durum</div>
                            <div>Lig</div>
                            <div>Testler</div>
                            <div>Diamond</div>
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
                                                <div className={styles.userEmail}>{user.email}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`${styles.statusBadge} ${user.status === 'banned' ? styles.banned : styles.active}`}>
                                                {user.status === 'banned' ? 'Banlı' : 'Aktif'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`${styles.leagueBadge} ${styles[user.rawData.league?.toLowerCase() || 'bronze']}`}>
                                                {user.rawData.league || 'Bronze'}
                                            </span>
                                        </div>
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
                                    </div>
                                ))
                            ) : (
                                <div className={styles.noResults}>
                                    <p>Filtrenizle eşleşen kullanıcı bulunamadı</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className={styles.paginationControls}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || paginationStatus === 'loading'}
                        >
                            Önceki
                        </button>

                        <span>
                            Sayfa {currentPage} / {paginatedUsers.totalPages || 1}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === (paginatedUsers.totalPages || 1) || paginationStatus === 'loading'}
                        >
                            Sonraki
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserList;