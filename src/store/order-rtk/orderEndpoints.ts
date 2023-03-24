import { IAllOrdersResponse, IOneOrderResponse } from "../../types/IOrder";
import orderApi from "./orderApi";

export const orderEndpoints = orderApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<IAllOrdersResponse, object>({
      query: (filters) => ({
        url: `/order`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["orders"],
    }),
    getShopOrders: builder.query<IAllOrdersResponse, object>({
      query: (filters) => ({
        url: `/order/shop/`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["orders"],
    }),
    // getAllOrders: builder.query<IAllOrdersResponse, object>({
    //   query: (filters) => ({
    //     url: `/order`,
    //     params: { ...filters },
    //   }),
    //   providesTags: ["orders"],
    // }),
    getOneOrder: builder.query<IOneOrderResponse, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOneOrderQuery,
  useGetShopOrdersQuery,
} = orderEndpoints;
