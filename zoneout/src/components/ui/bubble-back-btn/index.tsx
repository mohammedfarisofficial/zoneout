import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

import Button from "@components/ui/button";

import * as COLORS from "@constants/colors";

const BubbleBackBtn = () => {
  const navigation = useNavigation();
  const goBackHandler = () => {
    console.log("-=====")
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return <Button onPress={goBackHandler} containerStyle={{ width: scale(32), height: scale(32), backgroundColor: COLORS.GRAY_200 }} />;
};

export default BubbleBackBtn;
