import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API çağrısı: Belirtilen examID'ye göre konuları al
export const fetchTopics = createAsyncThunk(
    'topic/fetchTopics',
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Topics/course/${courseId}`);
            return response.data;  // Başarılı dönüş
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const initialState = {
    topics: [],
    statusTopics: 'idle',  // idle, loading, succeeded, failed
    errorTopics: null,
};

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        clearTopics: (state) => {
            state.topics = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopics.pending, (state) => {
                state.statusTopics = 'loading';  // Yükleniyor durumu
            })
            .addCase(fetchTopics.fulfilled, (state, action) => {
                state.statusTopics = 'succeeded';  // Başarı durumu
                state.topics = action.payload;  // Konuları veriye ekliyoruz
            })
            .addCase(fetchTopics.rejected, (state, action) => {
                state.statusTopics = 'failed';  // Hata durumu
                state.errorTopics = action.payload || 'Bir hata oluştu';
            });
    },
});
export const { clearTopics } = topicSlice.actions;

export default topicSlice.reducer;
