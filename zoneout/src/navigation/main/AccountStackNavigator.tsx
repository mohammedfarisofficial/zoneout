import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "@screens/main/AccountScreen";
import NotificationSettings from "@screens/main/NotificationSettings";

import * as ROUTES from "@constants/routes";

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.ACCOUNT_HOME} component={AccountScreen} />
      <Stack.Screen name={ROUTES.ACCOUNT_NOTIFICATION} component={NotificationSettings} />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
