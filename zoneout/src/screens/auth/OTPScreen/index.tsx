import { Keyboard, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";
import * as AC_STATUS from "@constants/account-status";

import { verifyOTP } from "../../../helper/zoneout-api";
import { useLayoutEffect, useState } from "react";
import { useAuth } from "src/context/AuthContext";
import { appStorage } from "@services/mmkv-storage";

const OTPScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};

  const [otpCode, setOtpCode] = useState<string>("");

  const { setIsLogged } = useAuth();

  useLayoutEffect(() => {
    if (!userId) {
      navigation.navigate("welcome");
    }
  }, []);

  const verifyOTPHandler = async () => {
    // Keyboard.dismiss();
    const formData = { userId, otp_code: otpCode };
    const { error, success, data } = await verifyOTP(formData);

    if (error) {
      console.log("Response", error);
    } else if (success) {
      Keyboard.dismiss();
      console.log("data=======", data);
      switch (data.account_status) {
        case AC_STATUS.VERIFIED_ACCOUNT:
          // SignIn
          try {
            navigation.reset({
              index: 0,
              routes: [{ name: ROUTES.AUTH_WELCOME }],
            });
            appStorage.setItem("isLogged", "true");
            setIsLogged(true);
          } catch (error) {
            console.error("Error during login:", error);
          }
          break;
        case AC_STATUS.NO_ACCOUNT:
          navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SELECT_COLLEGE, params: { userId } });
          break;
        default:
          break;
      }
    }

    return;
  };
  return (
    <View>
      <Typography>SignUp OTP Screen</Typography>
      <OtpInput numberOfDigits={6} type="alphanumeric" onTextChange={text => setOtpCode(text)} />
      <Button variant="secondary" onPress={verifyOTPHandler} text="Verify" />
    </View>
  );
};

export default OTPScreen;
