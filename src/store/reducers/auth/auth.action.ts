import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse } from "../../../types/ILogin";
import { AuthService } from "../../../service/auth/auth.service";

export const login = createAsyncThunk<ILoginResponse, ILogin>(
  "auth/login",
  async function (creds, { rejectWithValue }) {
    try {
      let isAdmin = false;
      const response = await AuthService.login(creds);
      response.data.user.roles.map((role) => {
        if (role.value === "ADMIN" || role.value === "SUPER-ADMIN") {
          isAdmin = true;
        }
      });
      if (isAdmin) {
        console.log("From actions, your role: ", response.data.user.roles);
        localStorage.setItem("access_token", response.data.access_token);
        return response.data;
      } else {
        console.log("У вас нет Доступа");
        return rejectWithValue("Нет Доступа");
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const checkAuth = createAsyncThunk<any>(
  "auth/refresh",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.refresh();
      localStorage.setItem("access_token", response.data.access_token);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk<any>(
  "auth/logout",
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("access_token");
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
