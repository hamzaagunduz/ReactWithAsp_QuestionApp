import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLivesInfo } from '../../features/Layout/LayoutSlice'; // fetchLivesInfo import
import { fetchTopics } from '../../features/Topic/TopicSlice';
import ModalComponent from "./ModalComponent";
import NoLivesModalComponent from "./NoLivesModalComponent";

import CardComponent from "./CardComponent";

const LessonMidComponent = ({ courseID }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(courseID || null);
    const { topics } = useSelector(state => state.topic);

    // layoutSlice'dan lives değerini alıyoruz
    const healthResult = useSelector(state => state.layout.healthResult);
    const userId = localStorage.getItem('userId');
    const [showNoLivesModal, setShowNoLivesModal] = useState(false);
    useEffect(() => {
        if (userId) {
            dispatch(fetchLivesInfo(userId));
        }
    }, [userId, dispatch]);
    const lives = healthResult?.lives ?? 0;
    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopics(selectedCategory));
        }
    }, [selectedCategory, dispatch]);

    const handleBack = useCallback(() => {
        setSelectedCategory(null);
        navigate(-1);
    }, [navigate]);

    const handleNavigate = useCallback(
        (testId) => {
            if (lives < 0) {
                // Can kalmadıysa modal göster ve yönlendirme yapma
                setShowNoLivesModal(true);
            } else {
                // Can varsa sınava yönlendir
                navigate(`/train/${testId}`);
            }
        },
        [navigate, lives]
    );

    const closeNoLivesModal = () => {
        setShowNoLivesModal(false);
    };

    const colorScale = [
        "rgb(88, 204, 2)",
        "rgb(139, 0, 255)",
        "rgb(255, 69, 0)",
        "rgb(30, 144, 255)",
        "rgb(255, 215, 0)",
    ];

    const LessonContainer = ({ lesson, lessonIndex }) => {
        const [showModal, setShowModal] = useState(false);
        const handleOpenModal = () => setShowModal(true);
        const handleCloseModal = () => setShowModal(false);

        const lessonColor = colorScale[lessonIndex % colorScale.length];
        return (
            <div className="lesson-container" key={lessonIndex}>
                <div className="d-flex flex-column align-items-center">
                    <div className="mid-top-card" style={{ backgroundColor: lessonColor }}>
                        <div className="card-body d-flex flex-column flex-grow-1">
                            <p className="card-text">{lesson.name}</p>
                        </div>
                        <div className="mid-top-card-button">
                            <button className="btn btn-primary" onClick={handleOpenModal}>
                                Konu Özeti
                            </button>
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
                                    onClick={() => handleNavigate(card.testID)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <ModalComponent
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    description={lesson.description}
                />
            </div>
        );
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            <button className="back-button" onClick={handleBack}> </button>
            {topics.map((lesson, lessonIndex) => (
                <LessonContainer key={lessonIndex} lesson={lesson} lessonIndex={lessonIndex} />
            ))}
            <NoLivesModalComponent
                isOpen={showNoLivesModal}
                onClose={closeNoLivesModal}
                description={"Canınız kalmadı. Lütfen bir süre bekleyin veya can satın alın."}
            />
        </div>
    );
};

export default LessonMidComponent;
