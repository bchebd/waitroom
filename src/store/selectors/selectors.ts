import type { RootState } from "@/store/store";

export const authSelector = (state: RootState) => state.auth;

export const loadingSelector = (state: RootState) => state.loading.isLoading;

export const usersSelector = (state: RootState) => state.users;

export const tagSelector = (state: RootState) => state.tags;