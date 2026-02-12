import { createSlice } from '@reduxjs/toolkit';

import { refreshUser, registration } from '@/store/operations/authThunk';
import { getUsers } from '@/store/operations/usersThunk';

interface LoadingState {
    isLoading: boolean 
}

const initialState: LoadingState = {
    isLoading: false
};

const PENDING = (state: LoadingState) => {
    state.isLoading = true
};

const FULFILLED = (state: LoadingState) => {
    state.isLoading = false
};

const REJECTED = (state: LoadingState) => {
    state.isLoading = false
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registration.pending, PENDING)
        .addCase(registration.fulfilled, FULFILLED)
        .addCase(registration.rejected, REJECTED)

        .addCase(refreshUser.pending, PENDING)
        .addCase(refreshUser.fulfilled, FULFILLED)
        .addCase(refreshUser.rejected, REJECTED)

        .addCase(getUsers.pending, PENDING)
        .addCase(getUsers.fulfilled, FULFILLED)
        .addCase(getUsers.rejected, REJECTED)
    },
});

export const loadingReducer = loadingSlice.reducer;