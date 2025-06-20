import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDailyMissions } from '../features/DailyMission/DailyMissionSlice';
import DailyMissions from "../components/layout/DailyMissions";
import { Rightbar } from "../components/layout/Rightbar";
import { Leftbar } from "../components/layout/Leftbar";
import '../style/AchievementsPage.css';  // Yeni CSS dosyasını ekle

const AchievementsPage = () => {
    const dispatch = useDispatch();

    const { missions, missionsStatus } = useSelector(state => state.dailyMission);

    useEffect(() => {
        if (missionsStatus === 'idle') {
            dispatch(getUserDailyMissions());
        }
    }, [dispatch, missionsStatus]);

    return (
        <div className="achievements-page container-fluid">
            <div className="row">
                <Leftbar />
                {missions && (
                    <div className="col-12 col-md-6 ">
                        <div className="achievements-content position-relative d-flex justify-content-center align-items-center flex-column">
                            <div className="missions-intro">
                                <div className="missions-card">
                                    <h5 className="missions-card-title">Yeni görev seni bekliyor!</h5>
                                    <p className="missions-card-subtext">Hemen başla ve daha fazla puan kazan 🏆</p>
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
