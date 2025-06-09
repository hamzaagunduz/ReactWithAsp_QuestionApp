import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../app/apiClient';

// Test Group oluşturma thunk'ı
export const createTestGroup = createAsyncThunk(
    'TestGroup/createTestGroup',
    async (testGroupData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('TestGroups', testGroupData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

// Test Group güncelleme thunk'ı (PUT)
export const updateTestGroup = createAsyncThunk(
    'TestGroup/updateTestGroup',
    async (testGroupData, { rejectWithValue }) => {
        try {
            const response = await apiClient.put('TestGroups', testGroupData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'API hata mesajı');
        }
    }
);

const TestGroupSlice = createSlice({
    name: 'TestGroup',
    initialState: {
        testGroups: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createTestGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTestGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.testGroups.push(action.payload);
            })
            .addCase(createTestGroup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updateTestGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTestGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updated = action.payload;
                const index = state.testGroups.findIndex(g => g.testGroupID === updated.testGroupID);
                if (index !== -1) {
                    state.testGroups[index] = updated;
                }
            })
            .addCase(updateTestGroup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default TestGroupSlice.reducer;
