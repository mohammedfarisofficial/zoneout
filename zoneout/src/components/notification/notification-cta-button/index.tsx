import { TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { buttonVariants, styles, textVariants } from "./styles";

import Typography from "@components/ui/typography";

import * as FONTS from "@constants/font";

import { activeOpacity } from "../../../styles/properties";
import { getFontSize } from "../../../utils/font-scaling";

enum Variants {
  primary = "primary",
  outlined = "outlined",
}
interface Props {
  variant?: keyof typeof Variants;
  onAction: () => void;
  text: string;
  textStyle?: TextStyle;
  style?: ViewStyle;
}
const NotificationCTAButton = ({ variant = Variants.primary, onAction, style = {}, text, textStyle = {} }: Props) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} style={[styles.container, buttonVariants[variant], style]} onPress={onAction}>
      <Typography fontSize={getFontSize(9)} fontFamily={FONTS.POPPINS_MEDIUM} style={[textVariants[variant], textStyle]}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default NotificationCTAButton;
