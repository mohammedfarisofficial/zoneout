import { createStackNavigator } from "@react-navigation/stack";

import SignUpStackNavigator from "./auth/SignUpStackNavigator";

import WelcomeScreen from "@screens/auth/WelcomeScreen";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="sign-up" options={{ presentation: "modal" }} component={SignUpStackNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
