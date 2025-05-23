import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDailyMissions } from '../features/DailyMission/DailyMissionSlice';
import DailyMissions from "../components/layout/DailyMissions";
import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";

const AchievementsPage = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const { missions, missionsStatus } = useSelector(state => state.dailyMission);

    useEffect(() => {
        if (userId && missionsStatus === 'idle') {
            dispatch(getUserDailyMissions(userId));
        }
    }, [dispatch, userId, missionsStatus]);

    return (
        <div className="container-fluid">
            <style>{`
    .duo-container-s {
        padding: 2rem;
        border-radius: 20px;
        font-family: 'Nunito', 'Segoe UI', sans-serif;
        width: 100%;
   
    }

    .duo-task-card {
        background-color: rgb(0 166 255 / 42%);
        border-radius: 16px;
        border: none;
        box-shadow: rgba(34, 148, 236, 0.645) 0px 4px 0px 0px;
        padding: 24px;
        margin-bottom: 24px;
        transition:  0.2s ease, box-shadow 0.2s ease;
        animation: popIn 0.4s ease-out;
    }

    .duo-task-card:hover {
        box-shadow: rgba(20, 116, 189, 0.87) 0px 4px 0px 0px;
    }

    .duo-card-title {
        font-size: 22px;
        font-weight: 800;
        color:rgb(255, 255, 255);
        margin-bottom: 10px;
    }

    .duo-card-subtext {
        font-size: 17px;
        font-weight: 400;
        color:rgb(38, 117, 80);
    }

    @keyframes popIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`}</style>


            <div className="row">
                <Leftbar />
                {missions && (
                    <div className="col-12 col-md-6 offset-md-2">
                        <div className="bg-light position-relative d-flex justify-content-center align-items-center flex-column">
                            <div className="duo-container-s">


                                <div className="duo-task-card">
                                    <h5 className="duo-card-title">Yeni görev seni bekliyor!</h5>
                                    <p className="duo-card-subtext">Hemen başla ve daha fazla puan kazan 🏆</p>
                                </div>
                            </div>

                            <DailyMissions missions={missions} />
                        </div>
                    </div>
                )}
                <Rightbar />
            </div>
        </div>
    );
};

export default AchievementsPage;
