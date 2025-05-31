import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Kullanıcı profiline ait temel istatistikleri getirir
export const fetchUserProfileStatistics = createAsyncThunk(
    'statistics/fetchUserProfileStatistics',
    async (_, { rejectWithValue }) => {  // userId parametresi kaldırıldı
        try {
            const response = await apiClient.get('Statistics');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Profil istatistikleri alınamadı');
        }
    }
);

export const updateUserStatistics = createAsyncThunk(
    'statistics/updateUserStatistics',
    async ({ wrongAnswerCount }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Statistics/update', {
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
