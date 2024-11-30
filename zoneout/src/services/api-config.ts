import axios from "axios";
import { tokenStorage } from "@services/mmkv-storage";
import { AUTH_REFRESH_TOKEN } from "@constants/endpoints";
import { handleLogout } from "@store/auth/action";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://172.20.10.2:3001";

export const appAxios = axios.create({
  baseURL: SERVER_URL,
});

// Attaching Access Token
appAxios.interceptors.request.use(async config => {
  const access_token = tokenStorage.getString("access_token");
  console.log("access_token", access_token);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error Refreshing token");
      }
    }

    if (error.response && error.response.status != 401) {
      const errorMessage = error.response.data.msg || "Something went wrong";
      //   Toast.show({
      //     type: "normalToast",
      //     props: { msg: errorMessage },
      //   });
    }
    return Promise.reject(error);
  },
);

export const refresh_tokens = async (type?: string, stop?: boolean, updateHook?: () => void) => {
  console.log("Refreshing Token...");
  try {
    const refresh_token = tokenStorage.getString("refresh_token");
    const response = await axios.post(SERVER_URL + AUTH_REFRESH_TOKEN, {
      refresh_token,
    });
    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;

    tokenStorage.set(`access_token`, new_access_token);
    tokenStorage.set(`refresh_token`, new_refresh_token);

    return new_access_token;
  } catch (error: any) {
    console.log("REFRESH TOKEN EXPIRED!!", error.message);
    // User Logout
    handleLogout();
  }
};
