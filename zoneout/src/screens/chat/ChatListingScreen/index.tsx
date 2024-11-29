import { View, Text } from "react-native";

import Button from "@components/ui/button";

import * as ROUTES from "@constants/routes";

const ChatListingScreen = ({ navigation }: any) => {
  const gotoChat = () => {
    navigation.navigate(ROUTES.CHAT, { screen: ROUTES.USER_CHAT });
  };
  return (
    <View>
      <Text>ChatListingScreen</Text>
      <Button onPress={gotoChat} text="Goto Chat" />
      <Button onPress={gotoChat} text="Goto Chat" />
      <Button onPress={gotoChat} text="Goto Chat" />
      <Button onPress={gotoChat} text="Goto Chat" />
    </View>
  );
};

export default ChatListingScreen;
