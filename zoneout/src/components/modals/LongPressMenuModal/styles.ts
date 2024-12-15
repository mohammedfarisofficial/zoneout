import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";
import { normalizeHeight, normalizeWidth } from "@utils/scaling";
import { verticalSpacing } from "@styles/global-paddings";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  contentContainer: {
    flex: 1,
    flexDirection:"row",
    justifyContent:"center",
    paddingTop: normalizeHeight(20) + verticalSpacing * 4.5,
    gap: normalizeWidth(verticalSpacing),
    position:"relative"
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
