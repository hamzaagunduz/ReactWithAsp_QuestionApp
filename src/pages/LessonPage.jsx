import React from 'react';
import { useParams } from 'react-router-dom';
import LessonMidComponent from '../components/LessonMidComponent';  // LessonMidComponent'i import et
import { Leftbar } from "../components/Leftbar";
import { Rightbar } from "../components/Rightbar";
const LessonPage = () => {
    const { courseID } = useParams();  // URL parametresinden courseID'yi alıyoruz

    return (

        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <LessonMidComponent courseID={courseID} />
                <Rightbar />
            </div>
        </div>
    );
};

export default LessonPage;
