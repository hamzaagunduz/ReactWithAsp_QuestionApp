import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Elmas satın alma thunk'ı
export const purchaseDiamond = createAsyncThunk(
    'purchase/purchaseDiamond',
    async (purchaseData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('AppUser/purchase-diamonds', purchaseData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Satın alma başarısız oldu.');
        }
    }
);

const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        status: 'idle',
        error: null,
        successMessage: null,
    },
    reducers: {
        resetPurchaseStatus: (state) => {
            state.status = 'idle';
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(purchaseDiamond.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(purchaseDiamond.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successMessage = action.payload;
            })
            .addCase(purchaseDiamond.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { resetPurchaseStatus } = PurchaseSlice.actions;
export default PurchaseSlice.reducer;
