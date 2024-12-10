import { ScaledSheet, verticalScale } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";

import * as COLORS from "@constants/colors";

const _spacing = verticalScale(150);

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_200,
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: verticalScale(_spacing),
    top: 0,
    zIndex: -1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40@vs",
    zIndex: 1,
  },
  scrollContentContainer: {
    paddingTop: verticalScale(_spacing) * 0.9,
  },
  contentContainer: {
    padding: "16@s",
    backgroundColor: "white",
    borderTopLeftRadius: "30@s",
    borderTopRightRadius: "30@s",
  },
  text: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    marginBottom: "8@vs",
  },
  dummyText: {
    fontSize: RFValue(12),
    marginBottom: "10@vs",
    lineHeight: "18@vs",
  },
  /// User Profile content
  userProfileContent: {
    width:"100%",
    height:"60@vs",
    justifyContent:"center"
  },
  profileContainer: {
    flexDirection: "row",
    alignItems:"center"
  },
  profileImage: {
    width: "40@s",
    aspectRatio: 1,
    borderRadius:"50@s"
  },
  detailsContainer: {
    marginLeft:"12@s"
  },
  usernameContainer: {
    alignContent:'center',
    paddingVertical: "2@vs",
    paddingHorizontal:"10@s",
    alignSelf: "flex-start",
    borderWidth: 1  ,
    borderRadius: "10@vs",
    borderColor:COLORS.GRAY_300,
    justifyContent:'center',
    alignItems:"center"
  }
});
