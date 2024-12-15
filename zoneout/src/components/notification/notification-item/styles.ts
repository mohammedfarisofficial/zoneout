import { StyleSheet } from "react-native";
import { normalizeHeight, normalizeWidth } from "../../../utils/scaling";
import { horizontalSpacing } from "../../../styles/global-paddings";

import * as COLORS from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: normalizeHeight(13),
    paddingHorizontal: horizontalSpacing,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    width: "15%",
  },
  bodyContainer: {
    width: "85%",
    paddingTop: normalizeHeight(2),
  },
});
