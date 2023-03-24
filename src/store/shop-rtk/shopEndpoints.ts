import { IOrderResponse } from "../../types/IOrder";
import {
  ICreateNewShop,
  IOneShopResponse,
  IShop,
  IShopApplication,
  IShopResponse,
} from "../../types/IShop";
import shopApi from "./shopApi";

export const shopEndpoints = shopApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<
      IShopResponse,
      { page: number; rowsPerPage: number }
    >({
      query: (pagination) => ({
        url: `/shop/shop-admin`,
        params: {
          page: pagination.page + 1,
          limit: pagination.rowsPerPage,
        },
      }),
      providesTags: ["shops"],
    }),
    getOneShop: builder.query<IOneShopResponse, string>({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
      }),
      providesTags: ["one-shop"],
    }),
    confirmShop: builder.mutation<IShop, string>({
      query: (shopId) => ({
        url: `/shop/confirm-shop/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: ["one-shop"],
    }),
    confirmBlock: builder.mutation<IShop, string>({
      query: (shopId) => ({
        url: `/shop/block/${shopId}`,
        method: "PUT",
      }),
      invalidatesTags: ["one-shop"],
    }),
    getFilteredOrders: builder.query<IOrderResponse, string>({
      query: (shopId) => ({
        url: `/order/shop/${shopId}`,
        // params: { ...filters },
      }),
      providesTags: ["shop-orders"],
    }),
    createShop: builder.mutation<IShop, ICreateNewShop>({
      query: (shop) => ({
        url: `/shop/`,
        method: "POST",
        body: shop,
      }),
      invalidatesTags: ["one-shop", "shops"],
    }),

    // application
    getApplication: builder.query<IShopApplication[], string>({
      query: () => ({
        url: `/application`,
      }),
      providesTags: ["shops"],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetOneShopQuery,
  useConfirmShopMutation,
  useGetFilteredOrdersQuery,
  useConfirmBlockMutation,
  useCreateShopMutation,
  useGetApplicationQuery,
} = shopEndpoints;
