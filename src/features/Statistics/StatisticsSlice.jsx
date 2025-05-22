import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Kullanıcı profiline ait temel istatistikleri getirir
export const fetchUserProfileStatistics = createAsyncThunk(
    'statistics/fetchUserProfileStatistics',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Statistics/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Profil istatistikleri alınamadı');
        }
    }
);

// Örnek: Haftalık skor grafiği gibi başka bir API isteği
export const fetchWeeklyScoreGraph = createAsyncThunk(
    'statistics/fetchWeeklyScoreGraph',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Statistics/WeeklyGraph/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Grafik verisi alınamadı');
        }
    }
);

export const updateUserStatistics = createAsyncThunk(
    'statistics/updateUserStatistics',
    async ({ appUserId, wrongAnswerCount }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Statistics/update', {
                appUserId,
                wrongAnswerCount
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'İstatistik güncellenemedi');
        }
    }
);

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        profileStats: {
            data: null,
            status: 'idle',
            error: null,
        },
        weeklyGraph: {
            data: null,
            status: 'idle',
            error: null,
        },
        updateStatus: {
            status: 'idle',
            error: null,
        }
        // İleride başka tür istatistikler eklenebilir: globalStats, dailyStats vs.
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Profile Statistics
            .addCase(fetchUserProfileStatistics.pending, (state) => {
                state.profileStats.status = 'loading';
                state.profileStats.error = null;
            })
            .addCase(fetchUserProfileStatistics.fulfilled, (state, action) => {
                state.profileStats.status = 'succeeded';
                state.profileStats.data = action.payload;
            })
            .addCase(fetchUserProfileStatistics.rejected, (state, action) => {
                state.profileStats.status = 'failed';
                state.profileStats.error = action.payload;
            })

            // Weekly Graph
            .addCase(fetchWeeklyScoreGraph.pending, (state) => {
                state.weeklyGraph.status = 'loading';
                state.weeklyGraph.error = null;
            })
            .addCase(fetchWeeklyScoreGraph.fulfilled, (state, action) => {
                state.weeklyGraph.status = 'succeeded';
                state.weeklyGraph.data = action.payload;
            })
            .addCase(fetchWeeklyScoreGraph.rejected, (state, action) => {
                state.weeklyGraph.status = 'failed';
                state.weeklyGraph.error = action.payload;
            })
            // Update Statistics
            .addCase(updateUserStatistics.pending, (state) => {
                state.updateStatus.status = 'loading';
                state.updateStatus.error = null;
            })
            .addCase(updateUserStatistics.fulfilled, (state) => {
                state.updateStatus.status = 'succeeded';
            })
            .addCase(updateUserStatistics.rejected, (state, action) => {
                state.updateStatus.status = 'failed';
                state.updateStatus.error = action.payload;
            });
    }
});

export default statisticsSlice.reducer;
