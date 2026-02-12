export const REJECTED = (thunkAPI: any, e: any) => thunkAPI.rejectWithValue(
        e.response?.data?.message ?? e.message ?? "Unknown error",
    );