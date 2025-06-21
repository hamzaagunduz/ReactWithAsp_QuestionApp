import { useParams } from 'react-router-dom';
import LessonMidComponent from '../components/lessonComponents/LessonMidComponent';  // LessonMidComponent'i import et
import { Leftbar } from "../components/layout/Leftbar";
import { Rightbar } from "../components/layout/Rightbar";
const LessonPage = () => {
    const { courseID } = useParams();  // URL parametresinden courseID'yi alıyoruz

    return (

        <div className="container-fluid">
            <div className="row ">
                <Leftbar />
                <LessonMidComponent courseID={courseID} />
                <Rightbar />
            </div>
        </div>
    );
};

export default LessonPage;
