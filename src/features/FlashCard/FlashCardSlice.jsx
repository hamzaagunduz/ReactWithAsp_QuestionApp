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
    async ({ appUserId, courseId }) => {
        const response = await apiClient.get(`FlashCards/favorites/bycourse`, {
            params: { appUserId, courseId }
        });
        return response.data;
    }
);

export const fetchFlashCardsByTestId = createAsyncThunk(
    'flashCard/fetchByTestId',
    async ({ testId, userId }) => {
        const response = await apiClient.get(`FlashCards/GetFlashCardsByTestId/${testId}?userId=${userId}`);
        return response.data;
    }
);

// 3. Kullanıcının flash kart favorisini değiştirme (toggle etme)
export const toggleUserFlashCard = createAsyncThunk(
    'flashCard/toggleUserFlashCard',
    async ({ appUserID, flashCardID }) => {
        const response = await apiClient.post(`FlashCards/ToggleUserFlashCard`, {
            appUserID,
            flashCardID,
        });
        return response.data;
    }
);

const flashCardSlice = createSlice({
    name: 'flashCard',
    initialState: {
        flashCards: [],
        favoriteFlashCards: [],
        status: 'idle',
        favoriteStatus: 'idle',
        error: null,
        favoriteError: null,
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
            .addCase(toggleUserFlashCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Gerekirse local state güncellemesi yapılabilir, örneğin:
                // state.favoriteFlashCards = güncel favori listesi
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
            });


    },
});

export default flashCardSlice.reducer;
