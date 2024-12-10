import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent"; // CardComponent'i import ediyoruz
import '../style/midsection.css';
import logo from '../assets/mat.png'; // Resmi import et

export const MidSection = () => {
    const navigate = useNavigate();

    // Kullanıcı seçimi için state
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleNavigate = () => {
        navigate('/train'); // 'train' sayfasına yönlendirme
    };

    // Ders verisi ve her derse ait kartlar
    const lessonsData = [
        {
            title: "İngilizce 1",
            description: "Temel kelimeler ve ifadeler.",
            cards: [
                { title: "Ekstra Karta 1", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
                { title: "Ekstra Kart 2", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
                { title: "Ekstra Kart 3", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
            ],
        },
        {
            title: "İngilizce 2",
            description: "Orta düzey kelimeler ve ifadeler.",
            cards: [
                { title: "Ekstra Kart 4", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
                { title: "Ekstra Kart 5", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
                { title: "Ekstra Kart 6", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
            ],
        },
        {
            title: "İngilizce 3",
            description: "İleri düzey kelimeler ve ifadeler.",
            cards: [
                { title: "Ekstra Kart 7", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
                { title: "Ekstra Kart 8", description: "Bu alan ek kartın içeriğidir.", buttonText: "Buton" },
            ],
        },
        // Matematik Konuları Ekleniyor
        {
            title: "Matematik 1",
            description: "Temel aritmetik ve sayı sistemleri.",
            cards: [
                { title: "Toplama", description: "Temel toplama işlemleri.", buttonText: "Öğren" },
                { title: "Çıkarma", description: "Temel çıkarma işlemleri.", buttonText: "Öğren" },
                { title: "Çarpma", description: "Temel çarpma işlemleri.", buttonText: "Öğren" },
            ],
        },
        {
            title: "Matematik 2",
            description: "Geometri ve şekiller.",
            cards: [
                { title: "Üçgen", description: "Üçgenlerin özellikleri ve hesaplamaları.", buttonText: "Öğren" },
                { title: "Dik Üçgen", description: "Dik üçgenin özellikleri.", buttonText: "Öğren" },
                { title: "Çevre ve Alan", description: "Geometrik şekillerin çevresi ve alanı.", buttonText: "Öğren" },
            ],
        },
        {
            title: "Matematik 3",
            description: "Fonksiyonlar ve denklemler.",
            cards: [
                { title: "Fonksiyonlar", description: "Fonksiyonların tanımı ve örnekleri.", buttonText: "Öğren" },
                { title: "Doğrusal Denklemler", description: "Doğrusal denklemlerle ilgili hesaplamalar.", buttonText: "Öğren" },
                { title: "Karekök", description: "Karekök işlemleri ve uygulamaları.", buttonText: "Öğren" },
            ],
        },
    ];

    const categories = [
        { name: "Matematik", lessons: lessonsData.slice(3, 6) }, // Matematik dersleri
        { name: "İngilizce", lessons: lessonsData.slice(0, 3) }, // İngilizce dersleri
        { name: "Fizik", lessons: lessonsData.slice(0, 3) }, // İngilizce dersleri
        { name: "Kimya", lessons: lessonsData.slice(0, 3) }, // İngilizce dersleri
    ];


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
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="btn btn-category mb-3"
                                onClick={() => setSelectedCategory(category)}
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
                    <button className="back-button" onClick={handleBack}>
                    </button>

                    {/* Ders Başlıkları ve Kartlar */}
                    {selectedCategory.lessons.map((lesson, lessonIndex) => {
                        const lessonColor = colorScale[lessonIndex % colorScale.length]; // Renk skalası içinde döngü
                        return (
                            <div className="lesson-container" key={lessonIndex}>
                                {/* Lesson Başlığı */}
                                <div className="d-flex flex-column align-items-center">
                                    <div className="mid-top-card " style={{ backgroundColor: lessonColor }}>
                                        <div className="card-body d-flex flex-column flex-grow-1">
                                            <h5 className="card-title text-muted">{lesson.title}</h5>
                                            <p className="card-text">{lesson.description}</p>

                                        </div>
                                        <div className="mid-top-card-button ">
                                            <button className="btn btn-primary" onClick={handleNavigate}>Derse Başla</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Kartlar */}
                                <div className="card-container">
                                    <div className="container mt-4 mb-4">
                                        <div className="row">
                                            {lesson.cards.map((card, cardIndex) => (
                                                <CardComponent
                                                    key={cardIndex}
                                                    title={card.title}
                                                    description={card.description}
                                                    buttonText={card.buttonText}
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

                    <p style={{ height: '2000px' }}>Uzun içerik... (Kaydırmak için yeterince uzun içerik ekleyin.)</p>
                </div>
            )}
        </div>
    );
};
