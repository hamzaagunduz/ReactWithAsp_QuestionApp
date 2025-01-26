import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API isteği için createAsyncThunk kullanıyoruz
export const fetchFlashCardsByQuestionId = createAsyncThunk(
    'flashCard/fetchByQuestionId',
    async (questionId) => {
        const response = await axios.get(`https://localhost:7172/api/FlashCards/GetFlashCardsByQuestionId/${questionId}`);
        return response.data; // API'den dönen veriyi alıyoruz
    }
);

const flashCardSlice = createSlice({
    name: 'flashCard',
    initialState: {
        flashCards: [],
        status: 'idle', // status ekliyoruz
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlashCardsByQuestionId.pending, (state) => {
                state.status = 'loading'; // Yükleniyor durumu
                state.error = null;
            })
            .addCase(fetchFlashCardsByQuestionId.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Başarıyla veri alındı
                state.flashCards = action.payload; // Gelen flash card'ları store'a kaydediyoruz
            })
            .addCase(fetchFlashCardsByQuestionId.rejected, (state, action) => {
                state.status = 'failed'; // Hata durumu
                state.error = action.error.message; // Hata mesajını kaydediyoruz
            });
    },
});

export default flashCardSlice.reducer;
