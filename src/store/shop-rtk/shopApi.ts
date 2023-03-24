import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../rtk-api/rtkApi";

export default createApi({
  reducerPath: "shopApi",
  baseQuery: baseQuery,
  tagTypes: ["shops", "one-shop", "shop-products", "shop-orders", "one-product", "products"],
  endpoints: () => ({}),
});