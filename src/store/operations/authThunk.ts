import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '@/store/operations/instance';
import type { User } from '@/types/entity.types';
import { REJECTED } from "@/store/operations/rejected";

export const registration = createAsyncThunk<User, Omit<User, "id">, { rejectValue: string }>(
    'auth/registration',
    async (user: Omit<User, "id">, thunkAPI) => {
        try {
            const response = await instance.post<User>('users', user);
            
            return response.data;
        } catch (e) {
            return REJECTED(thunkAPI, e);
        }
    },
);

export const refreshUser = createAsyncThunk<User, number, { rejectValue: string }>(
    "auth/refresh",
    async (id: number, thunkAPI) => {
        try {
            const response = await instance.get<User>(`users/${id}`);
            
            return response.data;
        } catch (e) {
            return REJECTED(thunkAPI, e);
        }
    }
);