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
    const [selectedCategory, setSelectedCategory] = useState(courseID || null);
    const { topics } = useSelector((state) => state.topic);
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
    }, [dispatch]);

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
        setSelectedGroupTests(tests);
        setSelectedGroupColor(color);
    };

    const closeGroupModal = () => {
        setSelectedGroupTests(null);
    };

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            <button className="back-button" onClick={handleBack}></button>

            {topics.map((lesson, lessonIndex) => {
                const lessonColor = colorScale[lessonIndex % colorScale.length];
                const showModal = activeModalLessonIndex === lessonIndex;

                return (
                    <div className="lesson-container" key={lessonIndex}>
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
                                    {lesson.testGroups?.map((group, groupIndex) => (
                                        <CardComponent
                                            key={groupIndex}
                                            title={group.title}
                                            description="Tıklayarak testleri görüntüleyin"
                                            buttonText="Başla"
                                            color={lessonColor}
                                            onClick={() => openGroupModal(group.tests, lessonColor)}
                                        />
                                    ))}
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
