import {View} from 'react-native';

import Button from '@components/ui/button';
import Typography from '@components/ui/typography';

import * as ROUTES from '@constants/routes';

const SignUpScreen = ({navigation}: any) => {
  const verifyEmail = () => {
    navigation.navigate(ROUTES.SIGN_UP, {screen: ROUTES.SIGN_UP_OTP});
  };
  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <Button variant="secondary" onPress={verifyEmail} text="Continue" />
    </View>
  );
};

export default SignUpScreen;
