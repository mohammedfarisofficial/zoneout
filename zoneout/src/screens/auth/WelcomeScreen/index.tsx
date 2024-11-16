import { useCallback, useMemo, useRef } from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import AuthCTAButton, { AuthCTAButtonVariants } from '@components/ui/auth/auth-button';
import Typography from '@components/ui/typography';
import Button from '@components/ui/button';

import * as FONTS from '@constants/font';
import * as ROUTES from '@constants/routes';

const WelcomeScreen = ({ navigation }: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const signUpHandler = () => {
    navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_EMAIL });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button text="Get Started" onPress={openBottomSheet} />
      <BottomSheet
        backgroundStyle={styles.sheetContainer}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Typography variant="h4" fontFamily={FONTS.POPPINS_MEDIUM}>
            Sign In or Create Account
          </Typography>
          <Typography variant="h8" fontFamily={FONTS.POPPINS_REGULAR}>
            By continuing, you agree to our Terms and
          </Typography>
          <Typography variant="h8" style={styles.sheetHeaderText} fontFamily={FONTS.POPPINS_REGULAR}>
            Privacy Policy.
          </Typography>
          <AuthCTAButton
            text="Continue with Google"
            variant={AuthCTAButtonVariants.GOOGLE}
            onPress={() => {
              navigation.navigate('map');
            }}
          />
          <AuthCTAButton text="Continue with Apple" onPress={() => {}} variant={AuthCTAButtonVariants.APPLE} />
          <AuthCTAButton text="Continue with Email" onPress={signUpHandler} variant={AuthCTAButtonVariants.EMAIL} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
