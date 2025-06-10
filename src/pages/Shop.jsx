import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import ShopMidSection from "../components/shopComponents/ShopMidSection";

const Shop = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Leftbar />
                <div className="col-12 col-md-6">
                    <ShopMidSection />
                </div>
                <Rightbar className="" />
            </div>
        </div>
    );
};

export default Shop;
