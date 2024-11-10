// src/App.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import AuthStackNavigator from 'src/navigation/AuthStackNavigator';
import MainBottomTabNavigator from 'src/navigation/main/MainBottomTabNavigator';
import { AuthProvider, useAuth } from 'src/context/AuthContext';

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
