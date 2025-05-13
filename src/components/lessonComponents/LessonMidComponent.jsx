
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';
import { fetchTopics } from '../../features/Topic/TopicSlice';
import { fetchAppUser } from '../../features/AppUser/AppUserSlice';
import CardComponent from "./CardComponent"; // Card bileşenini import et

const LessonMidComponent = ({ courseID }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(courseID || null);
    const { topics } = useSelector(state => state.topic);


    // Seçilen kategoriye göre konuları al
    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopics(selectedCategory)); // Seçilen kategoriye göre konuları al
        }
    }, [selectedCategory, dispatch]);

    const handleBack = useCallback(() => {
        setSelectedCategory(null);
        navigate(-1); // Geri gitmek için navigate kullanıyoruz
    }, [navigate]);

    const handleNavigate = useCallback(
        (testId) => {
            navigate(`/train/${testId}`); // testID'yi parametre olarak geçiriyoruz
        },
        [navigate]
    );

    const colorScale = [
        "rgb(88, 204, 2)", // Yeşil
        "rgb(139, 0, 255)", // Mor
        "rgb(255, 69, 0)",  // Turuncu
        "rgb(30, 144, 255)", // Mavi
        "rgb(255, 215, 0)", // Sarı
    ];

    const LessonContainer = ({ lesson, lessonIndex }) => {
        const lessonColor = colorScale[lessonIndex % colorScale.length];
        return (
            <div className="lesson-container" key={lessonIndex}>
                <div className="d-flex flex-column align-items-center">
                    <div className="mid-top-card" style={{ backgroundColor: lessonColor }}>
                        <div className="card-body d-flex flex-column flex-grow-1">
                            <h5 className="card-title text-muted">{lesson.title}</h5>
                            <p className="card-text">{lesson.description}</p>
                        </div>
                        <div className="mid-top-card-button">
                            <button className="btn btn-primary">Konu Özeti</button>
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
                                    color={lessonColor}
                                    onClick={() => handleNavigate(card.testID)} // testID'yi parametre olarak geçiriyoruz
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            <button className="back-button" onClick={handleBack}></button>
            {topics.map((lesson, lessonIndex) => (
                <LessonContainer key={lessonIndex} lesson={lesson} lessonIndex={lessonIndex} />
            ))}
            <p style={{ height: '300vh' }}></p>
        </div>
    );
};

export default LessonMidComponent;
