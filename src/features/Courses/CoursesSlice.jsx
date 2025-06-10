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

export const createCourse = createAsyncThunk(
    'Courses/createCourse',
    async (courseData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Courses', courseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

export const updateCourse = createAsyncThunk(
    'Courses/updateCourse',
    async (courseData, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('Courses', courseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'Courses/deleteCourse',
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`Courses/${courseId}`);
            return courseId; // Silinen ID'yi geri döndürüyoruz
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
        updateStatus: 'idle',
        updateError: null

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
            })
            // createCourse
            .addCase(createCourse.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.courses.push(action.payload); // Yeni kursu ekliyoruz
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            .addCase(updateCourse.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const updatedCourse = action.payload;
                const index = state.courses.findIndex(course => course.courseID === updatedCourse.courseID);
                if (index !== -1) {
                    state.courses[index] = updatedCourse;
                }
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter(course => course.courseID !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.error = action.payload;
            });


    },
});


export default CoursesSlice.reducer;
