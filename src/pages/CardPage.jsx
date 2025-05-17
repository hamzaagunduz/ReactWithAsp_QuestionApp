import React from 'react'
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
        </div>
    )
}

export default CardPage    