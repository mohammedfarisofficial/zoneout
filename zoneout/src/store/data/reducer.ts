import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    collegeRegion: null,
  },
  reducers: {
    setCurrentCollege: (state, action) => {
      state.collegeRegion = action.payload;
    },
  },
});

export const { setCurrentCollege } = dataSlice.actions;
export default dataSlice.reducer;
