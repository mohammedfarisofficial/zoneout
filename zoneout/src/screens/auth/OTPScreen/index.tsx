import {View} from 'react-native';

import Typography from '@components/ui/typography';
import Button from '@components/ui/button';

import * as ROUTES from '@constants/routes';

const OTPScreen = ({ navigation } : any) => {
  const verifyOTP = () => {
    navigation.navigate(ROUTES.SIGN_UP, {screen: ROUTES.SIGN_UP_SELECT_COLLEGE});
  };
  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <Button variant="secondary" onPress={verifyOTP} text="Verify" />
    </View>
  );
};

export default OTPScreen;
