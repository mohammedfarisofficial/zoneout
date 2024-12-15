import { StyleSheet } from "react-native";
import { normalizeHeight, normalizeWidth } from "../../utils/scaling";
import { horizontalSpacing, verticalSpacing } from "../../styles/global-paddings";

import * as COLORS from "@constants/colors";
import { gBorderRadius } from "@styles/properties";

export const styles = StyleSheet.create({
  container: {
    width: verticalSpacing * 7,
    aspectRatio: 1,
    backgroundColor: COLORS.GRAY_200,
    borderRadius: gBorderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
});
