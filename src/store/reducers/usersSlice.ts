import type { User } from "@/types/entity.types";
import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../operations/usersThunk";

const initialState: Omit<User, "passwd">[] = [];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (_, action) => {
            return action.payload;
        })
    }
});

export const usersReducer = usersSlice.reducer;