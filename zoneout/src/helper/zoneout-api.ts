import axios from "axios";

import * as ENDPOINTS from "@constants/endpoints";
import { appAxios } from "@services/api-config";

const SERVER_URL = "http://172.20.10.2:3001"

export const signUp = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_SIGNUP, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_SIGNUP);
    console.log("SignUp Response:", response.data);
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

export const verifyOTP = async (data: { userId: string }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_VERIFY_OTP, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_VERIFY_OTP);
    console.log("verifyOTP Response:", response.data);
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

export const checkCampus = async (data: { userId: string; coords: { lat: number; lng: number } }) => {
  console.log("data", data);
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_CHECK_COLLEGE, data);
    console.log("response.data", response.data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_CHECK_COLLEGE);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};

export const setCampus = async (data: { userId: string; campusId: string }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_SET_COLLEGE, data);
    console.log("response.data", response.data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_SET_COLLEGE);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
}

export const setDOB = async (data: { userId: string; dob: Date }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_SET_DOB, data);
    console.log("response.data", response.data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_SET_DOB);

    return { success: true, data: response.data };
  } catch (error:any) {
    console.log("Something went wrong!!",error.response.data.details);
    return { error: "An unexpected error occurred" };
  }
};

export const signInWithGoogle = async (data: { provider: string; id_token: any }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_OAUTH, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_OAUTH);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};
export const getUserDetails = async () => {
  try {
    const response = await appAxios.get(SERVER_URL + ENDPOINTS.AUTH_USER_DETAILS);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_USER_DETAILS);
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
// Events
export const getAllEvent = async () => {
  const response = await appAxios.get(ENDPOINTS.EVENTS_ALL);
  console.log("Response getAllEvent", response.data.events.length);
};

// Connections
export const getConnectionDetails = async (connnectionId: string) => {
  try {
    const response = await appAxios.get(SERVER_URL + ENDPOINTS.CONNECTION + "/" + connnectionId);
    console.log("URL:", SERVER_URL + ENDPOINTS.CONNECTION + "/" + connnectionId);
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
