import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../rtk-api/rtkApi";

export default createApi({
  reducerPath: "roleApi",
  baseQuery: baseQuery,
  tagTypes: ["roles"],
  endpoints: () => ({}),
});