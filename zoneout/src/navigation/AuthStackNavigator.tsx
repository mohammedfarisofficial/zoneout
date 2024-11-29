import { createStackNavigator } from "@react-navigation/stack";

import SignUpStackNavigator from "./auth/SignUpStackNavigator";

import WelcomeScreen from "@screens/auth/WelcomeScreen";

import * as ROUTES from "@constants/routes";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.AUTH_WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP} options={{ presentation: "modal" }} component={SignUpStackNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
