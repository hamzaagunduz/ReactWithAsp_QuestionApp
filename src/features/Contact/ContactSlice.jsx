import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Contact mesajı gönderme
export const createContact = createAsyncThunk(
    'contact/createContact',
    async (contactData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Contact', contactData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const ContactSlice = createSlice({
    name: 'contact',
    initialState: {
        createStatus: 'idle',
        createError: null,
        successMessage: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
                state.successMessage = null;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.successMessage = 'Mesajınız başarıyla gönderildi!';
            })
            .addCase(createContact.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            });
    }
});

export default ContactSlice.reducer;
