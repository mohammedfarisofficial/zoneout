import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";

import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";

import { RootState } from "@store/index";
import { setDOB } from "@helper/zoneout-api";

const SetDOBScreen = ({ navigation, route }: any) => {
  const { userId } = route.params || {};

  const [date, setDate] = useState(new Date());

  const { collegeRegion } = useSelector((state: RootState) => state.data);

  const setDOBhandler = async () => {
    console.log("DOB: ", typeof date);
    const formData = { userId, dob: date };
    const { success, error, data } = await setDOB(formData);

    if (error) {
      console.log("Something went wrong!!");
      return;
    }
    if (success && data) {
      navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SET_PROFILE, params: { userId } });
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
