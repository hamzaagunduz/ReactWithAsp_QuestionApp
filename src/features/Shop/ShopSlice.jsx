import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Shop verilerini API'den getiren thunk
export const fetchShopItems = createAsyncThunk(
    'shop/fetchShopItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('Shop');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShopItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShopItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchShopItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default shopSlice.reducer;
