// src/features/Signalr/SignalrSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient'; // axios örneğin

// Chat isteğini SignalR yerine HTTP ile gönderen thunk
export const sendChatMessage = createAsyncThunk(
    'signalr/sendChatMessage',
    async ({ prompt, connectionId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('AI/chat/v2', { prompt, connectionId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const SignalrSlice = createSlice({
    name: 'signalr',
    initialState: {
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
        result: null, // API'den gelen yanıt
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendChatMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default SignalrSlice.reducer;
