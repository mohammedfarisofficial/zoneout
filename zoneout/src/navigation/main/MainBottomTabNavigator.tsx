import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MapScreen from "@screens/main/MapScreen";
import AccountStackNavigator from "./AccountStackNavigator";

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
        };
      }}>
      <Tab.Screen name="main-map" component={MapScreen} />
      <Tab.Screen name="account" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
