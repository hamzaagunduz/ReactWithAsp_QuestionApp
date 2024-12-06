import React from 'react'
import { Rightbar } from "../components/Rightbar";
import { MidSection } from "../components/MidSection";
import { Leftbar } from "../components/Leftbar";

const HomePage = () => {
    return (

        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <MidSection />
                <Rightbar />
            </div>
        </div>
    )
}

export default HomePage