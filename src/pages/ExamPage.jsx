import React from 'react'
import { Rightbar } from "../components/layout/Rightbar";
import ExamMidComponent from "../components/ExamMidComponent";
import '../style/exam.css';



import { Leftbar } from "../components/layout/Leftbar";

function ExamPage() {
    return (
        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <ExamMidComponent />

                <Rightbar />
            </div>
        </div>)
}

export default ExamPage