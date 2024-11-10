import {ScaledSheet} from 'react-native-size-matters';

import * as COLORS from '@constants/colors';

export const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'pink',
    width: '300@s',
    paddingVertical: '12@vs',
    margin: '1@s',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDefault: {
    color: COLORS.WHITE,
  },
});


// Variants
export const containerVariants = ScaledSheet.create({
  primary: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: 'transparent',
  },
  secondary: {
    backgroundColor: '#2ecc71',
    borderColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#3498db',
    borderWidth: 1,
  },
});

export const textVariants = ScaledSheet.create({
  primary: {
    color: COLORS.WHITE,
  },
  secondary: {
    color: COLORS.WHITE,
  },
  outline: {
    color: COLORS.WHITE,
  },
});
