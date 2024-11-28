import axios from "axios";

import * as ENDPOINTS from "@constants/endpoints";

const SERVER_URL = "http://172.20.10.2:3001";

export const signUp = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_SIGNUP, data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_SIGNUP);
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
    return { success: response.data };
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

export const checkCollege = async (data: { userId: string; coords: { lat: number; lng: number } }) => {
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

export const setDOB = async (data: { userId: string; dob: Date }) => {
  try {
    const response = await axios.post(SERVER_URL + ENDPOINTS.AUTH_SET_DOB, data);
    console.log("response.data", response.data);
    console.log("URL:", SERVER_URL + ENDPOINTS.AUTH_SET_DOB);

    return { success: true, data: response.data };
  } catch (error) {
    console.log("Something went wrong!!");
    return { error: "An unexpected error occurred" };
  }
};
