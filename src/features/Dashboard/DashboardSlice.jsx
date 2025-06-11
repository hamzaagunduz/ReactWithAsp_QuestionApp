// src/features/Dashboard/DashboardSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Dashboard verilerini getiren thunk
export const fetchDashboardData = createAsyncThunk(
    'Dashboard/fetchDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('Dashboard');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Dashboard verileri getirilemedi');
        }
    }
);

const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState: {
        data: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default dashboardSlice.reducer;
