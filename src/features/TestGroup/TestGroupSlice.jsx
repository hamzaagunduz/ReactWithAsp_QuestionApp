import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Test Group oluşturma thunk'ı
export const createTestGroup = createAsyncThunk(
    'TestGroup/createTestGroup',
    async (testGroupData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('TestGroups', testGroupData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const TestGroupSlice = createSlice({
    name: 'TestGroup',
    initialState: {
        testGroups: [],
        status: 'idle',         // create durumları için
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTestGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTestGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.testGroups.push(action.payload);
            })
            .addCase(createTestGroup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default TestGroupSlice.reducer;
