// src/features/Exam/ExamSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den sınav türlerini almak için thunk fonksiyonu
export const fetchExamOptions = createAsyncThunk(
    'exam/fetchExamOptions',
    (_, { rejectWithValue }) => {
        return apiClient.get('Exams')  // API'ye istek atıyoruz
            .then(response => response.data)  // Veriyi döndürüyoruz
            .catch(error => rejectWithValue(error.response?.data || 'API hata mesajı'));  // Hata durumunda mesaj
    }
);

const examSlice = createSlice({
    name: 'exam',
    initialState: {
        options: [],  // Burada options dizisini başlatıyoruz
        status: 'idle',  // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamOptions.pending, (state) => {
                state.status = 'loading';  // Yükleniyor durumunu ayarlıyoruz
            })
            .addCase(fetchExamOptions.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla alındığında
                state.options = action.payload;  // API'den gelen veriyi options'a kaydediyoruz
            })
            .addCase(fetchExamOptions.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;
            });
    },
});

export default examSlice.reducer;
