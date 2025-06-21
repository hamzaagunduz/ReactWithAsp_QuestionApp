import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient dosya yolunu doğru şekilde ayarlayın


// 1. Soru ID'sine göre flash card'ları getirme
export const fetchFlashCardsByQuestionId = createAsyncThunk(
    'flashCard/fetchByQuestionId',
    async (questionId) => {
        const response = await apiClient.get(`FlashCards/GetFlashCardsByQuestionId/${questionId}`);
        return response.data;
    }
);

// 2. Kullanıcıya ve derse göre favori kartları getirme
export const fetchFavoriteFlashcardsByCourse = createAsyncThunk(
    'flashCard/fetchFavoritesByCourse',
    async ({ courseId, pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`FlashCards/favorites/bycourse`, {
                params: {
                    courseId,
                    pageNumber,
                    pageSize
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Veriler alınamadı');
        }
    }
);

export const createUserCustomFlashCard = createAsyncThunk(
    'flashCard/createUserCustom',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('UserCustomFlashCards', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Kart oluşturulamadı');
        }
    }
);
export const fetchQuizFromFavorites = createAsyncThunk(
    'flashCard/fetchQuizFromFavorites',
    async ({ courseId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`FlashCards/quiz-from-favorites`, {
                params: { courseId }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Quiz verileri alınamadı.');
        }
    }
);


export const fetchFlashCardsByTestId = createAsyncThunk(
    'flashCard/fetchByTestId',
    async (testId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`FlashCards/GetFlashCardsByTestId/${testId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Veriler alınamadı');
        }
    }
);


// 3. Kullanıcının flash kart favorisini değiştirme (toggle etme)
export const toggleUserFlashCard = createAsyncThunk(
    'flashCard/toggleUserFlashCard',
    async ({ flashCardID }) => {
        const response = await apiClient.post(`FlashCards/ToggleUserFlashCard`, {
            flashCardID,
        });
        return response.data;
    }
);

export const updateUserCustomFlashCard = createAsyncThunk(
    'flashCard/updateUserCustom',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('UserCustomFlashCards', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Kart güncellenemedi');
        }
    }
);

export const deleteUserCustomFlashCard = createAsyncThunk(
    'flashCard/deleteUserCustom',
    async (userFlashCardID, { rejectWithValue }) => {
        try {
            await apiClient.delete(`UserCustomFlashCards/${userFlashCardID}`);
            return userFlashCardID;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Kart silinemedi');
        }
    }
);


const flashCardSlice = createSlice({
    name: 'flashCard',
    initialState: {
        flashCards: [],
        favoriteFlashCards: [],
        quizFromFavorites: [],
        status: 'idle',
        favoriteStatus: 'idle',
        quizFavStatus: 'idle',
        error: null,
        favoriteError: null,
        quizFavError: null,
        customCards: [],
        createStatus: 'idle',
        createError: null,
        deleteStatus: 'idle',
        deleteError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetchFlashCardsByQuestionId
        builder
            .addCase(fetchFlashCardsByQuestionId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFlashCardsByQuestionId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flashCards = action.payload;
            })
            .addCase(fetchFlashCardsByQuestionId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // fetchFavoriteFlashcardsByCourse
        builder
            .addCase(fetchFavoriteFlashcardsByCourse.pending, (state) => {
                state.favoriteStatus = 'loading';
                state.favoriteError = null;
            })
            .addCase(fetchFavoriteFlashcardsByCourse.fulfilled, (state, action) => {
                state.favoriteStatus = 'succeeded';
                state.favoriteFlashCards = action.payload;
            })
            .addCase(fetchFavoriteFlashcardsByCourse.rejected, (state, action) => {
                state.favoriteStatus = 'failed';
                state.favoriteError = action.error.message;
            });

        // toggleUserFlashCard
        builder
            .addCase(toggleUserFlashCard.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(toggleUserFlashCard.fulfilled, (state) => {
                state.status = 'succeeded';

            })
            .addCase(toggleUserFlashCard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // FlashCardSlice.js - extraReducers kısmına ekle
        builder
            .addCase(fetchFlashCardsByTestId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFlashCardsByTestId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flashCards = action.payload;
            })
            .addCase(fetchFlashCardsByTestId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchQuizFromFavorites.pending, (state) => {
                state.quizFavStatus = 'loading';
                state.quizFavError = null;
            })
            .addCase(fetchQuizFromFavorites.fulfilled, (state, action) => {
                state.quizFavStatus = 'succeeded';
                state.quizFromFavorites = action.payload;
            })
            .addCase(fetchQuizFromFavorites.rejected, (state, action) => {
                state.quizFavStatus = 'failed';
                state.quizFavError = action.payload || action.error.message;
            })
            .addCase(createUserCustomFlashCard.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createUserCustomFlashCard.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.customCards.push(action.payload);
            })
            .addCase(createUserCustomFlashCard.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            .addCase(updateUserCustomFlashCard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserCustomFlashCard.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateUserCustomFlashCard.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            }).addCase(deleteUserCustomFlashCard.pending, (state) => {
                state.deleteStatus = 'loading';
                state.deleteError = null;
            })
            .addCase(deleteUserCustomFlashCard.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                // Silinen kartı customCards listesinden çıkar
                state.customCards = state.customCards.filter(card => card.userFlashCardID !== action.payload);
            })
            .addCase(deleteUserCustomFlashCard.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });

    },
});

export default flashCardSlice.reducer;
