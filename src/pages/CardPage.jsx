import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import { CardMidSection } from "../components/cardComponents/CardMidSection";

const CardPage = () => {
    return (
        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <CardMidSection />
                <Rightbar />
            </div>
            <div className="mobile-nav-spacer"></div>

        </div>
    )
}

export default CardPage    