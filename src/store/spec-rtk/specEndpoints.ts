import { ICategory, ICreateCategory } from "../../types/ICategory";
import {
  IAddCategorySpec,
  IAddValueSpec,
  ICreateSpec,
  IOneSpec,
  ISpec,
} from "../../types/ISpec";
import specApi from "./specApi";
import categoryApi from "./specApi";

export const bannerEndpoints = specApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecs: builder.query<ISpec[], string>({
      query: () => ({
        url: `/spec`,
      }),
      providesTags: ["specs"],
    }),
    getOneSpec: builder.query<IOneSpec, string>({
      query: (tagId) => ({
        url: `/spec/${tagId}`,
      }),
      providesTags: ["specs"],
    }),
    createSpec: builder.mutation<string, ICreateSpec>({
      query: (category) => ({
        url: `/spec`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["specs"],
    }),
    addValueSpec: builder.mutation<string, IAddValueSpec>({
      query: (value) => ({
        url: `/spec/value`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["specs"],
    }),
    addCategoryspec: builder.mutation<string, IAddCategorySpec>({
      query: (value) => ({
        url: `/spec/add-category`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["specs"],
    }),
  }),
});

export const {
  useGetSpecsQuery,
  useGetOneSpecQuery,
  useCreateSpecMutation,
  useAddValueSpecMutation,
  useAddCategoryspecMutation,
} = bannerEndpoints;
