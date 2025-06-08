import React, { useState, useEffect } from 'react';
import UserActions from './UserActions';
import styles from '../../../style/adminPage/UserManagement/UserManagement.module.css';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        status: 'all',
        type: 'all',
        search: ''
    });

    // Örnek kullanıcı verileri
    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                name: 'Ahmet Yılmaz',
                email: 'ahmet@example.com',
                status: 'active',
                type: 'premium',
                diamonds: 150,
                joinedDate: '2023-01-15'
            },
            {
                id: 2,
                name: 'Mehmet Kaya',
                email: 'mehmet@example.com',
                status: 'active',
                type: 'free',
                diamonds: 50,
                joinedDate: '2023-03-22'
            },
            {
                id: 3,
                name: 'Zeynep Demir',
                email: 'zeynep@example.com',
                status: 'banned',
                type: 'free',
                diamonds: 0,
                joinedDate: '2023-05-10'
            },
            {
                id: 4,
                name: 'Selin Şahin',
                email: 'selin@example.com',
                status: 'active',
                type: 'premium',
                diamonds: 300,
                joinedDate: '2023-02-01'
            }
        ];

        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
    }, []);

    // Filtreleme fonksiyonu
    useEffect(() => {
        let result = users;

        if (filters.status !== 'all') {
            result = result.filter(user => user.status === filters.status);
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
    }, [filters, users]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
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
                        <option value="inactive">Pasif</option>
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

            <div className={styles.userTable}>
                <div className={styles.tableHeader}>
                    <div>Kullanıcı</div>
                    <div>Durum</div>
                    <div>Tip</div>
                    <div>Elmas</div>
                    <div>İşlemler</div>
                </div>

                <div className={styles.tableBody}>
                    {filteredUsers.map(user => (
                        <div
                            key={user.id}
                            className={`${styles.tableRow} ${user.status === 'banned' ? styles.banned : ''}`}
                            onClick={() => onSelectUser(user)}
                        >
                            <div className={styles.userInfo}>
                                <div className={styles.avatar}>{user.name.charAt(0)}</div>
                                <div>
                                    <div className={styles.userName}>{user.name}</div>
                                    <div className={styles.userEmail}>{user.email}</div>
                                </div>
                            </div>
                            <div>
                                <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                                    {user.status === 'active' ? 'Aktif' :
                                        user.status === 'banned' ? 'Banlı' : 'Pasif'}
                                </span>
                            </div>
                            <div>
                                <span className={`${styles.typeBadge} ${styles[user.type]}`}>
                                    {user.type === 'premium' ? 'Premium' : 'Ücretsiz'}
                                </span>
                            </div>
                            <div className={styles.diamondCount}>
                                <span>💎</span> {user.diamonds}
                            </div>
                            <div>
                                <UserActions user={user} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;