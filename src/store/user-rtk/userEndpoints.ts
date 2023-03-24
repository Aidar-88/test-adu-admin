import {
  ICreateUser,
  IOneUser,
  IUserRole,
  IUsersResponse,
} from "./../../types/IUser";
import { IAllOrdersResponse, IOneOrderResponse } from "../../types/IOrder";
import userApi from "./userApi";

export const userEndpoints = userApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<string, ICreateUser>({
      query: (user) => ({
        url: `/user`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    getAllUsers: builder.query<IUsersResponse, object>({
      query: (filters) => ({
        url: `/user/list`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["users"],
    }),
    getOneUser: builder.query<IOneUser, string>({
      query: (userId) => ({
        url: `/user/get-one/${userId}`,
      }),
      providesTags: ["users"],
    }),
    getShopOrders: builder.query<IAllOrdersResponse, object>({
      query: (filters) => ({
        url: `/order/shop/`,
        params: {
          ...filters,
        },
      }),
      providesTags: ["users"],
    }),
    getOneOrder: builder.query<IOneOrderResponse, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
      }),
    }),
    addRole: builder.mutation<string, IUserRole>({
      query: (user) => ({
        url: `/user/add-role`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    deleteRole: builder.mutation<string, IUserRole>({
      query: (user) => ({
        url: `/user/remove-role`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useGetOneOrderQuery,
  useGetShopOrdersQuery,
  useAddRoleMutation,
  useDeleteRoleMutation,
  useCreateUserMutation,
} = userEndpoints;
