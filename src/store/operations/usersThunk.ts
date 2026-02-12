import { createAsyncThunk } from "@reduxjs/toolkit";

import type { User } from "@/types/entity.types";
import { instance } from '@/store/operations/instance';
import { REJECTED } from "@/store/operations/rejected";

export const getUsers = createAsyncThunk<Omit<User, "passwd">[], void, { rejectValue: string }>(
    "getUsers",
    async (_, thunkAPI) => {
        try {
            const response = await instance.get<User[]>('users');
            
            const formattedData = response.data.map(user => {
                const newUser = {
                    id: user.id,
                    name: user.name,
                    admin: user.admin
                };

                return newUser;
            });

            return formattedData;
        } catch (e) {
            return REJECTED(thunkAPI, e);
        }
    }
);