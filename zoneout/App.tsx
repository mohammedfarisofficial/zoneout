// src/App.tsx
import { Provider, useSelector } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import { PortalProvider } from "@gorhom/portal";

import AuthStackNavigator from "@navigation/AuthStackNavigator";
import MainBottomTabNavigator from "@navigation/main/MainBottomTabNavigator";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { RootState, store } from "@store/index";
import { useEffect } from "react";
import { appStorage } from "@services/mmkv-storage";
import { setLogged } from "@store/auth/reducer";
import { handleLogout } from "@store/auth/action";
import { getUserDetails } from "@helper/zoneout-api";
import { navigationRef } from "@components/custom-tabbar";

import Loader from "@components/ui/loader";

LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered."]);

GoogleSignin.configure({
  webClientId: "575062202165-mthumuns4728l6b8ffvq045j2v3tm6fm.apps.googleusercontent.com",
  iosClientId: "575062202165-g7c7aj1mvn5l34fnn7qf95v6mda89ru4.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
});

const AppContent = () => {
  const { isLogged } = useSelector((state: RootState) => state.auth);

  // Fetch User Details
  useEffect(() => {
    (async () => {
      const loggedStatus = appStorage.getItem("isLogged");
      if (loggedStatus) {
        const { error, success, data } = await getUserDetails();
        if (error) {
          handleLogout();
          return;
        }
        if (success && data) {
          console.log("User Details :", data);
          const { user, user_campus } = data;
          store.dispatch(setLogged({ user, user_campus }));
        }
      } else {
        handleLogout();
      }
    })();
  }, []);
  return isLogged ? <MainBottomTabNavigator /> : <AuthStackNavigator />;
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PortalProvider>
        <NavigationContainer ref={navigationRef}>
          <Loader />
          <AppContent />
        </NavigationContainer>
      </PortalProvider>
    </Provider>
  </GestureHandlerRootView>
);

export default App;
