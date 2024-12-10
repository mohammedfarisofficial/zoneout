import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Connection {
  _id: string;
  email: string;
  location: [number, number];
}
interface AuthUser {
  _id: string;
  connections: [Connection] | [];
}
interface AuthState {
  isLogged: boolean;
  authUser: AuthUser | null;
}
const initialState: AuthState = {
  isLogged: false,
  authUser: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<AuthUser>) => {
      state.isLogged = true;
      state.authUser = action.payload;
    },
    logout: state => {
      state.isLogged = false;
      state.authUser = null;
    },
    updateConnectionLocation: (state, action: PayloadAction<{ user_id: string; location: [number, number] }>) => {
      const connection = state.authUser?.connections.find(c => c._id === action.payload.user_id);
      if (connection) {
        connection.location = action.payload.location;
      }
    },
  },
});

export const { setLogged, logout, updateConnectionLocation } = authSlice.actions;
export default authSlice.reducer;
