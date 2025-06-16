import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Performans verilerini getirir
export const fetchAnalysis = createAsyncThunk(
    'analysis/fetchAnalysis',
    async ({ range }, { rejectWithValue }) => {  // burada destructure
        try {
            const response = await apiClient.get(`/Performance/performance?range=${range}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Veri alınamadı');
        }
    }
);


// Performans verileriyle AI'dan analiz iste
export const fetchAISuggestions = createAsyncThunk(
    'analysis/fetchAISuggestions',
    async ({ analysisType, data }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/AI/analyze/v2', {
                analysisType,
                data
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'AI analiz alınamadı');
        }
    }
);

const analysisSlice = createSlice({
    name: 'analysis',
    initialState: {
        data: {},           // API'den gelen doğru/yanlış/süre verileri
        loading: false,
        error: null,

        aiSuggestions: {},  // AI'dan gelen öneriler
        aiLoading: false,
        aiError: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            // Performans verisi
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
            })

            // AI öneri verisi
            .addCase(fetchAISuggestions.pending, (state) => {
                state.aiLoading = true;
                state.aiError = null;
            })
            .addCase(fetchAISuggestions.fulfilled, (state, action) => {
                state.aiLoading = false;
                state.aiSuggestions = action.payload;
            })
            .addCase(fetchAISuggestions.rejected, (state, action) => {
                state.aiLoading = false;
                state.aiError = action.payload;
            });
    }
});

export default analysisSlice.reducer;
