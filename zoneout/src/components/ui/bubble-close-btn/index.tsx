import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

import Button from "@components/ui/button";

import * as COLORS from "@constants/colors";

interface Props {
  onClose: () => void;
}

const BubbleCloseBtn = ({ onClose }: Props) => {
  return <Button onPress={onClose} containerStyle={{ width: scale(32), height: scale(32), backgroundColor: COLORS.GRAY_200 }} />;
};

export default BubbleCloseBtn;
