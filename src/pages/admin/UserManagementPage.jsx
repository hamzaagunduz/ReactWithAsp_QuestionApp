import { useState } from 'react';
import AdminLayout from './AdminLayout';
import UserList from '../../components/adminComponents/userComponents/UserList';
import UserProfile from '../../components/adminComponents/userComponents/UserProfile';
import styles from '../../style/adminPage/UserManagement/UserManagement.module.css';

const UserManagementPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <AdminLayout>
            <div className={styles.userManagementContainer}>
                <div className={styles.header}>
                    <h1>Kullanıcı Yönetimi</h1>
                    <p>Tüm kullanıcıları görüntüleyin ve yönetin</p>
                </div>

                <div className={styles.fullWidthContent}>
                    <UserList onSelectUser={handleSelectUser} />
                </div>

                {isModalOpen && selectedUser && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <button
                                className={styles.closeButton}
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                            <UserProfile
                                user={selectedUser}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UserManagementPage;