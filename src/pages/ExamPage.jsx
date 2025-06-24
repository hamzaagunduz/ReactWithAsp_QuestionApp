import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";

import ExamMidComponent from "../components/ExamMidComponent";
import '../style/exam.css';




function ExamPage() {
    return (
        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <div className="col-12 col-md-6 ">

                    <ExamMidComponent />
                </div>
                <Rightbar />
            </div>
            <div className="mobile-nav-spacer"></div>

        </div>
    )
}

export default ExamPage