import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../rtk-api/rtkApi";

export default createApi({
  reducerPath: "tagApi",
  baseQuery: baseQuery,
  tagTypes: ["tags"],
  endpoints: () => ({}),
});