// src/components/landingComponents/HeroSection.jsx

import React from 'react';
import Carousel3D from './Carousel3D';

const HeroSection = ({ items }) => {
    return (
        <section className="hero">
            <div className="container">
                <h1 data-aos="fade-up">
                    <span class="highlight-purple">Dobi</span> İle Tanışın <br />
                    Eğitimin <span class="highlight-yellow">Yeni Yüzü</span>
                </h1>
                <p data-aos="fade-up" data-aos-delay="200">
                    Yapay zeka destekli sınav platformu ile başarıya ulaş.
                </p>


                {/* SLIDER */}
                <Carousel3D items={items} />
            </div>
        </section>
    );
};

export default HeroSection;
