import { useState, useEffect } from 'react';
import { FaStar, FaArrowLeft, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleUserFlashCard,
    fetchFavoriteFlashcardsByCourse,
    createUserCustomFlashCard,
    updateUserCustomFlashCard,
    deleteUserCustomFlashCard
} from '../../features/FlashCard/FlashCardSlice';
import '../../style/favoriteCards/Flashcard.css';
import FlashCardQuiz from './FlashCardQuiz';

const FlashcardList = ({ courseId }) => {
    const dispatch = useDispatch();
    const { favoriteFlashCards, favoriteStatus } = useSelector(state => state.flashCard);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [localFlashcards, setLocalFlashcards] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 9,
        totalPages: 1
    });
    const [newFlashcard, setNewFlashcard] = useState({
        front: '',
        back: '',
        courseID: courseId
    });
    const [editingCard, setEditingCard] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Calculate total pages whenever favoriteFlashCards changes
    useEffect(() => {
        if (favoriteFlashCards?.totalCount) {
            setPagination(prev => ({
                ...prev,
                totalPages: Math.ceil(favoriteFlashCards.totalCount / prev.pageSize)
            }));
        }
    }, [favoriteFlashCards]);

    // Fetch flashcards when courseId or pagination changes
    useEffect(() => {
        if (courseId) {
            dispatch(fetchFavoriteFlashcardsByCourse({
                courseId,
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            }));
        }
    }, [courseId, pagination.pageNumber, dispatch]);

    // Sync with redux state
    useEffect(() => {
        if (favoriteFlashCards?.items) {
            setLocalFlashcards(favoriteFlashCards.items);
            setSelectedIndex(null);
        }
    }, [favoriteFlashCards]);

    const openModal = (index) => {
        setSelectedIndex(index);
    };

    const closeModal = () => {
        setSelectedIndex(null);
    };

    const goNext = () => {
        if (selectedIndex === localFlashcards.length - 1) {
            if (pagination.pageNumber < pagination.totalPages) {
                setPagination(prev => ({
                    ...prev,
                    pageNumber: prev.pageNumber + 1
                }));
                setSelectedIndex(0);
            } else {
                setSelectedIndex(0);
            }
        } else {
            setSelectedIndex(prev => prev + 1);
        }
    };

    const goPrev = () => {
        if (selectedIndex === 0) {
            if (pagination.pageNumber > 1) {
                setPagination(prev => ({
                    ...prev,
                    pageNumber: prev.pageNumber - 1
                }));
            } else {
                setSelectedIndex(localFlashcards.length - 1);
            }
        } else {
            setSelectedIndex(prev => prev - 1);
        }
    };

    const removeFlashcard = async (card) => {
        if (!card) return;

        const confirmDelete = window.confirm("Bu kartı silmek istediğinizden emin misiniz?");
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            // SİSTEM KARTLARI İÇİN: toggleUserFlashCard kullan
            if (card.type === 'System') {
                await dispatch(toggleUserFlashCard({
                    flashCardID: card.flashCardID,
                    userCustomFlashCardID: null,
                    courseId
                })).unwrap();
            }
            // CUSTOM KARTLAR İÇİN: deleteUserCustomFlashCard kullan
            else if (card.type === 'Custom') {
                await dispatch(deleteUserCustomFlashCard(card.userCustomFlashCardID)).unwrap();
            }

            // Yerel state'den kaldır
            setLocalFlashcards(prev =>
                prev.filter(c =>
                    (card.type === 'System' && c.flashCardID !== card.flashCardID) ||
                    (card.type === 'Custom' && c.userCustomFlashCardID !== card.userCustomFlashCardID)
                )
            );
            if (selectedIndex !== null) closeModal();
            if (isEditModalOpen) setIsEditModalOpen(false);
        } catch (error) {
            console.error('Kart silinirken hata:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStarClick = (e, card) => {
        e.stopPropagation();
        removeFlashcard(card);
    };

    const getCardId = (card) => {
        return card.type === 'System' ? card.flashCardID : card.userCustomFlashCardID;
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= pagination.totalPages) {
            setPagination(prev => ({
                ...prev,
                pageNumber: page
            }));
        }
    };

    const handleAddFlashcard = async () => {
        try {
            await dispatch(createUserCustomFlashCard(newFlashcard)).unwrap();
            setIsAddModalOpen(false);
            setNewFlashcard({ front: '', back: '', courseID: courseId });
            // Refresh the list
            dispatch(fetchFavoriteFlashcardsByCourse({
                courseId,
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            }));
        } catch (error) {
            console.error('Flashcard eklenirken hata:', error);
        }
    };

    const handleEditClick = (e, card) => {
        e.stopPropagation();
        setEditingCard(card);
        setIsEditModalOpen(true);
        closeModal(); // Close detail modal when opening edit modal
    };

    const handleSaveEdit = async () => {
        if (!editingCard || !editingCard.front || !editingCard.back) return;

        try {
            const payload = {
                userCustomFlashCardID: editingCard.userCustomFlashCardID,
                front: editingCard.front,
                back: editingCard.back
            };

            await dispatch(updateUserCustomFlashCard(payload)).unwrap();

            // Update local state
            setLocalFlashcards(prev =>
                prev.map(card =>
                    card.userCustomFlashCardID === editingCard.userCustomFlashCardID
                        ? { ...card, front: editingCard.front, back: editingCard.back }
                        : card
                )
            );

            setIsEditModalOpen(false);
            setEditingCard(null);
        } catch (error) {
            console.error('Flashcard güncellenirken hata:', error);
        }
    };

    return (
        <div className="duo-container">
            {favoriteStatus === 'loading' && localFlashcards.length === 0 ? (
                <div className="text-center mt-4">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Yükleniyor...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="duo-action-buttons">
                        <button
                            className="duo-add-button"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            Ekle
                        </button>
                        {localFlashcards.length > 0 && (
                            <button
                                className="duo-quiz-button"
                                onClick={() => setIsQuizModalOpen(true)}
                            >
                                Quiz Başlat
                            </button>
                        )}
                    </div>

                    {localFlashcards.length > 0 ? (
                        <>
                            <div className="duo-flashcard-list">
                                {localFlashcards.map((card, index) => (
                                    <div
                                        key={`${getCardId(card)}-${index}`}
                                        className="duo-flashcard"
                                        onClick={() => openModal(index)}
                                    >
                                        <div className="duo-card-face duo-front">
                                            <p>{card.front}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="duo-pagination-controls">
                                <button
                                    className="duo-pagination-button"
                                    onClick={() => goToPage(pagination.pageNumber - 1)}
                                    disabled={pagination.pageNumber === 1 || favoriteStatus === 'loading'}
                                >
                                    <FaArrowLeft />
                                </button>
                                <span className="duo-page-info">
                                    Sayfa {pagination.pageNumber} / {pagination.totalPages}
                                </span>
                                <button
                                    className="duo-pagination-button"
                                    onClick={() => goToPage(pagination.pageNumber + 1)}
                                    disabled={pagination.pageNumber === pagination.totalPages || favoriteStatus === 'loading'}
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="duo-no-cards">Hiç favori kart bulunamadı.</p>
                    )}
                </>
            )}

            {/* Flashcard Ekleme Modalı */}
            {isAddModalOpen && (
                <div className="duo-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="duo-modal-content" onClick={e => e.stopPropagation()}>
                        <div className='duo-modal-top'>
                            <h3>Yeni Flashcard Ekle</h3>
                        </div>
                        <div className="duo-add-flashcard-form">
                            <div className="duo-form-group">
                                <label>Ön Yüz</label>
                                <textarea
                                    value={newFlashcard.front}
                                    onChange={(e) => setNewFlashcard({ ...newFlashcard, front: e.target.value })}
                                    placeholder="Soru veya anahtar kelime"
                                    rows={3}
                                />
                            </div>
                            <div className="duo-form-group">
                                <label>Arka Yüz</label>
                                <textarea
                                    value={newFlashcard.back}
                                    onChange={(e) => setNewFlashcard({ ...newFlashcard, back: e.target.value })}
                                    placeholder="Cevap veya açıklama"
                                    rows={3}
                                />
                            </div>
                            <div className="duo-form-actions">
                                <button
                                    className="duo-cancel-button"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    İptal
                                </button>
                                <button
                                    className="duo-submit-button"
                                    onClick={handleAddFlashcard}
                                    disabled={!newFlashcard.front || !newFlashcard.back}
                                >
                                    Ekle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Flashcard Düzenleme Modalı */}
            {isEditModalOpen && editingCard && (
                <div className="duo-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="duo-modal-content" onClick={e => e.stopPropagation()}>
                        <div className='duo-modal-top'>
                            <h3>Flashcard Düzenle</h3>
                        </div>
                        <div className="duo-add-flashcard-form">
                            <div className="duo-form-group">
                                <label>Ön Yüz</label>
                                <textarea
                                    value={editingCard.front}
                                    onChange={(e) => setEditingCard({ ...editingCard, front: e.target.value })}
                                    placeholder="Soru veya anahtar kelime"
                                    rows={3}
                                />
                            </div>
                            <div className="duo-form-group">
                                <label>Arka Yüz</label>
                                <textarea
                                    value={editingCard.back}
                                    onChange={(e) => setEditingCard({ ...editingCard, back: e.target.value })}
                                    placeholder="Cevap veya açıklama"
                                    rows={3}
                                />
                            </div>
                            <div className="duo-form-actions">
                                <button
                                    className="duo-delete-button"
                                    onClick={() => removeFlashcard(editingCard)}
                                    disabled={isDeleting}
                                >
                                    <FaTrash /> {isDeleting ? 'Siliniyor...' : 'Sil'}
                                </button>
                                <button
                                    className="duo-cancel-button"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    İptal
                                </button>

                                <button
                                    className="duo-submit-button"
                                    onClick={handleSaveEdit}
                                    disabled={!editingCard.front || !editingCard.back || isDeleting}
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Flashcard Detay Modalı */}
            {selectedIndex !== null && localFlashcards[selectedIndex] && (
                <div className="duo-modal-overlay" onClick={closeModal}>
                    <div className="duo-modal-content" onClick={e => e.stopPropagation()}>
                        <div className='duo-modal-top'>
                            <button className="duo-modal-close" onClick={closeModal}>×</button>

                            {localFlashcards[selectedIndex].type === 'System' ? (
                                <FaStar
                                    onClick={(e) => handleStarClick(e, localFlashcards[selectedIndex])}
                                    size={24}
                                    color="gold"
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <FaEdit
                                    onClick={(e) => handleEditClick(e, localFlashcards[selectedIndex])}
                                    size={22}
                                    style={{
                                        cursor: 'pointer',
                                        color: '#4a90e2',
                                        opacity: 0.7,
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.color = '#3a7bc8';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '0.7';
                                        e.currentTarget.style.color = '#4a90e2';
                                    }}
                                />
                            )}
                        </div>
                        <h4>{localFlashcards[selectedIndex].front}</h4>
                        <p>{localFlashcards[selectedIndex].back}</p>
                        <div className="duo-modal-nav">
                            <button
                                className="duo-nav-button"
                                onClick={goPrev}
                                disabled={selectedIndex === 0 && pagination.pageNumber === 1}
                            >
                                ← Geri
                            </button>

                            <button
                                className="duo-nav-button"
                                onClick={goNext}
                                disabled={selectedIndex === localFlashcards.length - 1 && pagination.pageNumber === pagination.totalPages}
                            >
                                İleri →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isQuizModalOpen && (
                <FlashCardQuiz
                    courseId={courseId}
                    onClose={() => setIsQuizModalOpen(false)}
                />
            )}
        </div>
    );
};

export default FlashcardList;