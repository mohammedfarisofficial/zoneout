import { useCallback, useMemo, useRef } from "react";
import { Alert, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin";
import axios from "axios";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import AuthCTAButton, { AuthCTAButtonVariants } from "@components/ui/auth/auth-button";
import Typography from "@components/ui/typography";
import Button from "@components/ui/button";

import * as FONTS from "@constants/font";
import * as ROUTES from "@constants/routes";

import { signInWithGoogle as signInWithGoogleHelper } from "@helper/zoneout-api";
import { ACCOUNT_CREATED, NO_ACCOUNT, SELECT_DOB_COMPLETED, VERIFIED_ACCOUNT } from "@constants/account-status";
import { appStorage, tokenStorage } from "@services/mmkv-storage";
// import { useAuth } from "src/context/AuthContext";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";
import { setLogged } from "@store/auth/reducer";

const WelcomeScreen = ({ navigation }: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  // const { setIsLogged } = useAuth();
  const dispatch = useAppDispatch();

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const signUpHandler = () => {
    navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_EMAIL });
  };
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const formData = {
          provider: "google",
          id_token: response.data.idToken,
        };
        dispatch(startLoading());
        const { error, success, data } = await signInWithGoogleHelper(formData);
        if (success && data) {
          console.log("Data : ", data);
          if (data.account_status === VERIFIED_ACCOUNT) {
            if (data.user.account_progression === SELECT_DOB_COMPLETED || data.user.account_progression === ACCOUNT_CREATED) {
              // SignIn
              try {
                navigation.reset({
                  index: 0,
                  routes: [{ name: ROUTES.AUTH_WELCOME }],
                });
                const {
                  tokens: { access_token, refresh_token },
                  user,
                } = data;
                if (!access_token || !refresh_token) {
                  return;
                }
                tokenStorage.set("access_token", access_token);
                tokenStorage.set("refresh_token", refresh_token);

                appStorage.setItem("isLogged", "true");
                dispatch(setLogged({ user }));
              } catch (error) {
                console.error("Error during login:", error);
              }
            }
          } else if (data.account_status === NO_ACCOUNT) {
            navigation.navigate(ROUTES.SIGN_UP, { screen: ROUTES.SIGN_UP_SELECT_COLLEGE, params: { userId: data.user._id } });
          }
        }
      } else {
        console.log("sign in was cancelled by user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.error("API call failed:", error);
      }
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button text="Get Started" onPress={openBottomSheet} />
      <BottomSheet
        backgroundStyle={styles.sheetContainer}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={0}
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
          <AuthCTAButton text="Continue with Google" variant={AuthCTAButtonVariants.GOOGLE} onPress={signInWithGoogle} />
          <AuthCTAButton text="Continue with Apple" onPress={() => {}} variant={AuthCTAButtonVariants.APPLE} />
          <AuthCTAButton text="Continue with Email" onPress={signUpHandler} variant={AuthCTAButtonVariants.EMAIL} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
