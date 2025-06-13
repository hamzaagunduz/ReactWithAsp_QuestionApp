// src/features/AppUser/AppUserSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den AppUser bilgilerini almak için thunk fonksiyonu
export const fetchAppUser = createAsyncThunk(
    'appUser/fetchAppUser',
    async (_, { rejectWithValue }) => {
        try {
            // userId yok, doğrudan token’dan bilgiyi alan endpoint
            const response = await apiClient.get('AppUser/me');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);
export const changePassword = createAsyncThunk(
    'appUser/changePassword',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('AppUser/change-password', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Şifre değiştirme sırasında hata oluştu');
        }
    }
);

// Tüm kullanıcıları API'den çekmek için yeni thunk
export const fetchAllAppUser = createAsyncThunk(
    'appUser/fetchAllAppUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('AppUser');
            return response.data;  // Tüm kullanıcılar burada
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// AppUser'ı güncellemek için thunk fonksiyonu
export const updateAppUserExam = createAsyncThunk(
    'AppUser/updateUserExam',
    async ({ examID }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('AppUser/updateUserExam', {
                examID: examID,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

export const decreaseLife = createAsyncThunk(
    'appUser/decreaseLife',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('AppUser/decreaselife');
            return response.data; // API'den dönen mesajı döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

export const toggleUserBan = createAsyncThunk(
    'appUser/toggleBan',
    async ({ userId, banStatus }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('AppUser/ban', {
                userId,
                banStatus
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ban işlemi sırasında hata oluştu');
        }
    }
);

const appUserSlice = createSlice({
    name: 'appUser',
    initialState: {
        user: null,          // Tekil kullanıcı bilgisi
        users: [],           // Tüm kullanıcıların listesi için yeni state
        status: 'idle',      // idle | loading | succeeded | failed
        error: null,
        banOperation: { // Separate state for ban operations
            status: 'idle',
            error: null
        },// initialState içinde bu tanım eksikti:
        changePasswordResult: {
            status: 'idle',
            error: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Tek kullanıcıyı getirme işlemi
            .addCase(fetchAppUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAppUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchAppUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Tüm kullanıcıları getirme işlemi
            .addCase(fetchAllAppUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllAppUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;  // API'den dönen tüm kullanıcılar
            })
            .addCase(fetchAllAppUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // AppUser'ı güncelleme işlemi
            .addCase(updateAppUserExam.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAppUserExam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.user) {
                    state.user.examID = action.payload.examID;
                }
            })
            .addCase(updateAppUserExam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Can azaltma işlemi
            .addCase(decreaseLife.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(decreaseLife.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(decreaseLife.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(toggleUserBan.pending, (state) => {
                state.banOperation.status = 'loading';
                state.banOperation.error = null;
            })
            .addCase(toggleUserBan.fulfilled, (state, action) => {
                state.banOperation.status = 'succeeded';

                // Update user in users array
                const userId = action.payload.userId;
                const newBanStatus = action.payload.newBanStatus;

                // Update in users list
                state.users = state.users.map(user =>
                    user.userId === userId ? { ...user, ban: newBanStatus } : user
                );

                // Update in current user if it's the same user
                if (state.user && state.user.userId === userId) {
                    state.user.ban = newBanStatus;
                }
            })
            .addCase(toggleUserBan.rejected, (state, action) => {
                state.banOperation.status = 'failed';
                state.banOperation.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.changePasswordResult.status = 'loading';
                state.changePasswordResult.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.changePasswordResult.status = 'succeeded';
                // istersen başarılı mesajı gibi bir şey eklenebilir
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordResult.status = 'failed';
                state.changePasswordResult.error = action.payload;
            })

    },
});

export default appUserSlice.reducer;
