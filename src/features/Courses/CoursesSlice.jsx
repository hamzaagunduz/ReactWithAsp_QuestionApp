// src/features/Courses/CoursesSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den sınav türlerini almak için thunk fonksiyonu
export const fetchCourse = createAsyncThunk(
    'Courses/fetchCourse',
    (_, { rejectWithValue }) => {
        return apiClient.get('Courses')  // API'ye istek atıyoruz
            .then(response => response.data)  // Veriyi döndürüyoruz
            .catch(error => rejectWithValue(error.response?.data || 'API hata mesajı'));  // Hata durumunda mesaj
    }
);

const CoursesSlice = createSlice({
    name: 'Courses',
    initialState: {
        courses: [],  // Burada options dizisini başlatıyoruz
        status: 'idle',  // idle | loading | succeeded | failed
        error: null,

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourse.pending, (state) => {
                state.status = 'loading';  // Yükleniyor durumunu ayarlıyoruz
            })
            .addCase(fetchCourse.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla alındığında
                state.courses = action.payload;  // API'den gelen veriyi options'a kaydediyoruz
            })
            .addCase(fetchCourse.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;
            });

    },
});


export default CoursesSlice.reducer;
