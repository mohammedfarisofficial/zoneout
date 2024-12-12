import { Keyboard, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";
import * as AC_STATUS from "@constants/account-status";

import { verifyOTP } from "../../../helper/zoneout-api";
import { useLayoutEffect, useState } from "react";
import { appStorage, tokenStorage } from "@services/mmkv-storage";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";
import { setLogged } from "@store/auth/reducer";

const OTPScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};

  const [otpCode, setOtpCode] = useState<string>("");

  // const { setIsLogged } = useAuth();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!userId) {
      navigation.navigate("welcome");
    }
  }, []);

  const verifyOTPHandler = async () => {
    // Keyboard.dismiss();
    try {
      const formData = { userId, otp_code: otpCode };
      dispatch(startLoading());
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
              console.log("data", data);
              navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.AUTH_WELCOME }],
              });
              const {
                tokens: { access_token, refresh_token },
              } = data;
              if (!access_token || !refresh_token) {
                return;
              }
              tokenStorage.set("access_token", access_token);
              tokenStorage.set("refresh_token", refresh_token);

              appStorage.setItem("isLogged", "true");
              dispatch(setLogged(data.user));
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
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      dispatch(stopLoading());
    }
  };
  return (
    <View>
      <Typography>SignUp OTP Screen</Typography>
      <OtpInput autoFocus numberOfDigits={6} type="alphanumeric" onTextChange={text => setOtpCode(text)} />
      <Button variant="secondary" onPress={verifyOTPHandler} text="Verify" />
    </View>
  );
};

export default OTPScreen;
