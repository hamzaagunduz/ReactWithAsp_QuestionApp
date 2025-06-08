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

const testSlice = createSlice({
    name: 'test',
    initialState: {
        tests: [],
        status: 'idle',         // fetch işlemi için durum
        error: null,
        createStatus: 'idle',   // create işlemi için durum
        createError: null
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
            });
    },
});

export default testSlice.reducer;
