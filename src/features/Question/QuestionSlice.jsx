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

const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: [],
        test: null,            // 👈 Test bilgisi için alan
        status: 'idle',
        testStatus: 'idle',    // 👈 Test yüklenme durumu
        error: null,
        testError: null,       // 👈 Test hata mesajı
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
            });
    },
});

export default questionSlice.reducer;
