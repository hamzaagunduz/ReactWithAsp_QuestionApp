import React from 'react'
import { Rightbar } from "../components/Rightbar";
import ProfileMidComponent from "../components/ProfileMidComponent";
import { Leftbar } from "../components/Leftbar";

const ProfilePage = () => {
    return (

        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <ProfileMidComponent />
                <Rightbar />
            </div>
        </div>
    )
}

export default ProfilePage