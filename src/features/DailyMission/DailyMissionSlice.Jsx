import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Günlük görevleri güncelleyen thunk
export const updateDailyMission = createAsyncThunk(
    'dailyMission/updateDailyMission',
    async ({ wrongAnswerCount }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('DailyMission/update', {
                wrongAnswerCount
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Günlük görev güncellenemedi');
        }
    }
);



export const getUserDailyMissions = createAsyncThunk(
    'dailyMission/getUserDailyMissions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('DailyMission/missions');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Günlük görevler getirilemedi');
        }
    }
);


const DailyMissionSlice = createSlice({
    name: 'dailyMission',
    initialState: {
        updateStatus: 'idle',
        missionsStatus: 'idle',
        error: null,
        missions: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateDailyMission.pending, (state) => {
                state.updateStatus = 'loading';
                state.error = null;
            })
            .addCase(updateDailyMission.fulfilled, (state) => {
                state.updateStatus = 'succeeded';
            })
            .addCase(updateDailyMission.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(getUserDailyMissions.pending, (state) => {
                state.missionsStatus = 'loading';
                state.error = null;
            })
            .addCase(getUserDailyMissions.fulfilled, (state, action) => {
                state.missionsStatus = 'succeeded';
                state.missions = action.payload;
            })
            .addCase(getUserDailyMissions.rejected, (state, action) => {
                state.missionsStatus = 'failed';
                state.error = action.payload;
            });
    }
});

export default DailyMissionSlice.reducer;
