export const REJECTED = (thunkAPI, e) => thunkAPI.rejectWithValue(
        e.response?.data?.message ?? e.message ?? "Unknown error",
    );