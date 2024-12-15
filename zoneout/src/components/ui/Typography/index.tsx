import React from "react";
import { RegisteredStyle, Text, TextStyle, Animated } from "react-native";
import { useTheme } from "@react-navigation/native";

import { styles } from "./styles";

import * as FONTS from "@constants/font";
import { getFontSize } from "../../../utils/font-scaling";

interface Props {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
  fontFamily?: string;
  fontSize?: number;
  style?: TextStyle | RegisteredStyle<TextStyle> | any;
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

const Typography: React.FC<Props> = ({
  variant = "body",
  fontFamily = FONTS.POPPINS_REGULAR,
  fontSize,
  style,
  onLayout,
  children,
  numberOfLines,
}) => {
  const { colors } = useTheme();

  let computedFontSize: number;
  switch (variant) {
    case "h1":
      computedFontSize = getFontSize(fontSize || 22);
      break;
    case "h2":
      computedFontSize = getFontSize(fontSize || 20);
      break;
    case "h3":
      computedFontSize = getFontSize(fontSize || 18);
      break;
    case "h4":
      computedFontSize = getFontSize(fontSize || 16);
      break;
    case "h5":
      computedFontSize = getFontSize(fontSize || 14);
      break;
    case "h6":
      computedFontSize = getFontSize(fontSize || 12);
      break;
    case "h7":
      computedFontSize = getFontSize(fontSize || 12);
      break;
    case "h8":
      computedFontSize = getFontSize(fontSize || 10);
      break;
    case "h9":
      computedFontSize = getFontSize(fontSize || 9);
      break;
    default:
      computedFontSize = getFontSize(fontSize || 12);
  }

  return (
    <Animated.Text
      onLayout={onLayout}
      style={[styles.text, { color: colors.text, fontSize: computedFontSize, fontFamily }, style]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}>
      {children}
    </Animated.Text>
  );
};

export default Typography;
