import React from 'react';
import Sidebar from '../../components/adminComponents/layoutComponents/Sidebar';
import Navbar from '../../components/adminComponents/layoutComponents/Navbar';

import styles from '../../style/adminPage/Layout/Layout.module.css';

const AdminLayout = ({ children }) => {
    return (
        <div className={styles.adminContainer}>
            <Sidebar />
            <div className={styles.adminContent}>
                <div className={styles.adminNavbar}>
                    <Navbar />
                </div>
                <div className={styles.adminMain}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
