import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent"; // CardComponent'i import ediyoruz
import '../style/midsection.css';
import { fetchCourse, fetchCoursesByExamId } from '../features/Courses/CoursesSlice';  // sınav seçeneklerini almak için
import { fetchTopics } from '../features/Topic/TopicSlice';  // sınav seçeneklerini almak için
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppUser } from '../features/AppUser/AppUserSlice'; // AppUser'ı güncellemek ve almak için

export const MidSection = React.memo(() => {
    const navigate = useNavigate();  // useNavigate hook'u
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);
    const { topics } = useSelector(state => state.topic);
    const { user, status: userStatus, error: userError } = useSelector(state => state.appUser);
    console.log(userStatus);

    useEffect(() => {
        if (userStatus === "succeeded") {
            dispatch(fetchAppUser(1));
        }
    }, [dispatch]);

    useEffect(() => {
        if (userStatus === "succeeded" && user?.examID) {
            console.log("iki");

            dispatch(fetchCoursesByExamId(user.examID));
        }
    }, [dispatch]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleBack = useCallback(() => {
        setSelectedCategory(null);
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchTopics(selectedCategory));
            // Kategori seçildiğinde yönlendirme yapılacak
            navigate(`/lesson/${selectedCategory}`);  // courseID ile yönlendiriyoruz
        }
    }, [selectedCategory, dispatch, navigate]);

    const handleNavigate = useCallback(
        (testId) => {
            navigate(`/train?testId=${testId}`);
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

    const CategoryButton = React.memo(({ category, index }) => (
        <button
            key={index}
            className="btn btn-category mb-3"
            onClick={() => setSelectedCategory(category.courseID)}  // Kategori seçildiğinde selectedCategory set ediliyor
        >
            <img
                src={`src${category.iconURL}`}  // Dinamik iconURL'yi src/ ile birleştiriyoruz
                alt={category.name}
                className="category-image"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
            />
            {category.name}
        </button>
    ));

    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title">Çalışmak İstediğin Dersi Seç</div>
                    <div className="category-list">
                        {courses.map((category, index) => (
                            <CategoryButton key={index} category={category} index={index} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button className="back-button" onClick={handleBack}></button>
                    <p style={{ height: '300vh' }}></p>
                </div>
            )}
        </div>
    );
});
