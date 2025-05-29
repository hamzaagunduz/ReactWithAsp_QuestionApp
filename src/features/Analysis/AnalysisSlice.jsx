import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// AsyncThunk – API'den analiz verilerini çek
export const fetchAnalysis = createAsyncThunk(
    'analysis/fetchAnalysis',
    async ({ userId, range }, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/Performance/${userId}?range=${range}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Veri alınamadı');
        }
    }
);

const analysisSlice = createSlice({
    name: 'analysis',
    initialState: {
        data: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAnalysis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnalysis.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAnalysis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default analysisSlice.reducer;
