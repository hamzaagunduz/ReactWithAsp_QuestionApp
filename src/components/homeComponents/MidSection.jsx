import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/midsection.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';  // sınav seçeneklerini almak için
import { fetchTopics, clearTopics } from '../../features/Topic/TopicSlice';  // sınav seçeneklerini almak için
import { useDispatch, useSelector } from 'react-redux';
import CategoryButton from "./CategoryButton"; // CategoryButton bileşenini import ediyoruz

export const MidSection = React.memo(() => {
    const navigate = useNavigate();  // useNavigate hook'u
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);
    const fetchStatus = useSelector(state => state.courses.fetchStatus);


    useEffect(() => {
        dispatch(fetchCoursesByExamId());
    }, [dispatch]);


    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleBack = useCallback(() => {
        dispatch(clearTopics());
        setSelectedCategory(null);
    }, []);

    useEffect(() => {
        if (selectedCategory) {

            dispatch(fetchTopics(selectedCategory));
            // Kategori seçildiğinde yönlendirme yapılacak
            navigate(`/lesson/${selectedCategory}`);  // courseID ile yönlendiriyoruz
        }
    }, [selectedCategory, dispatch, navigate]);


    const handleCategorySelection = useCallback((categoryID) => {
        dispatch(clearTopics());
        setSelectedCategory(categoryID);
        dispatch(fetchTopics(categoryID)); // Seçilen kategoriye ait konuları al
        navigate(`/lesson/${categoryID}`);  // Kullanıcıyı ilgili kategoriye yönlendir
    }, [dispatch, navigate]);
    if (fetchStatus === 'loading') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (



        <div className="col-12 col-md-6  position-relative">
            {!selectedCategory ? (
                <div className="category-selection">
                    <div className="text-center lesson-title">Çalışmak İstediğin Dersi Seç</div>
                    <div className="category-list">
                        {courses.map((category) => (
                            <CategoryButton
                                key={category.courseID}

                                category={category}
                                onClick={handleCategorySelection} // Kategori seçildiğinde tetikleniyor
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button className="back-button" onClick={handleBack}></button>
                    <p style={{ height: "300vh" }}></p>
                </div>
            )}
        </div>
    );
});
