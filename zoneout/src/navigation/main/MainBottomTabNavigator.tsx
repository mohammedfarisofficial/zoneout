import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MapScreen from "@screens/main/MapScreen";
import AccountStackNavigator from "./AccountStackNavigator";
import MainStackNavigator from "./MainStackNavigator";

import * as ROUTES from "@constants/routes";
import ChatStackNavigator from "../chat/ChatStackNavigator";

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const isTabBarVisible = routeName !== "account-notification";
        return {
          tabBarStyle: {
            display: isTabBarVisible ? "flex" : "none",
          },
          headerShown: false,
        };
      }}>
      <Tab.Screen name="main" options={{ headerShown: false }} component={MainStackNavigator} />
      <Tab.Screen name={ROUTES.CHAT} options={{ headerShown: false }} component={ChatStackNavigator} />
      <Tab.Screen name="account" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
