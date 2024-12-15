import { StyleSheet } from "react-native";
import { normalizeHeight, normalizeWidth } from "../../../utils/scaling";
import { horizontalSpacing, verticalSpacing } from "../../../styles/global-paddings";

import * as COLORS from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: horizontalSpacing * 0.5,
    paddingVertical: verticalSpacing * 0.4,
    borderRadius: 5,
  },
});

export const textVariants = StyleSheet.create({
  primary: {
    color: COLORS.WHITE,
  },
  outlined: {
    color: COLORS.BLACK,
  },
});

export const buttonVariants = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.BLACK,
    borderWidth: 2,
    borderColor: COLORS.BLACK
  },
  outlined: {
    // backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.GRAY_200
  },
});
