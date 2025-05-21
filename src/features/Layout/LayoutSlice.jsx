import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Kullanıcının can (lives) ve son can eklenme zamanını çekmek için thunk
export const fetchLivesInfo = createAsyncThunk(
    'layout/fetchLivesInfo',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`AppUser/lives/${userId}`);
            return response.data; // { Lives: int, LastLifeAddedTime: datetime }
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const layoutSlice = createSlice({
    name: 'layout',
    initialState: {
        healthStatus: 'idle',     // idle | loading | succeeded | failed
        healthError: null,
        healthResult: null,       // { Lives, LastLifeAddedTime }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLivesInfo.pending, (state) => {
                state.healthStatus = 'loading';
                state.healthError = null;
            })
            .addCase(fetchLivesInfo.fulfilled, (state, action) => {
                state.healthStatus = 'succeeded';
                state.healthResult = action.payload;
            })
            .addCase(fetchLivesInfo.rejected, (state, action) => {
                state.healthStatus = 'failed';
                state.healthError = action.payload;
            });
    },
});

export default layoutSlice.reducer;
