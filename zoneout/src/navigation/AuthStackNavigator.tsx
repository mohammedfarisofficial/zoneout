import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '@screens/auth/WelcomeScreen';
import SignUpStackNavigator from './auth/SignUpStackNavigator';

const Stack = createStackNavigator();

const AuthStackNavigator = ( ) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name='sign-up' component={SignUpStackNavigator}/>
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
