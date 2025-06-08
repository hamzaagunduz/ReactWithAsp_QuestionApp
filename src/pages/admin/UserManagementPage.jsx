import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import UserList from '../../components/adminComponents/userComponents/UserList';
import UserProfile from '../../components/adminComponents/userComponents/UserProfile';
import styles from '../../style/adminPage/UserManagement/UserManagement.module.css';

const UserManagementPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    // Kullanıcı seçimi
    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <AdminLayout>
            <div className={styles.userManagementContainer}>
                <div className={styles.header}>
                    <h1>Kullanıcı Yönetimi</h1>
                    <p>Tüm kullanıcıları görüntüleyin ve yönetin</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.userListSection}>
                        <UserList onSelectUser={handleSelectUser} />
                    </div>

                    <div className={styles.userDetailSection}>
                        {selectedUser ? (
                            <UserProfile user={selectedUser} />
                        ) : (
                            <div className={styles.placeholder}>
                                <p>Bir kullanıcı seçiniz</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserManagementPage;