import { appAxios } from "@services/api-config";

import * as ENDPOINTS from "@constants/endpoints";

const SERVER_URL = "http://172.20.10.2:3001";

export const getUserNotications = async () => {
  try {
    const response = await appAxios.get(SERVER_URL + ENDPOINTS.NOTIFICATIONS);
    console.log("URL:", SERVER_URL + ENDPOINTS.CONNECTION_REQUEST);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data) {
        return { error: error.response.data };
      }
    }
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};

export const rejectNotification = async (data: { requestId: string; notificationId: string }) => {
  try {
    const response = await appAxios.post(SERVER_URL + ENDPOINTS.CONNECTION_REJECT, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.CONNECTION_REJECT);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data) {
        return { error: error.response.data };
      }
    }
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};

export const acceptNotification = async (data: { requestId: string; notificationId: string }) => {
  try {
    const response = await appAxios.post(SERVER_URL + ENDPOINTS.CONNECTION_ACCEPT, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.CONNECTION_ACCEPT);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data) {
        return { error: error.response.data };
      }
    }
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};