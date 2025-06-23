// components/homeComponents/LessonMidComponent.jsx
import { useState, useEffect, useCallback, useRef } from "react";
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

    // Son görüntülenen konu ID'sini saklamak için ref
    const lastViewedTopicRef = useRef(null);
    const hasScrolledRef = useRef(false);

    const healthResult = useSelector((state) => state.layout.healthResult);
    const lives = healthResult?.lives ?? 0;

    const [showNoLivesModal, setShowNoLivesModal] = useState(false);
    const [selectedGroupTests, setSelectedGroupTests] = useState(null);
    const [selectedGroupColor, setSelectedGroupColor] = useState("red");
    const [activeModalLessonIndex, setActiveModalLessonIndex] = useState(null);

    // Updated color palette for lesson cards
    const lessonColors = [
        { primary: "#7ed957", secondary: "#6ac34f" },
        { primary: "#3cb7c9", secondary: "#5ce1e6" },
        { primary: "#4a148c", secondary: "#9c27b0" },
        { primary: "#5b0a0c", secondary: "#ff4d6d" },
        { primary: "#292b2f", secondary: "#5d8aa8" },
        { primary: "#fa8010", secondary: "#ffb347" },
        { primary: "#5b6221", secondary: "#a3c14a" },
        { primary: "#930002", secondary: "#ff5e62" },
        { primary: "#377515", secondary: "#7cba00" },
        { primary: "#0d47a1", secondary: "#2196f3" },
    ];

    useEffect(() => {
        dispatch(fetchLivesInfo());

        const savedTopicId = localStorage.getItem(`lastViewedTopic_${courseID}`);
        if (savedTopicId) {
            lastViewedTopicRef.current = savedTopicId;
        }
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopicsWithGroupedTests(selectedCategory));
        }
    }, [selectedCategory, dispatch]);

    useEffect(() => {
        if (statusTopics === 'succeeded' && !hasScrolledRef.current) {
            const timer = setTimeout(() => {
                if (lastViewedTopicRef.current) {
                    const element = document.getElementById(`lesson-${lastViewedTopicRef.current}`);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
                hasScrolledRef.current = true;
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [statusTopics]);

    const handleBack = useCallback(() => {
        setSelectedCategory(null);
        navigate(-1);
    }, [navigate]);

    const handleNavigate = useCallback((testId) => {
        if (lives <= 0) {
            setSelectedGroupTests(null);
            setShowNoLivesModal(true);
        } else {
            navigate(`/train/${testId}`);
        }
    }, [navigate, lives]);

    const openGroupModal = (tests, color, topicId) => {
        if (tests && tests.length > 0) {
            setSelectedGroupTests(tests);
            setSelectedGroupColor(color);

            // Konu ID'sini localStorage'a kaydet
            localStorage.setItem(`lastViewedTopic_${courseID}`, topicId);
            lastViewedTopicRef.current = topicId;
        }
    };

    const closeGroupModal = () => {
        setSelectedGroupTests(null);
    };

    const handleOpenModal = (lessonIndex, topicId) => {
        setActiveModalLessonIndex(lessonIndex);

        // Konu ID'sini localStorage'a kaydet
        localStorage.setItem(`lastViewedTopic_${courseID}`, topicId);
        lastViewedTopicRef.current = topicId;
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

    return (
        <div className="col-12 col-md-6 position-relative">
            <button className="back-button" onClick={handleBack}>
            </button>

            {topics.map((lesson, lessonIndex) => {
                const colorSet = lessonColors[lessonIndex % lessonColors.length];
                const showModal = activeModalLessonIndex === lessonIndex;

                // Filter out empty test groups
                const validTestGroups = lesson.testGroups?.filter(group =>
                    group.tests?.length >= 0
                ) || [];

                return (
                    <div
                        className="lesson-container"
                        key={lesson.topicID || lessonIndex}
                        id={`lesson-${lesson.topicID}`}
                    >
                        <div className="d-flex flex-column align-items-center">
                            {/* Redesigned Lesson Card */}
                            <div
                                className="lesson-card"
                                style={{
                                    "--card-bg-color-1": colorSet.primary,
                                    "--card-bg-color-2": colorSet.secondary,
                                }}
                            >
                                <div className="lesson-bg-card"></div>
                                <div className="lesson-content-card">
                                    <div className="lesson-title-container">
                                        <span className="lesson-name-card">{lesson.name}</span>
                                    </div>
                                    <button
                                        className="summary-button-card"
                                        onClick={() => handleOpenModal(lessonIndex, lesson.topicID)}
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
                                                colors={colorSet}
                                                onClick={() => openGroupModal(
                                                    group.tests,
                                                    colorSet,
                                                    lesson.topicID  // Konu ID'sini geçir
                                                )}
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