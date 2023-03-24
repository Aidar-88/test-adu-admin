import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../rtk-api/rtkApi";

export default createApi({
  reducerPath: "specApi",
  baseQuery: baseQuery,
  tagTypes: ["specs"],
  endpoints: () => ({}),
});
