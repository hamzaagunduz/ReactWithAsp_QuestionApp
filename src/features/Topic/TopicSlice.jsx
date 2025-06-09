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

export const fetchTopicsWithGroupedTests = createAsyncThunk(
    'topic/fetchTopicsWithGroupedTests',
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Topics/course/${courseId}/grouped-tests`);
            return response.data;  // Topic -> TestGroups -> Tests yapısı
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);
// Mevcut bir konuyu güncelleme thunk'ı
export const updateTopic = createAsyncThunk(
    'topic/updateTopic',
    async (updatedTopicData, { rejectWithValue }) => {
        try {
            // PUT isteği, URL sabit 'Topics', tüm topic objesi body'de
            const response = await apiClient.put('Topics', updatedTopicData);
            return response.data;  // Güncellenmiş konu verisi
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Konu güncellenirken bir hata oluştu');
        }
    }
);

// Yeni konu oluşturma thunk'ı
export const createTopic = createAsyncThunk(
    'topic/createTopic',
    async (topicData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Topics', topicData);
            return response.data;  // API'den dönen yeni konu verisi
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Konu oluşturulurken bir hata oluştu');
        }
    }
);



const initialState = {
    topics: [],
    statusTopics: 'idle',  // idle, loading, succeeded, failed
    errorTopics: null,
    createTopicStatus: 'idle',
    createTopicError: null,
    updateTopicStatus: 'idle',
    updateTopicError: null,
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
            })
            .addCase(fetchTopicsWithGroupedTests.pending, (state) => {
                state.statusTopics = 'loading';
            })
            .addCase(fetchTopicsWithGroupedTests.fulfilled, (state, action) => {
                state.statusTopics = 'succeeded';
                state.topics = action.payload;
            })
            .addCase(fetchTopicsWithGroupedTests.rejected, (state, action) => {
                state.statusTopics = 'failed';
                state.errorTopics = action.payload || 'Bir hata oluştu';
            })
            .addCase(createTopic.pending, (state) => {
                state.createTopicStatus = 'loading';
            })
            .addCase(createTopic.fulfilled, (state, action) => {
                state.createTopicStatus = 'succeeded';
                state.topics.push(action.payload);  // Yeni konu mevcut listeye ekleniyor
            })
            .addCase(createTopic.rejected, (state, action) => {
                state.createTopicStatus = 'failed';
                state.createTopicError = action.payload;
            })
            .addCase(updateTopic.pending, (state) => {
                state.updateTopicStatus = 'loading';
            })
            .addCase(updateTopic.fulfilled, (state, action) => {
                state.updateTopicStatus = 'succeeded';
                const updatedTopic = action.payload;
                const index = state.topics.findIndex((topic) => topic.topicID === updatedTopic.topicID);
                if (index !== -1) {
                    state.topics[index] = updatedTopic;
                }
            })
            .addCase(updateTopic.rejected, (state, action) => {
                state.updateTopicStatus = 'failed';
                state.updateTopicError = action.payload;
            })



    },
});
export const { clearTopics } = topicSlice.actions;

export default topicSlice.reducer;
