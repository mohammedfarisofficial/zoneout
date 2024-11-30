import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import AccountStackNavigator from "@navigation/main/AccountStackNavigator";
import MainStackNavigator from "@navigation/main/MainStackNavigator";
import ChatStackNavigator from "@navigation/chat/ChatStackNavigator";

import * as ROUTES from "@constants/routes";

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
      <Tab.Screen name={ROUTES.MAIN} options={{ headerShown: false }} component={MainStackNavigator} />
      <Tab.Screen name={ROUTES.CHAT} options={{ headerShown: false }} component={ChatStackNavigator} />
      <Tab.Screen name={ROUTES.ACCOUNT} component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
