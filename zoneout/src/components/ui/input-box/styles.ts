import { ScaledSheet } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

import * as COLORS from "@constants/colors";
import * as FONTS from "@constants/font";

export const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_200,
    width: "300@vs",
    height: "50@ms",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
    paddingLeft: "16@vs",
    justifyContent: "flex-end",
    marginVertical: "10@vs",
    // paddingVertical: "12@vs",
    // margin: "1@s",
    // borderRadius: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  inputBox: {
    // backgroundColor: COLORS.BLUE_600,
    height: "80%",
    width: "80%",
    fontSize: RFValue(14),
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.BLACK,
  },
  rightContainer: {
    height: "100%",
    // backgroundColor: COLORS.BLUE_600,
    width: "45@vs",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    zIndex: 9,
  },
  label: {
    position: "absolute",
    // bottom: "50%",
    marginLeft: "16@vs",
    zIndex: 9,
  },
});
