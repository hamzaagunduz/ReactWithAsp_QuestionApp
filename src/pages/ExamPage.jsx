import React from 'react'
import { Rightbar } from "../components/Rightbar";
import ExamMidComponent from "../components/ExamMidComponent";
import '../style/exam.css';



import { Leftbar } from "../components/Leftbar";

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