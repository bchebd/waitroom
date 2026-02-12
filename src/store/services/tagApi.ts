import { api } from "@/store/services/api";
import type { Tag } from "@/types/entity.types";

export const tagApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query<Tag[], void>({
            query: () => "ticket",
            providesTags: (result) =>
                result ?
                [
                    ...result.map((tag) => ({ type: "Tag" as const, id: tag.id })),
                    { type: "Tag", id: "LIST"}
                ] :
                [
                    { type: "Tag", id: "LIST"}
                ]
        }),
        addTag: builder.mutation<Tag, number>({
            query: (userId: number) => ({
                url: "ticket",
                method: "POST",
                body: { userId: userId }
            }),
            invalidatesTags: [{ type: "Tag", id: "LIST" }],
        }),
        deleteTag: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `ticket/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Tag", id: "LIST" }],
        }),
    }),
    overrideExisting: false, 
});

export const { useGetTagsQuery, useDeleteTagMutation, useAddTagMutation } = tagApi;