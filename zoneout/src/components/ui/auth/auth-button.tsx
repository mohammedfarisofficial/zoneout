import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { styles, containerVariants, textVariants } from './styles';
import { scale } from 'react-native-size-matters';;

import GoogleIconSVG from '@components/svg/google-icon';
import AppleLogoSVG from '@components/svg/apple-logo';
import MailIconSVG from '@components/svg/mail-icon';
import Typography from '@components/ui/typography'

import * as FONTS from '@constants/font';

export enum AuthCTAButtonVariants {
  GOOGLE = 'google',
  APPLE = 'apple',
  EMAIL = 'email',
}

interface Props {
  text?: string;
  textStyle?: TextStyle;
  textSize?: number;
  fontFamily?: string;
  containerStyle?: ViewStyle;
  variant?: AuthCTAButtonVariants;
  onPress: () => void;
}

const AuthCTAButton = ({
  text,
  textStyle,
  textSize,
  onPress,
  containerStyle,
  variant = AuthCTAButtonVariants.EMAIL,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, containerStyle, containerVariants[variant]]}>
        { variant === AuthCTAButtonVariants.GOOGLE && <GoogleIconSVG height={scale(16)} width={scale(16)}/> }
        { variant === AuthCTAButtonVariants.APPLE && <AppleLogoSVG height={scale(16)} width={scale(16)}/> }
        { variant === AuthCTAButtonVariants.EMAIL && <MailIconSVG height={scale(16)} width={scale(16)}/> }
      <Typography
        fontSize={textSize}
        fontFamily={FONTS.POPPINS_MEDIUM}
        style={[styles.textDefault, textStyle, textVariants[variant]]}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default AuthCTAButton;
