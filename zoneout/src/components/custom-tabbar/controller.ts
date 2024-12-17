// tabBarControl.ts
import { useSharedValue } from "react-native-reanimated";

export const tabBarVisibility = useSharedValue(true);

export const showTabBar = () => {
  tabBarVisibility.value = true;
};

export const hideTabBar = () => {
  tabBarVisibility.value = false;
};
