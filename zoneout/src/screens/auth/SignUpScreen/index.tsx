import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";

import Button from "@components/ui/button";
import InputBox from "@components/ui/input-box";
import Typography from "@components/ui/typography";

import * as ROUTES from "@constants/routes";

import { signUp } from "../../../helper/zoneout-api";

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyEmail = async () => {
    console.log(email, password);
    const formData = { email, password };
    const { success, error, data } = await signUp(formData);

    if (error && error.type === 2) {
      console.log("Response", error);
    } else if (success) {
      Keyboard.dismiss();
      navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_OTP, params: { userId: data.user._id } });
      console.log("Success", success);
    }
  };
  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <InputBox text={email} setText={setEmail} label="Email" />
      <InputBox text={password} setText={setPassword} label="Password" enableClear={false} />
      <KeyboardAvoidingView>
        <Button variant="secondary" onPress={verifyEmail} text="Continue" />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
