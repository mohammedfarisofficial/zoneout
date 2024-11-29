import { createStackNavigator } from "@react-navigation/stack";

import UserChatScreen from "@screens/chat/UserChatScreen";
import ChatListingScreen from "@screens/chat/ChatListingScreen";

const Stack = createStackNavigator();

import * as ROUTES from "@constants/routes";

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.CHAT_LISTING} component={ChatListingScreen} />
      <Stack.Screen name={ROUTES.USER_CHAT} component={UserChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
