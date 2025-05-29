// src/pages/Analysis.jsx
import React from "react";
import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import AnalysisMidSection from "../components/analysisComponents/AnalysisMidSection";
import "../style/analysisPage/Analysis.css";

function AnalysisPage() {
    return (
        <div className="container-fluid analysis-page">
            <div className="row">
                <Leftbar />
                <div className="col-12 col-md-6 offset-md-2">
                    <AnalysisMidSection />
                </div>
                <Rightbar />
            </div>
        </div>
    );
}

export default AnalysisPage;
