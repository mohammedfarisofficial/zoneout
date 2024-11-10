import {useCallback, useMemo, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {styles} from './styles';

import Typography from '@components/ui/typography';
import Button from '@components/ui/button';

import * as FONTS from '@constants/font';
import * as ROUTES from '@constants/routes';

const WelcomeScreen = ({navigation}: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const signUpHandler = () => {
    navigation.navigate(ROUTES.SIGN_UP, {screen: ROUTES.SIGN_UP_EMAIL});
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
            Create an account to continue
          </Typography>
          <Typography variant="h8" fontFamily={FONTS.POPPINS_REGULAR}>
            By continuing, you agree to our Your agreement and
          </Typography>
          <Typography
            variant="h8"
            style={styles.sheetHeaderText}
            fontFamily={FONTS.POPPINS_REGULAR}>
            acknowledge that you understand the Privacy Policy
          </Typography>
          <Button
            text="Continue with Google"
            onPress={() => {
              navigation.navigate('map');
            }}
          />
          <Button text="Continue with Apple" onPress={() => {}} />
          <Button
            text="Continue with Email"
            variant="secondary"
            onPress={signUpHandler}
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
