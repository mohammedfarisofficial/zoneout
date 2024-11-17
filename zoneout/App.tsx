// src/App.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, LogBox } from 'react-native';

import AuthStackNavigator from 'src/navigation/AuthStackNavigator';
import MainBottomTabNavigator from 'src/navigation/main/MainBottomTabNavigator';
import { AuthProvider, useAuth } from 'src/context/AuthContext';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

GoogleSignin.configure({
  webClientId: '575062202165-mthumuns4728l6b8ffvq045j2v3tm6fm.apps.googleusercontent.com',
  iosClientId: "575062202165-g7c7aj1mvn5l34fnn7qf95v6mda89ru4.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
});

const AppContent = () => {
  const { isLogged } = useAuth();

  // Show loading indicator while checking login state
  if (isLogged === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isLogged ? <MainBottomTabNavigator /> : <AuthStackNavigator />;
};

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  </GestureHandlerRootView>
);

export default App;
