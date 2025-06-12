import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLivesInfo } from "../../features/Layout/LayoutSlice";
import { fetchTopicsWithGroupedTests } from "../../features/Topic/TopicSlice";
import ModalComponent from "./ModalComponent";
import NoLivesModalComponent from "./NoLivesModalComponent";
import CardComponent from "./CardComponent";
import GroupTestModalComponent from "./GroupTestModalComponent";

const LessonMidComponent = ({ courseID }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState(courseID);
    const { topics, statusTopics, errorTopics } = useSelector((state) => state.topic);

    const healthResult = useSelector((state) => state.layout.healthResult);
    const lives = healthResult?.lives ?? 0;

    const [showNoLivesModal, setShowNoLivesModal] = useState(false);
    const [selectedGroupTests, setSelectedGroupTests] = useState(null);
    const [selectedGroupColor, setSelectedGroupColor] = useState("red");
    const [activeModalLessonIndex, setActiveModalLessonIndex] = useState(null);

    const colorScale = [
        "rgb(88, 204, 2)",
        "rgba(28, 176, 246, 0.8)",
        "rgb(139, 0, 255)",
        "rgb(255, 69, 0)",
        "rgb(30, 144, 255)",
        "rgb(255, 215, 0)",
    ];

    useEffect(() => {
        dispatch(fetchLivesInfo());
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopicsWithGroupedTests(selectedCategory));
        }
    }, [selectedCategory, dispatch]);

    const handleBack = useCallback(() => {
        setSelectedCategory(null);
        navigate(-1);
    }, [navigate]);

    const handleNavigate = useCallback((testId) => {
        if (lives <= 0) {
            setShowNoLivesModal(true);
        } else {
            navigate(`/train/${testId}`);
        }
    }, [navigate, lives]);

    const openGroupModal = (tests, color) => {
        if (tests && tests.length > 0) {
            setSelectedGroupTests(tests);
            setSelectedGroupColor(color);
        }
    };

    const closeGroupModal = () => {
        setSelectedGroupTests(null);
    };

    // Loading state
    if (statusTopics === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (statusTopics === 'failed') {
        return (
            <div className="col-12 col-md-6 position-relative">
                <button className="back-button" onClick={handleBack}></button>
                <div className="alert alert-danger mt-3">
                    {errorTopics || 'Error loading topics'}
                    <button
                        className="btn btn-sm btn-primary ms-2"
                        onClick={() => dispatch(fetchTopicsWithGroupedTests(selectedCategory))}
                    >
                        Tekrar Deneyin
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (statusTopics === 'succeeded' && (!topics || topics.length === 0)) {
        return (
            <div className="col-12 col-md-6 position-relative">
                <button className="back-button" onClick={handleBack}></button>
                <div className="alert alert-info mt-3">
                    Konular Henüz Eklenmedi
                </div>
            </div>
        );
    }

    const getLessonColor = (index) => colorScale[index % colorScale.length];

    return (
        <div className="col-12 col-md-6 position-relative">
            <button className="back-button" onClick={handleBack}></button>

            {topics.map((lesson, lessonIndex) => {
                const lessonColor = getLessonColor(lessonIndex);
                const showModal = activeModalLessonIndex === lessonIndex;

                // Filter out empty test groups
                const validTestGroups = lesson.testGroups?.filter(group =>
                    group.tests?.length >= 0
                ) || [];

                return (
                    <div className="lesson-container" key={lesson.topicID || lessonIndex}>
                        <div className="d-flex flex-column align-items-center">
                            <div className="mid-top-card" style={{ backgroundColor: lessonColor }}>
                                <div className="card-body d-flex flex-column flex-grow-1">
                                    <p className="card-text">{lesson.name}</p>
                                </div>
                                <div className="mid-top-card-button">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setActiveModalLessonIndex(lessonIndex)}
                                    >
                                        Konu Özeti
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card-container">
                            <div className="container mt-4 mb-4">
                                <div className="row">
                                    {validTestGroups.length > 0 ? (
                                        validTestGroups.map((group, groupIndex) => (
                                            <CardComponent
                                                key={group.testGroupID || groupIndex}
                                                title={group.title}
                                                description={group.description || "Tıklayarak testleri görüntüleyin"}
                                                buttonText="Başla"
                                                color={lessonColor}
                                                onClick={() => openGroupModal(group.tests, lessonColor)}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-12">
                                            <div className="alert alert-warning">
                                                Bu konu için henüz test bulunmamaktadır.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <ModalComponent
                            isOpen={showModal}
                            onClose={() => setActiveModalLessonIndex(null)}
                            description={lesson.description}
                            videoLink={lesson.videoLink}
                        />
                    </div>
                );
            })}

            <NoLivesModalComponent
                isOpen={showNoLivesModal}
                onClose={() => setShowNoLivesModal(false)}
                description="Canınız kalmadı. Lütfen bir süre bekleyin veya can satın alın."
            />

            <GroupTestModalComponent
                isOpen={!!selectedGroupTests}
                onClose={closeGroupModal}
                tests={selectedGroupTests}
                color={selectedGroupColor}
                onNavigate={handleNavigate}
            />
        </div>
    );
};

export default LessonMidComponent;
