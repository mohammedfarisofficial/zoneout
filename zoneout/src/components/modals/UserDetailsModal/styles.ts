import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "20@s",
    // backgroundColor:"red"
  },
  sheetContainer: {
    backgroundColor: "white",
    borderRadius: "30@s",
  },
  sheetHeaderText: {
    marginBottom: "12@vs",
  },
  innerContainer: {
    backgroundColor: "lightgray",
    width: "30@s",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 50,
  },
});
