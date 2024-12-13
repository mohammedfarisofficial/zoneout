import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";

import { RootState, useAppDispatch } from "@store/index";
import { setDOB } from "@helper/zoneout-api";
import { startLoading, stopLoading } from "@store/ui/reducer";
import { appStorage, tokenStorage } from "@services/mmkv-storage";
import { setLogged } from "@store/auth/reducer";

const SetDOBScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};

  const [date, setDate] = useState(new Date());

  const { collegeRegion } = useSelector((state: RootState) => state.data);
  const dispatch = useAppDispatch();

  const setDOBhandler = async () => {
    try {
      const formData = { userId, dob: date };
      dispatch(startLoading());
      const { success, error, data } = await setDOB(formData);

      console.log("data",data)

      if (error) {
        console.log("Something went wrong!!");
        return;
      }
      if (success && data) {
        try {
          console.log("data", data);
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.AUTH_WELCOME }],
          });
          const {
            tokens: { access_token, refresh_token },
            user,
            user_campus,
          } = data;
          if (!access_token || !refresh_token) {
            return;
          }
          tokenStorage.set("access_token", access_token);
          tokenStorage.set("refresh_token", refresh_token);

          appStorage.setItem("isLogged", "true");
          dispatch(setLogged({ user, user_campus }));
        } catch (error) {
          console.error("Error during login:", error);
        }
        // navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SET_PROFILE, params: { userId } });
      }
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      dispatch(stopLoading());
    }
  };
  console.log("collegeRegion from DOB", collegeRegion);
  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <DatePicker theme="light" mode="date" date={date} onDateChange={setDate} />
      <Button variant="secondary" onPress={setDOBhandler} text="Verify" />
    </View>
  );
};

export default SetDOBScreen;
