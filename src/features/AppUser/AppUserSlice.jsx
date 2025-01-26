// src/features/AppUser/AppUserSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';  // apiClient'ı import ediyoruz

// API'den AppUser bilgilerini almak için thunk fonksiyonu
export const fetchAppUser = createAsyncThunk(
    'appUser/fetchAppUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`AppUser/${userId}`);  // API'ye istek atıyoruz
            return response.data;  // Gelen veriyi döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');  // Hata durumunda mesaj
        }
    }
);

// AppUser'ı güncellemek için thunk fonksiyonu
export const updateAppUserExam = createAsyncThunk(
    'AppUser/UpdateUserExam',
    async ({ userId, examID }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`AppUser/UpdateUserExam`, {
                userId: userId,
                examID: examID,
            });
            return response.data;  // Başarılı güncellemeyi döndürüyoruz
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');  // Hata durumunda mesaj
        }
    }
);

const appUserSlice = createSlice({
    name: 'appUser',
    initialState: {
        user: null,  // Kullanıcı bilgilerini tutacak state
        status: 'idle',  // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // AppUser bilgilerini getirme işlemi
            .addCase(fetchAppUser.pending, (state) => {
                state.status = 'loading';  // Yükleniyor durumunu ayarlıyoruz
            })
            .addCase(fetchAppUser.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla alındığında
                state.user = action.payload;  // API'den gelen kullanıcı verisini kaydediyoruz
            })
            .addCase(fetchAppUser.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;
            })
            // AppUser'ı güncelleme işlemi
            .addCase(updateAppUserExam.pending, (state) => {
                state.status = 'loading';  // Güncelleme işlemi sırasında yükleniyor
            })
            .addCase(updateAppUserExam.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Veri başarıyla güncellendiğinde
                state.user.examID = action.payload.examID;  // Kullanıcının examID'sini güncelliyoruz
            })
            .addCase(updateAppUserExam.rejected, (state, action) => {
                state.status = 'failed';  // Hata durumunda
                state.error = action.payload;  // Hata mesajını saklıyoruz
            });
    },
});

export default appUserSlice.reducer;
