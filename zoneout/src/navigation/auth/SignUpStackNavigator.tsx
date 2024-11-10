import {createStackNavigator} from '@react-navigation/stack';

import SelectCollegeScreen from '@screens/auth/SelectCollegeScreen';
import SetProfileScreen from '@screens/auth/SetProfileScreen';
import SignUpScreen from '@screens/auth/SignUpScreen';
import SetDOBScreen from '@screens/auth/SetDOBScreen';
import OTPScreen from '@screens/auth/OTPScreen';

import * as ROUTES from '@constants/routes';

const Stack = createStackNavigator();

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.SIGN_UP_EMAIL} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_OTP} component={OTPScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_SELECT_COLLEGE} component={SelectCollegeScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_SET_DOB} component={SetDOBScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_SET_PROFILE} component={SetProfileScreen} />
    </Stack.Navigator>
  );
};

export default SignUpStackNavigator;
