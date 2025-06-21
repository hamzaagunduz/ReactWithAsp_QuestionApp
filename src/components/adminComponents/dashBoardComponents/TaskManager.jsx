import { useState } from 'react';
import styles from '../../../style/adminPage/Dasboard/AdminDasboard.module.css';

const TaskManager = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Raporları gözden geçir', completed: false },
        { id: 2, title: 'Kullanıcı geri bildirimlerini yanıtla', completed: true },
        { id: 3, title: 'Sistem güncellemesi planla', completed: false },
        { id: 4, title: 'Yeni özellik testleri', completed: false }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className={styles.taskManager}>
            <h2>Görev Yöneticisi</h2>
            <div className={styles.taskList}>
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                        onClick={() => toggleTask(task.id)}
                    >
                        <div className={styles.taskCheckbox}>
                            {task.completed ? '✓' : ''}
                        </div>
                        <div className={styles.taskTitle}>{task.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.taskForm}>
                <input
                    type="text"
                    placeholder="Yeni görev ekle..."
                    className={styles.taskInput}
                />
                <button className={styles.taskAddButton}>Ekle</button>
            </div>
        </div>
    );
};

export default TaskManager;