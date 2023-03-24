import { IAddProductTag, ICreateNewTag, ITag } from "../../types/ITag";
import tagApi from "./tagApi";

export const tagEndpoints = tagApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], string>({
      query: () => ({
        url: `/tag`,
      }),
      providesTags: ["tags"],
    }),
    getOneTag: builder.query<ITag[], string>({
      query: (tagId) => ({
        url: `/tag/${tagId}`,
      }),
      providesTags: ["tags"],
    }),
    createTag: builder.mutation<ICreateNewTag, FormData>({
      query: (formData) => ({
        url: `/tag/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["tags"],
    }),
  }),
});

export const { useGetTagsQuery, useGetOneTagQuery, useCreateTagMutation } =
  tagEndpoints;
