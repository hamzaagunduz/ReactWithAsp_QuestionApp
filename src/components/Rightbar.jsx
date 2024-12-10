import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../style/rightbar.css'; // leftbar.css dosyasını import ettik

import heart from '../assets/heart.png';
import goal from '../assets/goal.png';
import target from '../assets/target.png';
import diamond from '../assets/diamond.png';


export const Rightbar = () => {
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
            console.log(sidebarTop)

            if (scrollTop >= contentHeight - viewportHeight + sidebarTop) {
                contentWrapperRef.current.style.transform = `translateY(-${contentHeight - viewportHeight + sidebarTop}px)`;
                contentWrapperRef.current.style.position = "fixed";
            } else {
                contentWrapperRef.current.style.transform = "";
                contentWrapperRef.current.style.position = "";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                                <p className="mb-0 small">YKS</p>
                            </div>
                            {isHovered && (
                                <ul className="menu-dropdown position-absolute">
                                    <li className="menu-item">YKS</li>
                                    <li className="menu-item">ALESS</li>
                                    <li className="menu-item">KPSS</li>
                                </ul>
                            )}
                        </li>

                        <li className="mx-3 text-center">
                            <img src={diamond} alt="Gems" className="icon-sizes " />
                            <p className="mb-0 small">Elmas</p>
                        </li>
                        <li className="mx-3 text-center">
                            <img src={goal} alt="Başarı" className="icon-sizes " />
                            <p className="mb-0 small">Başarı</p>
                        </li>
                        <li className="mx-3 text-center">
                            <img src={heart} alt="Hearts" className="icon-sizes " />
                            <p className="mb-0 small">Can</p>
                        </li>

                    </ul>
                </div>

                <div className="info bg-light p-3 shadow-sm">
                    <img className="mt-1 mb-2" src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg" alt="" />
                    <p className="text-right-top">Süper'i ücretsiz dene</p>

                    <div className="text-container d-flex align-items-center">
                        <p className="text-muted text-right ">Burada bilgi metni yer alacak. Kullanıcının aktiviteleri.</p>
                    </div>
                    <img className=" img-small" src="https://d35aaqx5ub95lt.cloudfront.net/images/super/fb7130289a205fadd2e196b9cc866555.svg" alt="" />

                    <button className="btn btn-primary "> 2 HAFTA ÜCRETSİZ DENE</button>
                </div>


                <div className="info2 bg-light p-3 shadow-sm">
                    <img className="mt-1 mb-2" src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg" alt="" />
                    <p className="text-right-top">Süper'i ücretsiz dene</p>

                    <div className="text-container d-flex align-items-center">
                        <p className="text-muted text-right ">Burada bilgi metni yer alacak. Kullanıcının aktiviteleri.</p>
                    </div>
                    <img className=" img-small" src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/74d6ab6e5b6f92e7d16a4a6664d1fafd.svg" alt="" />

                    <button className="btn btn-primary "> 2 HAFTA ÜCRETSİZ DENE</button>
                </div>

                <div className="task-list bg-light p-3 shadow-sm">

                    <div className="task-top-text d-flex justify-content-between gap-2">
                        <p className="">Günlük Görevler</p>
                        <p className="">Tümünü Göster</p>
                    </div>



                    <div className="task-item d-flex align-items-center justify-content-between mb-3">
                        <img className="task-img-small " src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/74d6ab6e5b6f92e7d16a4a6664d1fafd.svg" alt="" />
                        <div className="task-item-text">
                            <p>Süper'i ücretsiz dene</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '120px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>

                            </div>

                        </div>
                        <img className="task-img-small2 " src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg" alt="" />

                    </div>
                    <div className="task-item d-flex align-items-center justify-content-between mb-3">
                        <img className="task-img-small " src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/74d6ab6e5b6f92e7d16a4a6664d1fafd.svg" alt="" />
                        <div className="task-item-text">
                            <p>Süper'i ücretsiz dene</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '120px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>

                            </div>

                        </div>
                        <img className="task-img-small2 " src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg" alt="" />

                    </div>
                    <div className="task-item d-flex align-items-center justify-content-between mb-3">
                        <img className="task-img-small " src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/74d6ab6e5b6f92e7d16a4a6664d1fafd.svg" alt="" />
                        <div className="task-item-text">
                            <p>Süper'i ücretsiz dene</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '120px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>

                            </div>

                        </div>
                        <img className="task-img-small2 " src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg" alt="" />

                    </div>
                    <div className="task-item d-flex align-items-center justify-content-between mb-3">
                        <img className="task-img-small " src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/74d6ab6e5b6f92e7d16a4a6664d1fafd.svg" alt="" />
                        <div className="task-item-text">
                            <p>Süper'i ücretsiz dene</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: '120px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>

                            </div>

                        </div>
                        <img className="task-img-small2 " src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg" alt="" />

                    </div>




                </div>






            </div>


        </div>
    );
};
