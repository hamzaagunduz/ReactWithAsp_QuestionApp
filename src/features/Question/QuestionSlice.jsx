// src/features/Question/QuestionSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den soruları almak için thunk fonksiyonu
export const fetchQuestionsByTestId = createAsyncThunk(
    'question/fetchQuestionsByTestId',
    (testId, { rejectWithValue }) => {
        return apiClient.get(`Questions/GetQuestionsByTestId/${testId}`)  // API'ye istek atıyoruz
            .then(response => response.data)  // Veriyi döndürüyoruz
            .catch(error => rejectWithValue(error.response?.data || 'API hata mesajı'));  // Hata durumunda mesaj
    }
);

const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: [],  // Burada questions dizisini başlatıyoruz
        status: 'idle',  // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsByTestId.pending, (state) => {
                state.status = 'loading';  // Yükleniyor durumunu ayarlıyoruz
            })
            .addCase(fetchQuestionsByTestId.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla alındığında
                state.questions = action.payload;  // API'den gelen veriyi questions'a kaydediyoruz
            })
            .addCase(fetchQuestionsByTestId.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;
            });
    },
});

export default questionSlice.reducer;
