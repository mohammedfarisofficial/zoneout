// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const getItem = async (key: string): Promise<any | null> => {
//   try {
//     const item = await AsyncStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   } catch (error) {
//     console.error(`Error retrieving item with key "${key}":`, error);
//     return null;
//   }
// };

// export const setItem = async (key: string, value: any): Promise<boolean> => {
//   try {
//     const item = JSON.stringify(value);
//     await AsyncStorage.setItem(key, item);
//     return true;
//   } catch (error) {
//     console.error(`Error saving item with key "${key}":`, error);
//     return false;
//   }
// };

// export const removeItem = async (key: string): Promise<boolean> => {
//   try {
//     await AsyncStorage.removeItem(key);
//     return true;
//   } catch (error) {
//     console.error(`Error removing item with key "${key}":`, error);
//     return false;
//   }
// };

// export const clearStorage = async (): Promise<boolean> => {
//   try {
//     await AsyncStorage.clear();
//     return true;
//   } catch (error) {
//     console.error("Error clearing AsyncStorage:", error);
//     return false;
//   }
// };
