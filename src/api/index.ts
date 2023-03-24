import axios from "axios";
import { mainModule } from "process";

export const DEV_API = "https://api.adu24.com/";
// export const DEV_API = "https://dev.adu24.com/";

export const PROD_API = "https://api.adu24.com/";

export const getApi = () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return {
      baseURL: PROD_API,
      withCredentials: true,
    };
  }
  return {
    baseURL: DEV_API,
  };
};

export const $api = axios.create(getApi());

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
});

export const $imageApi = "https://adu24.fra1.digitaloceanspaces.com";
// export const $imageApi = "https://adu24file.ams3.digitaloceanspaces.com";
