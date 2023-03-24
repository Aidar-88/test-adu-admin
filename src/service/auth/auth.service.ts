import { DEV_API, PROD_API } from "./../../api/index";
import { AxiosResponse } from "axios";
import { $api } from "../../api";
import { ILogin, ILoginResponse } from "../../types/ILogin";
import axios from "axios";

export class AuthService {
  static async login(creds: ILogin): Promise<AxiosResponse<ILoginResponse>> {
    return $api.post<ILoginResponse>(`auth/login`, creds);
  }

  static async refresh(): Promise<AxiosResponse<ILoginResponse>> {
    return axios.get<ILoginResponse>(`auth/refresh`, {
      withCredentials: true,
    });
  }

  static async logout(): Promise<AxiosResponse<ILoginResponse>> {
    return axios.get(`auth/logout`, { withCredentials: true });
  }
}
