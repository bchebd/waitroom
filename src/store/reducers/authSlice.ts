import { createSlice } from '@reduxjs/toolkit';

import { refreshUser, registration } from '@/store/operations/authThunk';
import type { User } from '@/types/entity.types';

const initialState: Omit<User, "passwd"> = {
    id: null,
    name: "",
    admin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (_, action) => {
            return {
                id: Number.parseInt(action.payload.id as string),
                name: action.payload.name,
                admin: action.payload.admin,
            };
        })
        .addCase(refreshUser.fulfilled, (_, action) => {
            return {
                id: Number.parseInt(action.payload.id as string),
                name: action.payload.name,
                admin: action.payload.admin,
            };
        })
    },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;