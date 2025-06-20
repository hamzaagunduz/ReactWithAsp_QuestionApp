// src/features/Question/QuestionSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den soruları almak için thunk fonksiyonu
export const fetchQuestionsByTestId = createAsyncThunk(
    'question/fetchQuestionsByTestId',
    (testId, { rejectWithValue }) => {
        return apiClient.get(`Questions/GetQuestionsByTestId/${testId}`)  // API'ye istek atıyoruz
            .then(response => response.data)  // Veriyi döndürüyoruz
            .catch(error => rejectWithValue(error.response?.data || 'API hata mesajı'));  // Hata durumunda mesaj
    }
);

export const fetchTestById = createAsyncThunk(
    'question/fetchTestById',
    (testId, { rejectWithValue }) => {
        return apiClient.get(`Tests/${testId}`)
            .then(response => response.data)
            .catch(error => rejectWithValue(error.response?.data || 'Test API hata mesajı'));
    }
);
export const deleteQuestion = createAsyncThunk(
    'question/deleteQuestion',
    async (questionId, { rejectWithValue }) => {
        try {
            return questionId;  // Silinen ID'yi reducer'da kullanacağız
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Soru silinirken hata oluştu');
        }
    }
);


export const createFullQuestion = createAsyncThunk(
    'question/createFullQuestion',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Questions/create-full-question', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Soru oluşturulamadı');
        }
    }
);

export const updateFullQuestion = createAsyncThunk(
    'question/updateFullQuestion',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('Questions/update-full-question', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Soru güncellenemedi');
        }
    }
);


const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: [],
        test: null,            // 👈 Test bilgisi için alan
        status: 'idle',
        testStatus: 'idle',    // 👈 Test yüklenme durumu
        error: null,
        testError: null,       // 👈 Test hata mesajı
        createStatus: 'idle',   // ✅ yeni eklendi
        createError: null,      // ✅ yeni eklendi
        updateStatus: 'idle',     // ✅ Güncelleme durumu
        updateError: null,        // ✅ Güncelleme hatası
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Sorular
            .addCase(fetchQuestionsByTestId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestionsByTestId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(fetchQuestionsByTestId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // ✅ Test
            .addCase(fetchTestById.pending, (state) => {
                state.testStatus = 'loading';
            })
            .addCase(fetchTestById.fulfilled, (state, action) => {
                state.testStatus = 'succeeded';
                state.test = action.payload;
            })
            .addCase(fetchTestById.rejected, (state, action) => {
                state.testStatus = 'failed';
                state.testError = action.payload;
            })
            .addCase(createFullQuestion.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createFullQuestion.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';

            })
            .addCase(createFullQuestion.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })
            .addCase(updateFullQuestion.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateFullQuestion.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const updatedQuestion = action.payload;
                const index = state.questions.findIndex(q => q.QuestionID === updatedQuestion.QuestionID);
                if (index !== -1) {
                    state.questions[index] = updatedQuestion;
                }
            })
            .addCase(updateFullQuestion.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = state.questions.filter(q => q.questionID !== action.payload);
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


    },
});

export default questionSlice.reducer;
