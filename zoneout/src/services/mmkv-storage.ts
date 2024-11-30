import { MMKV } from "react-native-mmkv";

// Secret Storage
export const tokenStorage = new MMKV({
  id: `token-storage`,
  encryptionKey: "hunter2123123123",
});

// App Storage
export const storage = new MMKV({
  id: `zoneout-storage`,
  encryptionKey: "hunter2123123123",
});

export const appStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const data = storage.getString(key);
    return data ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clearAll: () => {
    storage.clearAll();
  },
};
