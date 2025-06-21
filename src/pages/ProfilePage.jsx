import { Rightbar } from "../components/layout/Rightbar";
import ProfileMidComponent from "../components/profileComponents/ProfileMidComponent";
import { Leftbar } from "../components/layout/Leftbar";

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