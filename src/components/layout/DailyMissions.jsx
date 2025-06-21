// DailyMissions.jsx
import './DailyMissions.css';

import chest from '../../assets/rightbar/dailyMissions/chest.png';
import chestopen from '../../assets/rightbar/dailyMissions/chest2.png';
import achievement1 from '../../assets/rightbar/dailyMissions/achievement.png';
import achievement2 from '../../assets/rightbar/dailyMissions/achievement2.png';
import achievement3 from '../../assets/rightbar/dailyMissions/achievement3.png';
import { Link } from 'react-router-dom';

const achievements = [achievement1, achievement2, achievement3];

const DailyMissions = ({ missions }) => {
    return (
        <div className="daily-missions">
            <div className="missions-header">
                <h3>Günlük Görevler</h3>
                <Link to="/achievements#" className="view-all">Tamamını Gör</Link>
            </div>

            <div className="missions-list">
                {missions.map((mission, index) => {
                    const percentage = Math.min(100, Math.round((mission.currentValue / mission.targetValue) * 100));
                    const image = achievements[index % achievements.length];
                    const chestImage = mission.isCompleted ? chestopen : chest;

                    return (
                        <div key={mission.dailyMissionId} className="mission-item">
                            <img className="mission-icon" src={image} alt="achievement" />
                            <div className="mission-details">
                                <p className="mission-title">{mission.title}</p>
                                <div className="mission-progress">
                                    <div
                                        className={`progress-bar ${mission.isCompleted ? 'completed' : ''}`}
                                        style={{ width: `${percentage}%` }}
                                    >
                                        <span>{percentage}%</span>
                                    </div>
                                </div>
                            </div>
                            <img className="mission-chest" src={chestImage} alt="chest" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyMissions;