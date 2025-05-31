import React, { useState, useRef, useEffect } from 'react';

const Carousel3D = ({ items }) => {
    const total = items.length;
    const itemWidth = 380;
    const radius = Math.round(itemWidth / (2 * Math.tan(Math.PI / total)));
    const theta = 360 / total;

    const [angle, setAngle] = useState(0);
    const dragging = useRef(false);
    const startX = useRef(0);
    const currentAngle = useRef(0);
    const raf = useRef(null);
    const autoRotateRef = useRef(null);
    const isInteracting = useRef(false);

    const sensitivity = 0.15;
    const touchSensitivity = 0.5;

    const updateAngle = (deltaX, factor) => {
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
            const newAngle = currentAngle.current + deltaX * factor;
            setAngle(newAngle);
        });
    };

    const stopInteraction = () => {
        dragging.current = false;
        currentAngle.current = angle;
        isInteracting.current = false;
    };

    const handleMouseDown = (e) => {
        dragging.current = true;
        isInteracting.current = true;
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!dragging.current) return;
        const deltaX = e.clientX - startX.current;
        updateAngle(deltaX, sensitivity);
    };

    const handleMouseUp = () => stopInteraction();
    const handleMouseLeave = () => stopInteraction();

    const handleTouchStart = (e) => {
        dragging.current = true;
        isInteracting.current = true;
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!dragging.current) return;
        const deltaX = e.touches[0].clientX - startX.current;
        updateAngle(deltaX, touchSensitivity);
    };

    const handleTouchEnd = () => stopInteraction();

    // 🎯 Otomatik döndürme mekanizması
    useEffect(() => {
        autoRotateRef.current = setInterval(() => {
            if (!isInteracting.current) {
                setAngle((prevAngle) => {
                    const newAngle = prevAngle - theta;
                    currentAngle.current = newAngle;
                    return newAngle;
                });
            }
        }, 3000); // 3 saniye

        return () => clearInterval(autoRotateRef.current);
    }, [theta]);

    return (
        <div
            className="carousel-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: dragging.current ? 'grabbing' : 'grab', userSelect: 'none' }}
        >
            <div
                className="carousel"
                style={{
                    transform: `translateZ(-${radius}px) rotateX(-6deg) rotateY(${angle}deg)`,
                    transition: dragging.current ? 'none' : 'transform 0.3s ease-out',
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="carousel-item"
                        style={{
                            transform: `rotateY(${index * theta}deg) translateZ(${radius}px)`,
                        }}
                    >
                        <img src={item.image} alt={item.title} className="carousel-img" />
                        <div className="carousel-title">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel3D;
