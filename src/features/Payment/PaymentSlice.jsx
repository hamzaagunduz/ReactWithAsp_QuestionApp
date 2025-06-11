// src/features/Payment/PaymentSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient'; // apiClient'ı import ediyoruz

// Ödeme isteği için thunk fonksiyonu
export const pay = createAsyncThunk(
    'payment/pay',
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Payments/Pay', paymentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// Slice tanımı
const PaymentSlice = createSlice({
    name: 'payment',
    initialState: {
        paymentStatus: 'idle', // idle | loading | succeeded | failed
        paymentResult: null,
        paymentError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(pay.pending, (state) => {
                state.paymentStatus = 'loading';
                state.paymentError = null;
            })
            .addCase(pay.fulfilled, (state, action) => {
                state.paymentStatus = 'succeeded';
                state.paymentResult = action.payload;
            })
            .addCase(pay.rejected, (state, action) => {
                state.paymentStatus = 'failed';
                state.paymentError = action.payload;
            });
    },
});

export default PaymentSlice.reducer;
