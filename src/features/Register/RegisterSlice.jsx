// src/features/Register/RegisterSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('AppUser', userData);
            return response.data;
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (Array.isArray(errors)) {
                return rejectWithValue(errors);
            }
            return rejectWithValue(error.response?.data || '❌ API hata mesajı');
        }
    }
);

const RegisterSlice = createSlice({
    name: 'register',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default RegisterSlice.reducer;
