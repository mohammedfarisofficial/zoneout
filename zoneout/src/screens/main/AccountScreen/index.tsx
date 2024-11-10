import Button from '@components/ui/button'
import { View, Text } from 'react-native'

import * as ROUTES from '@constants/routes';

const AccountScreen = ({navigation}:any) => {
  const navigationHandler = () => {
    navigation.navigate("account", {screen: "account-notification"});
  }
  return (
    <View>
      <Text>Account screeen</Text>
      <Button onPress={navigationHandler} text='Notification'/>
    </View>
  )
}

export default AccountScreen