import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from '@screens/main/MapScreen';

const Tab = createBottomTabNavigator()

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="main-map" component={MapScreen} />
    </Tab.Navigator>
  )
}

export default MainBottomTabNavigator