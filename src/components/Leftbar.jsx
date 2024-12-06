// Sidebar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/leftbar.css'; // leftbar.css dosyasını import ettik

export const Leftbar = () => {
    return (
        <div className="col-md-2 d-none d-md-flex flex-md-column bg-light position-fixed   h-100 z-1 border-r ms- xxx ">

            <a href="/" className="d-flex align-items-center side-logo text-dark text-decoration-none">
                <span className="logo-font ">Sidebar</span>
            </a>

            <ul className="nav flex-column mb-auto li-text">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <i className="bi bi-house-fill icon-size me-2 "></i>
                        <span className=''>Home</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="nav-link">
                        <i className="bi bi-speedometer2 icon-size me-2"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <i className="bi bi-table icon-size me-2"></i>
                        <span>Orders</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <i className="bi bi-grid icon-size me-2"></i>
                        <span>Products</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <i className="bi bi-people icon-size me-2"></i>
                        <span>Customers</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};
