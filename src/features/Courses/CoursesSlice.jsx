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
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get(`Courses/GetCoursesByExamId`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'API hata mesajı');
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
            return courseId; // Silinen ID'yi geri döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);


const CoursesSlice = createSlice({
    name: 'Courses',
    initialState: {
        courses: [],

        fetchStatus: 'idle',
        fetchError: null,

        createStatus: 'idle',
        createError: null,

        updateStatus: 'idle',
        updateError: null,

        deleteStatus: 'idle',
        deleteError: null
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchCoursesByExamId
            .addCase(fetchCoursesByExamId.pending, (state) => {
                state.fetchStatus = 'loading';
                state.fetchError = null;
            })
            .addCase(fetchCoursesByExamId.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(fetchCoursesByExamId.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.fetchError = action.payload;
            })

            // createCourse
            .addCase(createCourse.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.courses.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })

            // updateCourse
            .addCase(updateCourse.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
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

            // deleteCourse
            .addCase(deleteCourse.pending, (state) => {
                state.deleteStatus = 'loading';
                state.deleteError = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.courses = state.courses.filter(course => course.courseID !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    }

});


export default CoursesSlice.reducer;
