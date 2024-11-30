import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Connection {
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
  },
});

export const { setLogged, logout } = authSlice.actions;
export default authSlice.reducer;
