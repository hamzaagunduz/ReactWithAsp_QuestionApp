import { Rightbar } from "../components/layout/Rightbar";
import { MidSection } from "../components/homeComponents/MidSection";
import { Leftbar } from "../components/layout/Leftbar";

const HomePage = () => {
    return (

        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <MidSection />
                <Rightbar />
            </div>
            <div className="mobile-nav-spacer"></div>

        </div>
    )
}

export default HomePage