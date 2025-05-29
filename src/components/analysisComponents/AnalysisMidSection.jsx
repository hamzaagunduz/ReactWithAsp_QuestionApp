import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalysis } from '../../features/Analysis/AnalysisSlice';

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
        dispatch(fetchAnalysis({ userId, range: activeTab }));
    }, [dispatch, userId, activeTab]);

    // Dersler courses objesi altında olduğu için kolay erişim
    const coursesData = analysisData?.courses || {};

    const handleEvaluateClick = (lesson) => {
        setLoadingIndexes(prev => ({ ...prev, [lesson]: true }));
        setTimeout(() => {
            // Eğer AI önerisi varsa getir, yoksa "Veri bulunamadı" yaz
            const suggestion = analysisData?.[lesson]?.suggestion || 'Bugün biyoloji çalışmanda Hücre ve Organeller konusunda sağlam bir temel attın. Canlıların sınıflandırılması konusu ise üzerinde biraz daha çalışman gereken bir alan gibi görünüyor. Yarın bu konuya ekstra zaman ayırmanı öneririm.';
            setAiAdviceList(prev => ({ ...prev, [lesson]: suggestion }));
            setLoadingIndexes(prev => ({ ...prev, [lesson]: false }));
        }, 1500);
    };

    const handleGeneralEvaluate = () => {
        setGeneralLoading(true);
        setTimeout(() => {
            setGeneralAdvice(analysisData?.general || 'Genel değerlendirme yok');
            setGeneralLoading(false);
        }, 1500);
    };

    return (
        <div className="analysis-wrapper">
            {/* Tab Seçimi */}
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
                                            <div className="ai-result-box">{aiAdviceList[lesson]}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="general-eval">
                        <h3>Genel Durum Değerlendirmesi</h3>
                        <button
                            className="evaluate-btn"
                            onClick={handleGeneralEvaluate}
                            disabled={generalLoading}
                        >
                            {generalLoading ? 'Değerlendiriliyor...' : 'Genel Yapay Zeka Değerlendir'}
                        </button>
                        {generalAdvice && <div className="ai-result-box">{generalAdvice}</div>}
                    </div>
                </>
            )}
        </div>
    );
};

export default AnalysisMidSection;
