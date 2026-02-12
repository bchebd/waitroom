import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = createApi({
    reducerPath: "tags",
    tagTypes: ["Tag"],
    baseQuery: fetchBaseQuery({ baseUrl }),
    refetchOnReconnect: true,
    refetchOnFocus: true,
    endpoints: () => ({})
});