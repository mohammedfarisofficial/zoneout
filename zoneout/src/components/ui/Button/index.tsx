import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { styles, containerVariants, textVariants } from "./styles";

import Typography from "@components/ui/typography";

import * as FONTS from "@constants/font";

interface Props {
  text?: string;
  textStyle?: TextStyle;
  textSize?: number;
  fontFamily?: string;
  containerStyle?: ViewStyle;
  variant?: "primary" | "secondary" | "outline";
  onPress: () => any;
}

const Button = ({ text, textStyle, textSize, onPress, containerStyle, variant = "primary" }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, containerVariants[variant], containerStyle]}>
      <Typography fontSize={textSize} fontFamily={FONTS.POPPINS_MEDIUM} style={[styles.textDefault, textStyle, textVariants[variant]]}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default Button;
