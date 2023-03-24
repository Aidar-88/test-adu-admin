import { $api, DEV_API, getApi, PROD_API } from "./../../api/index";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { $api } from '../../api/index';

export const baseQuery = fetchBaseQuery({
  baseUrl: getApi().baseURL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.set("Authorization", "NO HEADER");
    }
    return headers;
  },
});
