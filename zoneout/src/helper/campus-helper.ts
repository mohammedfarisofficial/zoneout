import { appAxios } from "@services/api-config";

import * as ENDPOINTS from "@constants/endpoints";

const SERVER_URL = "http://172.20.10.2:3001";

export const getCampusUsers = async () => {
  try {
    const response = await appAxios.get(SERVER_URL + ENDPOINTS.CAMPUS_USERS);
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
