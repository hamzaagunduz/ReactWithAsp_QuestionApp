// components/DailyMissions.jsx
import React from "react";
import chest from '../../assets/rightbar/dailyMissions/chest.png';
import chestopen from '../../assets/rightbar/dailyMissions/chest2.png';
import achievement1 from '../../assets/rightbar/dailyMissions/achievement.png';
import achievement2 from '../../assets/rightbar/dailyMissions/achievement2.png';
import achievement3 from '../../assets/rightbar/dailyMissions/achievement3.png';
import { Link } from 'react-router-dom'; // Link ve useLocation import edildi

const achievements = [achievement1, achievement2, achievement3];

const DailyMissions = ({ missions }) => {
    return (
        <div className="task-list bg-light p-3 shadow-sm">
            <div className="task-top-text d-flex justify-content-between gap-2">
                <p>Günlük Görevler</p>
                <Link to="/achievements#" style={{ textDecoration: 'none', color: 'inherit' }}>

                    <p>Tamamını Gör</p>
                </Link>

            </div>

            {missions.map((mission, index) => {
                const percentage = Math.min(100, Math.round((mission.currentValue / mission.targetValue) * 100));
                const image = achievements[index % achievements.length];
                const progressColorClass = mission.isCompleted ? 'bg-success' : '';
                const chestImage = mission.isCompleted ? chestopen : chest;

                return (
                    <div key={mission.dailyMissionId} className="task-item d-flex align-items-center justify-content-between mb-3">
                        <img className="task-img-small" src={image} alt="achievement" />
                        <div className="task-item-text">
                            <p>{mission.title}</p>
                            <div className="progress" style={{ width: '220px', height: '18px' }}>
                                <div
                                    className={`progress-bar ${progressColorClass}`}
                                    role="progressbar"
                                    style={{ width: `${percentage}%` }}
                                    aria-valuenow={percentage}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                        <img className="task-img-small2" src={chestImage} alt="chest" />
                    </div>
                );
            })}
        </div>
    );
};

export default DailyMissions;
