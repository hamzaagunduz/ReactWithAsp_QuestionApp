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

export const fetchCoursesByExamId = createAsyncThunk(
    'course/fetchCoursesByExamId',
    async (examId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Courses/GetCoursesByExamId/${examId}`);
            return response.data; // Başarılı dönüş
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
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
            .addCase(fetchCoursesByExamId.pending, (state) => {
                state.status = 'loading';  // Yükleniyor durumunu ayarlıyoruz
            })
            .addCase(fetchCoursesByExamId.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla alındığında
                state.courses = action.payload;  // API'den gelen veriyi options'a kaydediyoruz
            })
            .addCase(fetchCoursesByExamId.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;
            });

    },
});


export default CoursesSlice.reducer;
