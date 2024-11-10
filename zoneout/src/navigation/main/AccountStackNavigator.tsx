import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '@screens/main/AccountScreen';

import MapScreen from '@screens/main/MapScreen';
import NotificationSettings from '@screens/main/NotificationSettings';

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="account-home" component={AccountScreen} />
        <Stack.Screen name="account-notification" component={NotificationSettings} />
    </Stack.Navigator>
  )
}

export default AccountStackNavigator