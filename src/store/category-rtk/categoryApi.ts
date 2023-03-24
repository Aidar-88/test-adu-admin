import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../rtk-api/rtkApi";

export default createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQuery,
  tagTypes: ["categories"],
  endpoints: () => ({}),
});
