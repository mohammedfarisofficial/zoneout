import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

export const styles = ScaledSheet.create({
  container: {
    // backgroundColor: "lightgray",
    width: "50@s",
    height: "60@vs",
    position:"relative"
  },
  cardContainer: {
    width: "50@s",
    height: "60@s",
    borderRadius: 10,
    position: "absolute"
  },
});
