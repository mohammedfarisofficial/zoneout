import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapScreen from './src/screens/main/MapScreen'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapScreen/>
    </GestureHandlerRootView>
  )
}

export default App