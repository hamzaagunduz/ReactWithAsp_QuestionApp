import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../style/adminPage/Question/EditQuestionModal.module.css';
import { fetchFlashCardsByQuestionId } from '../../../features/FlashCard/FlashCardSlice'; // Import the flashcard action
import { updateFullQuestion, deleteQuestion, fetchQuestionsByTestId } from '../../../features/Question/QuestionSlice'; // doğru importu unutma
import { imgUrl } from '../../../app/apiClient';

const EditQuestionModal = ({
    isOpen,
    onClose,
    onSubmit,
    onDelete,
    testTopics
}) => {
    const dispatch = useDispatch();
    const { questions, status, error } = useSelector(state => state.question);
    const { flashCards, status: flashCardStatus } = useSelector(state => state.flashCard);

    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedTestGroup, setSelectedTestGroup] = useState('');
    const [selectedTest, setSelectedTest] = useState('');
    const [testsList, setTestsList] = useState([]);
    const [testGroupsList, setTestGroupsList] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        questionID: null,
        questionText: '',
        options: ['', '', '', '', ''],
        answer: 0,
        flashCardFront: '',
        flashCardBack: '',
        removeFlashCard: false,
        questionImage: null,
        optionAImage: null,
        optionBImage: null,
        optionCImage: null,
        optionDImage: null,
        optionEImage: null,
        existingImages: {}
    });

    // Find selected topic object
    const currentTopic = testTopics?.find(t => t.topicID === parseInt(selectedTopic));

    // Find selected test group object
    const currentTestGroup = currentTopic?.testGroups?.find(
        g => g.testGroupID === parseInt(selectedTestGroup)
    );

    // Find selected test object
    const currentTest = currentTestGroup?.tests?.find(
        t => t.testID === parseInt(selectedTest)
    );

    // Topic selection handler
    useEffect(() => {
        if (selectedTopic) {
            setTestGroupsList(currentTopic?.testGroups || []);
            setSelectedTestGroup('');
            setSelectedTest('');
            setTestsList([]);
            setSelectedQuestion(null);
        }
    }, [selectedTopic]);

    // Test group selection handler
    useEffect(() => {
        if (selectedTestGroup) {
            setTestsList(currentTestGroup?.tests || []);
            setSelectedTest('');
            setSelectedQuestion(null);
        }
    }, [selectedTestGroup]);

    // Test selection handler
    useEffect(() => {
        if (selectedTest) {
            // Dispatch the Redux action to fetch questions
            dispatch(fetchQuestionsByTestId(selectedTest));
            setSelectedQuestion(null);
        } else {
            // Clear questions if no test is selected
            dispatch({ type: 'question/fetchQuestionsByTestId/fulfilled', payload: [] });
        }
    }, [selectedTest, dispatch]);

    // When a question is selected, fetch its flashcard
    useEffect(() => {
        if (selectedQuestion && selectedQuestion.questionID) {
            dispatch(fetchFlashCardsByQuestionId(selectedQuestion.questionID));
        }
    }, [selectedQuestion, dispatch]);

    // Update form data when flashcard is loaded
    useEffect(() => {
        if (selectedQuestion && flashCards.length > 0) {
            const flashCard = flashCards[0]; // Get the first flashcard
            setFormData(prev => ({
                ...prev,
                flashCardFront: flashCard.front,
                flashCardBack: flashCard.back
            }));
        }
    }, [flashCards, selectedQuestion]);

    // Load selected question data
    useEffect(() => {
        if (selectedQuestion) {
            // Create existing images object
            const existingImages = {};

            // Process images array to map by type
            selectedQuestion.images?.forEach(image => {
                const typeMap = {
                    0: 'question',
                    1: 'optionA',
                    2: 'optionB',
                    3: 'optionC',
                    4: 'optionD',
                    5: 'optionE'
                };

                if (typeMap[image.type] !== undefined) {
                    existingImages[typeMap[image.type]] = image.imageUrl;
                }
            });

            setFormData({
                questionID: selectedQuestion.questionID,
                questionText: selectedQuestion.text,
                options: [
                    selectedQuestion.optionA || '',
                    selectedQuestion.optionB || '',
                    selectedQuestion.optionC || '',
                    selectedQuestion.optionD || '',
                    selectedQuestion.optionE || ''
                ],
                answer: selectedQuestion.answer - 1, // Adjust for 0-based index
                flashCardFront: '', // Will be set by flashcard effect
                flashCardBack: '',  // Will be set by flashcard effect
                removeFlashCard: false,
                questionImage: null,
                optionAImage: null,
                optionBImage: null,
                optionCImage: null,
                optionDImage: null,
                optionEImage: null,
                existingImages
            });
        }
    }, [selectedQuestion]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleImageChange = (field, file) => {
        setFormData({
            ...formData,
            [field]: file,
            existingImages: {
                ...formData.existingImages,
                [field.split('Image')[0]]: null // Clear existing image preview
            }
        });
    };

    const handleSubmit = async () => {
        const payload = new FormData();
        payload.append('questionID', formData.questionID);
        payload.append('text', formData.questionText);
        payload.append('optionA', formData.options[0]);
        payload.append('optionB', formData.options[1]);
        payload.append('optionC', formData.options[2]);
        payload.append('optionD', formData.options[3]);
        payload.append('optionE', formData.options[4]);
        payload.append('answer', formData.answer + 1); // DB için 1-based index

        if (formData.questionImage) payload.append('questionImage', formData.questionImage);
        if (formData.optionAImage) payload.append('optionAImage', formData.optionAImage);
        if (formData.optionBImage) payload.append('optionBImage', formData.optionBImage);
        if (formData.optionCImage) payload.append('optionCImage', formData.optionCImage);
        if (formData.optionDImage) payload.append('optionDImage', formData.optionDImage);
        if (formData.optionEImage) payload.append('optionEImage', formData.optionEImage);

        // Flashcard bilgisi varsa gönder
        payload.append('flashCardFront', formData.flashCardFront || '');
        payload.append('flashCardBack', formData.flashCardBack || '');
        payload.append('removeFlashCard', formData.removeFlashCard);

        try {
            await dispatch(updateFullQuestion(payload)).unwrap();
            alert("Soru başarıyla güncellendi");
            onSubmit(); // Güncellemeden sonra liste vs. güncellenecekse
            onClose();
        } catch (error) {
            console.error('Güncelleme hatası:', error);
            alert("Soru güncellenirken bir hata oluştu.");
        }
    };
    const handleDelete = async (questionID) => {
        if (!questionID) return;

        const confirmDelete = window.confirm("Bu soruyu silmek istediğinizden emin misiniz?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteQuestion(questionID)).unwrap();
            alert('Soru başarıyla silindi!');
            // İsteğe bağlı: Seçili soruyu sıfırlamak ya da başka UI işlemleri
        } catch (error) {
            alert('Soru silinirken hata oluştu: ' + (error.message || error));
        }
    };


    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Soru Düzenle</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <div className={styles.selectionSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>Konu Seçin*</label>
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="">Konu Seçin</option>
                            {testTopics?.map(topic => (
                                <option key={topic.topicID} value={topic.topicID}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedTopic && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Grubu Seçin*</label>
                            <select
                                value={selectedTestGroup}
                                onChange={(e) => setSelectedTestGroup(e.target.value)}
                                className={styles.selectInput}
                            >
                                <option value="">Test Grubu Seçin</option>
                                {currentTopic.testGroups.map(group => (
                                    <option key={group.testGroupID} value={group.testGroupID}>
                                        {group.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedTestGroup && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Test Seçin*</label>
                            <select
                                value={selectedTest}
                                onChange={(e) => setSelectedTest(e.target.value)}
                                className={styles.selectInput}
                            >
                                <option value="">Test Seçin</option>
                                {currentTestGroup.tests.map(test => (
                                    <option key={test.testID} value={test.testID}>
                                        {test.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {status === 'loading' && (
                    <div className={styles.loadingSection}>
                        <p>Sorular yükleniyor...</p>
                    </div>
                )}

                {status === 'succeeded' && questions.length > 0 && (
                    <div className={styles.questionsSection}>
                        <h3 className={styles.sectionTitle}>Sorular</h3>
                        <div className={styles.questionsList}>
                            {questions.map(question => (
                                <div
                                    key={question.questionID}
                                    className={`${styles.questionItem} ${selectedQuestion?.questionID === question.questionID ? styles.selected : ''}`}
                                    onClick={() => setSelectedQuestion(question)}
                                >
                                    <div className={styles.questionText}>
                                        {question.text && question.text.length > 60
                                            ? `${question.text.substring(0, 60)}...`
                                            : question.text || 'Metinsiz soru'}
                                    </div>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(question.questionID);
                                        }}
                                    >
                                        Sil
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {status === 'succeeded' && questions.length === 0 && selectedTest && (
                    <div className={styles.noQuestions}>
                        <p>Bu test için soru bulunamadı</p>
                    </div>
                )}

                {status === 'failed' && (
                    <div className={styles.errorSection}>
                        <p>Hata: {error || 'Soru yüklenirken bir hata oluştu'}</p>
                    </div>
                )}

                {selectedQuestion && (
                    <div className={styles.editSection}>
                        <h3 className={styles.sectionTitle}>Soru Düzenle</h3>

                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Soru Metni*</label>
                            <textarea
                                value={formData.questionText}
                                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                                className={styles.textArea}
                                rows={3}
                            />
                        </div>

                        {/* Question Image */}
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Soru Görseli</label>
                            {formData.existingImages.question && (
                                <div className={styles.imagePreview}>
                                    <img
                                        src={`${imgUrl}${formData.existingImages.question}`}
                                        alt="Mevcut soru görseli"
                                        className={styles.existingImage}
                                    />
                                    <span>Mevcut Görsel</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange('questionImage', e.target.files[0])}
                                className={styles.fileInput}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>Seçenekler*</label>
                            {formData.options.map((option, index) => (
                                <div key={index} className={styles.optionContainer}>
                                    <div className={styles.optionRow}>
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={formData.answer === index}
                                            onChange={() => setFormData({ ...formData, answer: index })}
                                            className={styles.optionRadio}
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className={styles.optionInput}
                                            placeholder={`${String.fromCharCode(65 + index)} Seçeneği`}
                                        />
                                    </div>

                                    {/* Option Image */}
                                    <div className={styles.optionImageContainer}>
                                        {formData.existingImages[`option${String.fromCharCode(65 + index)}`] && (
                                            <div className={styles.imagePreview}>
                                                <img
                                                    src={`${imgUrl}${formData.existingImages[`option${String.fromCharCode(65 + index)}`]}`}
                                                    alt={`${String.fromCharCode(65 + index)} seçeneği mevcut görsel`}
                                                    className={styles.existingImage}
                                                />
                                                <span>Mevcut</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(`option${String.fromCharCode(65 + index)}Image`, e.target.files[0])}
                                            className={styles.fileInput}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Flashcard Section */}
                        <div className={styles.flashcardSection}>
                            <h4 className={styles.subSectionTitle}>Bilgi Kartı</h4>

                            {flashCardStatus === 'loading' && (
                                <p>Bilgi kartı yükleniyor...</p>
                            )}

                            {flashCardStatus === 'succeeded' && flashCards.length > 0 && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label className={styles.inputLabel}>Ön Yüz</label>
                                        <input
                                            type="text"
                                            value={formData.flashCardFront}
                                            onChange={(e) => setFormData({ ...formData, flashCardFront: e.target.value })}
                                            className={styles.textInput}
                                            placeholder="Bilgi kartının ön yüzü"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.inputLabel}>Arka Yüz</label>
                                        <textarea
                                            value={formData.flashCardBack}
                                            onChange={(e) => setFormData({ ...formData, flashCardBack: e.target.value })}
                                            className={styles.textArea}
                                            rows={2}
                                            placeholder="Bilgi kartının arka yüzü"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={formData.removeFlashCard}
                                                onChange={(e) => setFormData({ ...formData, removeFlashCard: e.target.checked })}
                                                className={styles.checkboxInput}
                                            />
                                            Bilgi kartını kaldır
                                        </label>
                                    </div>
                                </>
                            )}

                            {flashCardStatus === 'succeeded' && flashCards.length === 0 && (
                                <p>Bu soru için bilgi kartı bulunamadı</p>
                            )}

                            {flashCardStatus === 'failed' && (
                                <p>Bilgi kartı yüklenirken hata oluştu</p>
                            )}
                        </div>
                    </div>
                )}

                <div className={styles.actions}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        İptal
                    </button>
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={!selectedQuestion}
                    >
                        Güncelle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditQuestionModal;