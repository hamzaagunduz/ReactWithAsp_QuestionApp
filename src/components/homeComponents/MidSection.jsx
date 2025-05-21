import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/midsection.css';
import { fetchCoursesByExamId } from '../../features/Courses/CoursesSlice';  // sınav seçeneklerini almak için
import { fetchTopics, clearTopics } from '../../features/Topic/TopicSlice';  // sınav seçeneklerini almak için
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppUser } from '../../features/AppUser/AppUserSlice'; // AppUser'ı güncellemek ve almak için
import CategoryButton from "./CategoryButton"; // CategoryButton bileşenini import ediyoruz

export const MidSection = React.memo(() => {
    const navigate = useNavigate();  // useNavigate hook'u
    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);
    const { topics } = useSelector(state => state.topic);
    const { user, status: userStatus, error: userError } = useSelector(state => state.appUser);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchAppUser(Number(userId)));
        }
    }, [dispatch]);

    useEffect(() => {
        if (userStatus === "succeeded" && user?.examID) {
            dispatch(fetchCoursesByExamId(user.examID));
        }

    }, [user?.examID, dispatch]);


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


    return (
        <div className="col-12 col-md-6 offset-md-2 bg-light position-relative">
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
