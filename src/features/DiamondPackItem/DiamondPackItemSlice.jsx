// src/features/DiamondPackItem/DiamondPackItemSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Tüm DiamondPackItem'ları getirme
export const fetchDiamondPackItems = createAsyncThunk(
    'diamondPackItem/fetchDiamondPackItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('DiamondPackItem');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Diamond paketleri alınamadı');
        }
    }
);

// Yeni DiamondPackItem oluşturma
export const createDiamondPackItem = createAsyncThunk(
    'diamondPackItem/createDiamondPackItem',
    async (newItem, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('DiamondPackItem', newItem);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Diamond paketi oluşturulamadı');
        }
    }
);

// DiamondPackItem güncelleme
export const updateDiamondPackItem = createAsyncThunk(
    'diamondPackItem/updateDiamondPackItem',
    async (updatedItem, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('DiamondPackItem', updatedItem);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Diamond paketi güncellenemedi');
        }
    }
);

// DiamondPackItem silme
export const deleteDiamondPackItem = createAsyncThunk(
    'diamondPackItem/deleteDiamondPackItem',
    async (id, { rejectWithValue }) => {
        try {
            await apiClient.delete(`DiamondPackItem/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Diamond paketi silinemedi');
        }
    }
);

const diamondPackItemSlice = createSlice({
    name: 'diamondPackItem',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        createStatus: 'idle',
        createError: null,
        updateStatus: 'idle',
        updateError: null,
        deleteStatus: 'idle',
        deleteError: null,
    },
    reducers: {
        // İsteğe bağlı: Durumları sıfırlamak için yardımcı reducer'lar
        resetCreateStatus: (state) => {
            state.createStatus = 'idle';
            state.createError = null;
        },
        resetUpdateStatus: (state) => {
            state.updateStatus = 'idle';
            state.updateError = null;
        },
        resetDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
            state.deleteError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Tüm öğeleri getirme işlemleri
            .addCase(fetchDiamondPackItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDiamondPackItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchDiamondPackItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Yeni öğe oluşturma işlemleri
            .addCase(createDiamondPackItem.pending, (state) => {
                state.createStatus = 'loading';
                state.createError = null;
            })
            .addCase(createDiamondPackItem.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createDiamondPackItem.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.payload;
            })

            // Öğe güncelleme işlemleri
            .addCase(updateDiamondPackItem.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updateDiamondPackItem.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateDiamondPackItem.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.payload;
            })

            // Öğe silme işlemleri
            .addCase(deleteDiamondPackItem.pending, (state) => {
                state.deleteStatus = 'loading';
                state.deleteError = null;
            })
            .addCase(deleteDiamondPackItem.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteDiamondPackItem.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            });
    },
});

// Yardımcı reducer'ları export etme
export const { resetCreateStatus, resetUpdateStatus, resetDeleteStatus } = diamondPackItemSlice.actions;

export default diamondPackItemSlice.reducer;