import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent"; // CardComponent'i import ediyoruz
import '../style/midsection.css';
import logo from '../assets/mat.png'; // Resmi import et
import { fetchCourse } from '../features/Courses/CoursesSlice';  // sınav seçeneklerini almak için
import { fetchTopics } from '../features/Topic/TopicSlice';  // sınav seçeneklerini almak için
import { useDispatch, useSelector } from 'react-redux';

export const MidSection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courses, status, error } = useSelector(state => state.courses);
    const { topics, statusTopics, errorTopics } = useSelector(state => state.topic);

    useEffect(() => {
        dispatch(fetchCourse());
    }, [dispatch]);

    // Kullanıcı seçimi için state
    const [selectedCategory, setSelectedCategory] = useState(null);

    // selectedCategory değiştiğinde fetchTopics fonksiyonunu çağır
    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopics(selectedCategory)); // seçilen sınavın ID'sini kullanıyoruz
        }
    }, [selectedCategory, dispatch]);

    const handleNavigate = () => {
        navigate('/train'); // 'train' sayfasına yönlendirme
    };

    // Renk skalası
    const colorScale = [
        "rgb(88, 204, 2)", // Yeşil
        "rgb(139, 0, 255)", // Mor
        "rgb(255, 69, 0)",  // Turuncu
        "rgb(30, 144, 255)", // Mavi
        "rgb(255, 215, 0)", // Sarı
    ];

    // Geri butonunu tıklandığında ders seçimi ekranına dön
    const handleBack = () => {
        setSelectedCategory(null); // Seçilen kategoriyi sıfırlayarak ders seçimi ekranına geri dön
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title">Hazırlandığınız Sınavı Seçin</div>
                    <div className="category-list">
                        {courses.map((category, index) => (
                            <button
                                key={index}
                                className="btn btn-category mb-3"
                                onClick={() => setSelectedCategory(category.courseID)}
                            >
                                {/* Resim */}
                                <img
                                    src={logo}
                                    alt={category.name}
                                    className="category-image"
                                    style={{ width: "50px", height: "50px", marginBottom: "10px" }}
                                />
                                {/* Kategori İsmi */}
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {/* Geri Butonu */}
                    <button className="back-button" onClick={handleBack}></button>

                    {/* Ders Başlıkları ve Kartlar */}
                    {topics.map((lesson, lessonIndex) => {
                        const lessonColor = colorScale[lessonIndex % colorScale.length]; // Renk skalası içinde döngü
                        return (
                            <div className="lesson-container" key={lessonIndex}>
                                {/* Lesson Başlığı */}
                                <div className="d-flex flex-column align-items-center">
                                    <div className="mid-top-card" style={{ backgroundColor: lessonColor }}>
                                        <div className="card-body d-flex flex-column flex-grow-1">
                                            <h5 className="card-title text-muted">{lesson.title}</h5>
                                            <p className="card-text">{lesson.description}</p>
                                        </div>
                                        <div className="mid-top-card-button">
                                            <button className="btn btn-primary" onClick={handleNavigate}>Derse Başla</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-container">
                                    <div className="container mt-4 mb-4">
                                        <div className="row">
                                            {lesson.tests.map((card, cardIndex) => (
                                                <CardComponent
                                                    key={cardIndex}
                                                    title={card.title}
                                                    description={card.description}
                                                    buttonText={"Başla"}
                                                    color={lessonColor} // Kart rengi burada gönderiliyor
                                                    onClick={() => console.log(`${card.title} butonuna tıklandı`)} // Butona tıklanması durumunda yapılacak işlem
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <p style={{ height: '300vh' }}></p>
                </div>
            )}
        </div>
    );
};
