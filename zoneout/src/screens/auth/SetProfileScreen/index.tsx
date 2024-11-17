// src/screens/auth/SetProfileScreen.tsx
import { View } from 'react-native';
import Typography from '@components/ui/typography';
import Button from '@components/ui/button';
import { useAuth } from 'src/context/AuthContext';
import * as ROUTES from '@constants/routes';
import { appStorage } from '@services/mmkv-storage';

const SetProfileScreen = ({ navigation }: any) => {
  const { setIsLogged } = useAuth();

  const loginHandler = async () => {
    try {
      appStorage.setItem('isLogged', 'true');
      setIsLogged(true);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <Button variant="secondary" onPress={loginHandler} text="Set Profile" />
    </View>
  );
};

export default SetProfileScreen;
