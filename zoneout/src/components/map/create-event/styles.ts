import { StyleSheet } from "react-native";
import { normalizeHeight, normalizeWidth } from "../../../utils/scaling";
import { horizontalSpacing, verticalSpacing } from "../../../styles/global-paddings";
import { gBorderRadius } from "@styles/properties";

import * as COLORS from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: normalizeHeight(5),
    left: normalizeWidth(10),
    right: normalizeWidth(10),
    zIndex: 99,
    // backgroundColor: COLORS.WHITE,
    paddingTop: verticalSpacing,
    // backgroundColor:"red"
  },
  sliderContainer: {
    paddingVertical: verticalSpacing,
    paddingHorizontal: horizontalSpacing,
    borderRadius: gBorderRadius
  }
});
