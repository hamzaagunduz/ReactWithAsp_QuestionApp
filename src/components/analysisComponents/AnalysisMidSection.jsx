import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalysis, fetchAISuggestions } from '../../features/Analysis/AnalysisSlice';

const AnalysisMidSection = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [loadingIndexes, setLoadingIndexes] = useState({});
    const [aiAdviceList, setAiAdviceList] = useState({});
    const [generalLoading, setGeneralLoading] = useState(false);
    const [generalAdvice, setGeneralAdvice] = useState('');

    const dispatch = useDispatch();
    const { data: analysisData, loading, error } = useSelector(state => state.analysis);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(fetchAnalysis({ range: activeTab }));
        setAiAdviceList({});
        setLoadingIndexes({});
    }, [dispatch, userId, activeTab]);

    const coursesData = analysisData?.courses || {};

    const handleEvaluateClick = async (lesson) => {
        setLoadingIndexes(prev => ({ ...prev, [lesson]: true }));

        const lessonTopics = coursesData[lesson];

        if (!Array.isArray(lessonTopics)) {
            setAiAdviceList(prev => ({ ...prev, [lesson]: 'Veri yok' }));
            setLoadingIndexes(prev => ({ ...prev, [lesson]: false }));
            return;
        }

        const formattedData = lessonTopics.map(topic => ({
            topic: topic.name,
            correct: topic.correct,
            wrong: topic.wrong,
            duration: topic.time
        }));

        try {
            const response = await dispatch(fetchAISuggestions({
                analysisType: activeTab,
                data: formattedData
            })).unwrap();

            const fullSuggestion = Object.values(response).join('\n\n');
            setAiAdviceList(prev => ({ ...prev, [lesson]: fullSuggestion }));
        } catch (error) {
            setAiAdviceList(prev => ({ ...prev, [lesson]: 'AI değerlendirme hatası.' }));
        }

        setLoadingIndexes(prev => ({ ...prev, [lesson]: false }));
    };

    const handleGeneralEvaluate = () => {
        setGeneralLoading(true);
        setTimeout(() => {
            setGeneralAdvice(analysisData?.general || 'Genel değerlendirme yok');
            setGeneralLoading(false);
        }, 1500);
    };

    const formatAIText = (text) => {
        if (!text) return '';

        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')      // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>')                 // Italic
            .replace(/^\s*[-•]\s+(.*)$/gm, '<li>$1</li>')         // Bullet List
            .replace(/(?:<li>.*<\/li>)/gs, '<ul>$&</ul>')         // Wrap list
            .replace(/\n{2,}/g, '<br/><br/>')                     // Double newline to break
            .replace(/\n/g, '<br/>');                             // Single newline to <br/>
    };

    return (
        <div className="analysis-wrapper">
            <div className="analysis-tabs">
                {['daily', 'weekly', 'monthly', 'overall'].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'daily' && 'Günlük'}
                        {tab === 'weekly' && 'Haftalık'}
                        {tab === 'monthly' && 'Aylık'}
                        {tab === 'overall' && 'Genel'}
                    </button>
                ))}
            </div>

            {!loading && !error && (
                <>
                    <div className="subject-list">
                        {Object.keys(coursesData).length === 0 && <p>Ders verisi bulunamadı.</p>}

                        {Object.keys(coursesData).map((lesson) => {
                            const data = coursesData[lesson];

                            return (
                                <div className="subject-card" key={lesson}>
                                    <div className="subject-info">
                                        <h4>{lesson}</h4>
                                        {Array.isArray(data) ? (
                                            data.map((topic, idx) => (
                                                <div className="topic-box" key={idx}>
                                                    <div className="topic-name">{topic.name}</div>
                                                    <div className="topic-details">
                                                        <span>✅ {topic.correct}</span>
                                                        <span>❌ {topic.wrong}</span>
                                                        <span>⏱️ {topic.time} dk</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Geçerli konu verisi yok</p>
                                        )}
                                    </div>
                                    <div className="ai-section">
                                        <button
                                            className="evaluate-btn"
                                            onClick={() => handleEvaluateClick(lesson)}
                                            disabled={loadingIndexes[lesson]}
                                        >
                                            {loadingIndexes[lesson] ? 'Değerlendiriliyor...' : 'Yapay Zeka Değerlendir'}
                                        </button>
                                        {aiAdviceList[lesson] && (
                                            <div
                                                className="ai-result-box"
                                                dangerouslySetInnerHTML={{ __html: formatAIText(aiAdviceList[lesson]) }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default AnalysisMidSection;
