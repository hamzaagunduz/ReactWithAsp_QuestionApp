// src/features/Exam/ExamSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Sınavları listeleme
export const fetchExamOptions = createAsyncThunk(
    'exam/fetchExamOptions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('Exams');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Sınavlar alınamadı');
        }
    }
);

export const fetchExamWithSelected = createAsyncThunk(
    'exam/fetchExamWithSelected',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/Exams/get-all-with-selected');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Sınavlar alınamadı');
        }
    }
);

// Sınav oluşturma
export const createExam = createAsyncThunk(
    'exam/createExam',
    async (newExam, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Exams', newExam);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Sınav oluşturulamadı');
        }
    }
);

// Sınav güncelleme
export const updateExam = createAsyncThunk(
    'exam/updateExam',
    async (updatedExam, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('Exams', updatedExam);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Sınav güncellenemedi');
        }
    }
);

// Sınav silme
export const deleteExam = createAsyncThunk(
    'exam/deleteExam',
    async (examID, { rejectWithValue }) => {
        try {
            await apiClient.delete(`Exams/${examID}`);
            return examID;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Sınav silinemedi');
        }
    }
);


const examSlice = createSlice({
    name: 'exam',
    initialState: {
        options: [],
        status: 'idle',
        error: null,
        createStatus: 'idle',
        createError: null,
        updateStatus: 'idle',
        updateError: null,
        fetchWithSelectedStatus: 'idle',
        fetchWithSelectedError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamOptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExamOptions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.options = action.payload;
            })
            .addCase(fetchExamOptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(createExam.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createExam.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.options.push(action.payload);
            })
            .addCase(createExam.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })

            .addCase(updateExam.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.options.findIndex(item => item.examID === action.payload.examID);
                if (index !== -1) {
                    state.options[index] = action.payload;
                }
            })
            .addCase(updateExam.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.options = state.options.filter(exam => exam.examID !== action.payload);
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchExamWithSelected.pending, (state) => {
                state.fetchWithSelectedStatus = 'loading';
                state.fetchWithSelectedError = null;
            })
            .addCase(fetchExamWithSelected.fulfilled, (state, action) => {
                state.fetchWithSelectedStatus = 'succeeded';
                state.options = action.payload;
            })
            .addCase(fetchExamWithSelected.rejected, (state, action) => {
                state.fetchWithSelectedStatus = 'failed';
                state.fetchWithSelectedError = action.payload || 'Bir hata oluştu';
            });

    },
});

export default examSlice.reducer;
