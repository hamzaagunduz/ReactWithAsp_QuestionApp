// src/pages/Analysis.jsx
import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import AnalysisMidSection from "../components/analysisComponents/AnalysisMidSection";
import "../style/analysisPage/Analysis.css";

function AnalysisPage() {
    return (
        <div className="container-fluid analysis-page">
            <div className="row">
                <Leftbar />
                <div className="col-12 col-md-6 ">
                    <AnalysisMidSection />
                </div>
                <Rightbar />
            </div>
            <div className="mobile-nav-spacer"></div>

        </div>
    );
}

export default AnalysisPage;
