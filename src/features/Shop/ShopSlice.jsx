import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Kullanıcıya ait shop ürünlerini getirir
export const fetchUserShopItems = createAsyncThunk(
    'shop/fetchUserShopItems',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`Shop/items/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// Satın alma işlemi
export const purchaseShopItem = createAsyncThunk(
    'shop/purchaseShopItem',
    async ({ userId, shopItemId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Shop/purchase', { userId, shopItemId });
            return { shopItemId, userId }; // Opsiyonel: backend response verisini dön
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Satın alma başarısız');
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
            .addCase(fetchUserShopItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserShopItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUserShopItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(purchaseShopItem.fulfilled, (state, action) => {
                // Opsiyonel: UI'da isPurchased güncellemek için
                const { shopItemId } = action.payload;
                const item = state.items.find(i => i.id === shopItemId);
                if (item) {
                    item.isPurchased = true;
                    item.remainingDays = item.durationInDays || 15;
                }
            });
    }
});

export default shopSlice.reducer;
