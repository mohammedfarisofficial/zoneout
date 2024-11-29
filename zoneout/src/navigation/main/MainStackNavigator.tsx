import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "@screens/auth/WelcomeScreen";
import MapScreen from "@screens/main/MapScreen";
import ZoneDetailsScreen from "@screens/main/ZoneDetailsScreen";

import * as ROUTES from "@constants/routes";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.MAIN_MAP} component={MapScreen} />
      <Stack.Screen name={ROUTES.MAIN_ZONE_DETAILS} options={{ headerShown: false }} component={ZoneDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
