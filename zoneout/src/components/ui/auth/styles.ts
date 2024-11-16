import { ScaledSheet } from 'react-native-size-matters';

import * as COLORS from '@constants/colors';

// Default Style
export const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'pink',
    width: '300@s',
    paddingVertical: '12@vs',
    margin: '3@s',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row"
  },
  textDefault: {
    color: COLORS.WHITE,
    paddingLeft: "10@vs",
    fontSize: "11@s"
  },
});

// Button Container
export const containerVariants = ScaledSheet.create({
  google: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY_300,
    borderWidth: '1@s',
  },
  apple: {
    backgroundColor: COLORS.BLACK,
    borderColor: 'transparent',
    borderWidth: '1@s',
  },
  email: {
    backgroundColor: COLORS.BLUE_600,
    borderColor: 'transparent',
    borderWidth: '1@s',
  },
});

// Button Text
export const textVariants = ScaledSheet.create({
  google: {
    color: COLORS.BLACK,
  },
  apple: {
    color: COLORS.WHITE,
  },
  email: {
    color: COLORS.WHITE,
  },
});
