import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";
import { horizontalSpacing, verticalSpacing } from "../../styles/global-paddings";

export const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    // height: "40@vs",
    height: verticalSpacing * 4.5,
    paddingHorizontal: horizontalSpacing,
    justifyContent: "center",
    // backgroundColor: "red",
  },
});
