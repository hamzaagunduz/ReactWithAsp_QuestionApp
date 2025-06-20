// src/features/Test/TestSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Testleri getirme
export const fetchTests = createAsyncThunk(
    'test/fetchTests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('Tests');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);
export const fetchQuestionWithFlashCard = createAsyncThunk(
    'test/fetchQuestionWithFlashCard',
    async (testId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Tests/get-test-with-questions/${testId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);


// Yeni test oluşturma
export const createTest = createAsyncThunk(
    'test/createTest',
    async (testData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Tests', testData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

export const updateTest = createAsyncThunk(
    'test/updateTest',
    async (updatedTestData, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('Tests', updatedTestData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// Test silme
export const deleteTest = createAsyncThunk(
    'test/deleteTest',
    async (testId, { rejectWithValue }) => {
        try {
            await apiClient.delete(`Tests/${testId}`);
            return testId; // sadece id döndürüyoruz çünkü backend'den dönüş yoksa id yeterli
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const testSlice = createSlice({
    name: 'test',
    initialState: {
        tests: [],
        status: 'idle',         // fetch işlemi için durum
        error: null,
        createStatus: 'idle',   // create işlemi için durum
        createError: null,
        updateStatus: 'idle',
        updateError: null,

        questionWithFlashCardData: null,
        questionWithFlashCardStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        questionWithFlashCardError: null,

        deleteStatus: 'idle',
        deleteError: null,

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchTests
            .addCase(fetchTests.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tests = action.payload;
            })
            .addCase(fetchTests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // createTest
            .addCase(createTest.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createTest.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.tests.push(action.payload);
            })
            .addCase(createTest.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            .addCase(updateTest.pending, (state) => {
                state.updateStatus = 'loading';
            })
            .addCase(updateTest.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.tests.findIndex(test => test.testID === action.payload.testID);
                if (index !== -1) {
                    state.tests[index] = action.payload;
                }
            })
            .addCase(updateTest.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })
            .addCase(fetchQuestionWithFlashCard.pending, (state) => {
                state.questionWithFlashCardStatus = 'loading';
                state.questionWithFlashCardError = null;
            })
            .addCase(fetchQuestionWithFlashCard.fulfilled, (state, action) => {
                state.questionWithFlashCardStatus = 'succeeded';
                state.questionWithFlashCardData = action.payload;
            })
            .addCase(fetchQuestionWithFlashCard.rejected, (state, action) => {
                state.questionWithFlashCardStatus = 'failed';
                state.questionWithFlashCardError = action.payload;
            })
            .addCase(deleteTest.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteTest.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.tests = state.tests.filter(test => test.testID !== action.payload);
            })
            .addCase(deleteTest.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            })

    },
});

export default testSlice.reducer;
