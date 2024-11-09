import {useCallback, useMemo, useRef} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {styles} from './styles';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

import Typography from '@components/ui/Typography';
import Button from '@components/ui/Button';

const WelcomeScreen = ({navigation}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{fontFamily: 'Poppins-Thin'}}>WelcomeScreen</Text> */}
      {/* <Typography>Welcome</Typography> */}
      <Button text="Get Started" onPress={openBottomSheet} />
      <BottomSheet
        backgroundStyle={styles.sheetContainer}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={-1}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Button text="SignUp with google" variant='secondary' onPress={() => {navigation.navigate("map")}} />
          <Button text="SignUp with apple" onPress={() => {}} />
          <Button text="SignUp with email" onPress={() => {}} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
