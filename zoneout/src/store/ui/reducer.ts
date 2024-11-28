import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    user: null,
  },
  reducers: {},
});

export const {} = uiSlice.actions;
export default uiSlice.reducer;
