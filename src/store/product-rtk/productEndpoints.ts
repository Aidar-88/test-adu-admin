import { IProductGetOne, IProductUpdateOne } from "./../../types/IProduct";
import {
  IProduct,
  IProductConfirmBody,
  IProductGetOneResponse,
  IProductResponse,
} from "../../types/IProduct";
import productApi from "./productApi";
import { IAddProductTag } from "../../types/ITag";

export const productEndpoints = productApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse, object>({
      query: (filters) => ({
        url: `/product`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["products"],
    }),
    getShopProducts: builder.query<IProductResponse, object>({
      query: (filters) => ({
        url: `/product/admin-products`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["products"],
    }),
    getOneProduct: builder.query<IProductGetOneResponse, string>({
      query: (productId) => ({
        url: `/product/get-one/${productId}`,
      }),
      providesTags: ["one-product"],
    }),
    confirmProduct: builder.mutation<IProduct, IProductConfirmBody>({
      query: (body) => ({
        url: `/product/confirm-product`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["one-product", "products"],
    }),
    updateProduct: builder.mutation<IProductGetOne, IProductUpdateOne>({
      query: (product) => ({
        url: `/product/update/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["one-product", "products"],
    }),

    // ForTagEndpoint
    addProductTag: builder.mutation<IAddProductTag, IAddProductTag>({
      query: (body) => ({
        url: `/tag/add-product`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProductTag: builder.mutation<IAddProductTag, IAddProductTag>({
      query: (body) => ({
        url: `/tag/remove-product`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetShopProductsQuery,
  useGetOneProductQuery,
  useConfirmProductMutation,
  useUpdateProductMutation,
  useAddProductTagMutation,
  useDeleteProductTagMutation,
} = productEndpoints;
