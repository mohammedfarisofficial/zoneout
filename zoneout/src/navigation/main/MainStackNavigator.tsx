import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "@screens/main/MapScreen";
import ZoneDetailsScreen from "@screens/main/ZoneDetailsScreen";
import UserDetailsScreen from "@screens/main/UserDetailsScreen";
import CampusDetailsScreen from "@screens/main/CampusDetailsScreen";
import NotificationScreen from "@screens/main/NotificationScreen";

import * as ROUTES from "@constants/routes";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN_MAP} component={MapScreen} />
      <Stack.Screen name={ROUTES.MAIN_ZONE_DETAILS} options={{ headerShown: false }} component={ZoneDetailsScreen} />
      <Stack.Screen name={ROUTES.MAIN_USER_DETAILS} options={{ headerShown: false }} component={UserDetailsScreen} />
      <Stack.Screen name={ROUTES.MAIN_CAMPUS_DETAILS} options={{ headerShown: false, presentation: "modal" }} component={CampusDetailsScreen} />
      <Stack.Screen name={ROUTES.MAIN_NOTIFICATION} options={{ headerShown: false, presentation: "modal" }} component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
