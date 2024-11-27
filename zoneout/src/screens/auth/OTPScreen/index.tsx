import { Keyboard, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";

import { verifyOTP } from "../../../helper/zoneout-api";
import { useLayoutEffect, useState } from "react";

const OTPScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};

  const [otpCode, setOtpCode] = useState<string>("");

  useLayoutEffect(() => {
    if (!userId) {
      navigation.navigate("welcome");
    }
  }, []);

  const verifyOTPHandler = async () => {
    // Keyboard.dismiss();
    const formData = { userId, otp_code: otpCode };
    const { success, error } = await verifyOTP(formData);

    if (error) {
      console.log("Response", error);
    } else if (success) {
      Keyboard.dismiss();
      navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SELECT_COLLEGE, params: { userId } });
      console.log("Success", success);
    }

    return;
  };
  return (
    <View>
      <Typography>SignUp OTP Screen</Typography>
      <OtpInput numberOfDigits={6} type="alphanumeric" onTextChange={text => setOtpCode(text)} onFilled={verifyOTPHandler} />
      <Button variant="secondary" onPress={verifyOTPHandler} text="Verify" />
    </View>
  );
};

export default OTPScreen;
