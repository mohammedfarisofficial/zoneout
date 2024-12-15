import { normalizeWidth } from "../utils/scaling";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  profileImage: {
    width: normalizeWidth(40),
    aspectRatio: 1,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    alignItems:"center"
  },
});
