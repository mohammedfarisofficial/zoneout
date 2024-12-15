import * as ENDPOINTS from "@constants/endpoints";
import { appAxios } from "@services/api-config";

const SERVER_URL = "http://172.20.10.2:3001";

export const sendConnectionRequest = async (receiverId: string) => {
  try {
    const response = await appAxios.post(SERVER_URL + ENDPOINTS.CONNECTION_REQUEST, { receiverId });
    console.log("URL:", SERVER_URL + ENDPOINTS.CONNECTION_REQUEST);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data) {
        return { error: error.response.data };
      }
    }
    // Handle any unexpected error and return a structured error message
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" }; // Return an object with an error message
  }
};
