import { useNavigate } from 'react-router-dom';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const QuickAction = ({ label, icon, path }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${path}`); // path değerini "/" ile başlatarak yönlendirme yapar
    };

    return (
        <div className={styles.actionCard} onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className={styles.actionIcon}>{icon}</div>
            <div className={styles.actionLabel}>{label}</div>
        </div>
    );
};

export default QuickAction;
