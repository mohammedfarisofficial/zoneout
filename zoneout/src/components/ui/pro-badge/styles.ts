import { ScaledSheet, verticalScale } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

export const styles = ScaledSheet.create({
  badgeContainer: {
    alignContent:'center',
    paddingVertical: "2@vs",
    paddingHorizontal:"10@s",
    marginHorizontal:"5@s",
    alignSelf: "flex-start",
    borderWidth: 1  ,
    borderRadius: "10@vs",
    borderColor:COLORS.PINK_300,
    backgroundColor:COLORS.PINK_300,
    justifyContent:'center',
    alignItems:"center"
  }
});
