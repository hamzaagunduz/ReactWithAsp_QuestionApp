import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import ShopMidSection from "../components/shopComponents/ShopMidSection";

const Shop = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Leftbar />
                <div className="col-12 col-md-6 offset-md-2">
                    <ShopMidSection />
                </div>
                <Rightbar />
            </div>
        </div>
    );
};

export default Shop;
