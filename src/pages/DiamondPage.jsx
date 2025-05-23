import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import DiamondMidSection from "../components/diamondComponents/DiamondMidSection";

const DiamondPage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Leftbar />
                <div className="col-12 col-md-6 offset-md-2">
                    <DiamondMidSection />
                </div>
                <Rightbar />
            </div>
        </div>
    );
};

export default DiamondPage;
