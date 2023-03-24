import { ICreateNewNotification, INotification } from "../../types/INotification";
import { IOneShopResponse, IShopResponse } from "../../types/IShop";
import notificationApi from "./notificationApi";

export const notificationEndpoints = notificationApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation<INotification, ICreateNewNotification>({
      query: (shop) => ({
        url: `/notification/`,
        method: "POST",
        body: shop,
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const { useCreateNotificationMutation } = notificationEndpoints;
