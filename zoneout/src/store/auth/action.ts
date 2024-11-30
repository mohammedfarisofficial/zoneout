import { appStorage, tokenStorage } from "@services/mmkv-storage";
import { logout } from "./reducer";
import { store } from "@store/index";

export const handleLogout = () => {
  appStorage.clearAll();
  tokenStorage.clearAll();
  store.dispatch(logout({}));
};
