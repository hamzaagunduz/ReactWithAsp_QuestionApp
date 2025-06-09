import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Kullanıcıya ait shop ürünlerini getirir
export const fetchUserShopItems = createAsyncThunk(
    'shop/fetchUserShopItems',
    async (_, { rejectWithValue }) => {  // parametre yok artık
        try {
            const response = await apiClient.get('Shop/items');  // userId yok
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// Satın alma işlemi
export const purchaseShopItem = createAsyncThunk(
    'shop/purchaseShopItem',
    async ({ shopItemId }, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Shop/purchase', { shopItemId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Satın alma başarısız');
        }
    }
);

export const fetchAllShopItems = createAsyncThunk(
    'shop/fetchAllShopItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('Shop');  // https://localhost:7172/api/Shop
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Tüm mağaza ürünleri alınamadı');
        }
    }
);

// Yeni bir shop ürünü oluşturur
export const createShopItem = createAsyncThunk(
    'shop/createShopItem',
    async (newItem, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('Shop', newItem);  // POST: /api/Shop
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ürün ekleme başarısız');
        }
    }
);

// Mevcut ürünü güncelle
export const updateShopItem = createAsyncThunk(
    'shop/updateShopItem',
    async (updatedItem, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('Shop', updatedItem);  // PUT: /api/Shop
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ürün güncelleme başarısız');
        }
    }
);

// Ürünü sil
export const deleteShopItem = createAsyncThunk(
    'shop/deleteShopItem',
    async (itemId, { rejectWithValue }) => {
        try {
            await apiClient.delete(`Shop/${itemId}`);  // DELETE: /api/Shop/{id}
            return itemId;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ürün silme başarısız');
        }
    }
);




const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        allItems: [],           // 👈 yeni alan: herkese açık ürünler
        allItemsStatus: 'idle',
        allItemsError: null

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
            })
            .addCase(fetchAllShopItems.pending, (state) => {
                state.allItemsStatus = 'loading';
            })
            .addCase(fetchAllShopItems.fulfilled, (state, action) => {
                state.allItemsStatus = 'succeeded';
                state.allItems = action.payload;
            })
            .addCase(fetchAllShopItems.rejected, (state, action) => {
                state.allItemsStatus = 'failed';
                state.allItemsError = action.payload;
            })
            .addCase(createShopItem.pending, (state) => {
                state.status = 'loading';  // veya ayrı bir state ekleyebilirsin (örnek: createItemStatus)
            })
            .addCase(createShopItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allItems.push(action.payload);  // Yeni ürünü tüm ürünler listesine ekle
            })
            .addCase(createShopItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateShopItem.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.allItems.findIndex(item => item.id === updated.id);
                if (index !== -1) {
                    state.allItems[index] = updated;
                }
            })
            .addCase(updateShopItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteShopItem.fulfilled, (state, action) => {
                state.allItems = state.allItems.filter(item => item.id !== action.payload);
            })
            .addCase(deleteShopItem.rejected, (state, action) => {
                state.error = action.payload;
            })



    }
});

export default shopSlice.reducer;
