import {
  ICategory,
  ICreateCategory,
  IDeleteCategory,
} from "../../types/ICategory";
import categoryApi from "./categoryApi";

export const bannerEndpoints = categoryApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], string>({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["categories"],
    }),
    getCategorySubs: builder.query<ICategory[], string>({
      query: (categoryId) => ({
        url: `/category/subs/${categoryId}`,
      }),
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<ICategory[], ICreateCategory>({
      query: (category) => ({
        url: `/category`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<ICategory[], IDeleteCategory>({
      query: (category) => ({
        url: `/category/${category.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategorySubsQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = bannerEndpoints;
