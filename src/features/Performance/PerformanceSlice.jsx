import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Performans verisini API'ye göndermek için thunk
export const submitPerformance = createAsyncThunk(
    'performance/submitPerformance',
    async (performanceData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Performance/submit', performanceData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const performanceSlice = createSlice({
    name: 'performance',
    initialState: {
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitPerformance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(submitPerformance.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(submitPerformance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default performanceSlice.reducer;
