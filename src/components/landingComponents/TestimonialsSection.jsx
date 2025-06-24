import 'aos/dist/aos.css';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Ahmet Yılmaz",
            role: "Üniversite Öğrencisi",
            content: "Dobi sayesinde sınav stresimi yendim. Kişiye özel çalışma planı ve anında soru çözümü ile hedefime ulaştım. Kesinlikle tavsiye ederim!",
            avatar: "A"
        },
        {
            name: "Ayşe Kaya",
            role: "Lise Öğrencisi",
            content: "Yapay zeka destekli öğrenme deneyimi gerçekten fark yaratıyor. Eksiklerimi anında tespit edip tamamlamamı sağlıyor. Ders çalışma alışkanlıklarım tamamen değişti.",
            avatar: "A"
        },
        {
            name: "Mehmet Demir",
            role: "Eğitmen",
            content: "Öğrencilerim için harika bir kaynak. Gelişim takibi özelliği ile her öğrencinin durumunu kolayca analiz edebiliyorum. Öğrenme sürecini kişiselleştirmek için mükemmel bir araç.",
            avatar: "M"
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.sectionHeader}>
                <h2 data-aos="fade-up">Kullanıcılarımız Ne Diyor?</h2>
                <p data-aos="fade-up" data-aos-delay="100">Binlerce öğrenci ve eğitmenin deneyimleri</p>
            </div>

            <div className={styles.testimonialContainer} data-aos="fade-up">
                <div className={styles.testimonialCard}>
                    <div className={styles.avatar}>{testimonials[currentIndex].avatar}</div>
                    <div className={styles.testimonialContent}>
                        <p>"{testimonials[currentIndex].content}"</p>
                        <div className={styles.authorInfo}>
                            <h3>{testimonials[currentIndex].name}</h3>
                            <span>{testimonials[currentIndex].role}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button className={styles.controlButton} onClick={prevTestimonial} aria-label="Önceki yorum">
                        <FaChevronLeft />
                    </button>
                    <div className={styles.dots}>
                        {testimonials.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                    <button className={styles.controlButton} onClick={nextTestimonial} aria-label="Sonraki yorum">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;