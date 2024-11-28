import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
  },
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
