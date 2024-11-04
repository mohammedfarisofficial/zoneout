import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapScreen from './src/screens/main/MapScreen'
import WelcomeScreen from './src/screens/auth/WelcomeScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WelcomeScreen/>
    </GestureHandlerRootView>
  )
}

export default App