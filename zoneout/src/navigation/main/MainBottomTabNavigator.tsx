import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your stack navigators
import AccountStackNavigator from "@navigation/main/AccountStackNavigator";
import MainStackNavigator from "@navigation/main/MainStackNavigator";
import ChatStackNavigator from "@navigation/chat/ChatStackNavigator";
import CustomTabBar from "@components/custom-tabbar";

import * as ROUTES from "@constants/routes";

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      // tabBar={(props) => <MyTabBar {..props}/>}
      tabBar={(props)=><CustomTabBar {...props}/>}
    >
      <Tab.Screen name={ROUTES.MAIN} component={MainStackNavigator} />
      <Tab.Screen name={ROUTES.CHAT} component={ChatStackNavigator} />
      <Tab.Screen name={ROUTES.ACCOUNT} component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
