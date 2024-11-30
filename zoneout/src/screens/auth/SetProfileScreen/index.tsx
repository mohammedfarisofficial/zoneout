// src/screens/auth/SetProfileScreen.tsx
import { View } from "react-native";
import Typography from "@components/ui/typography";
import Button from "@components/ui/button";
import { useAuth } from "src/context/AuthContext";
import * as ROUTES from "@constants/routes";
import { appStorage } from "@services/mmkv-storage";
import { setLogged } from "@store/auth/reducer";
import { useAppDispatch } from "@store/index";

const SetProfileScreen = ({ navigation }: any) => {
  // const { setIsLogged } = useAuth();

  const dispatch = useAppDispatch()

  const loginHandler = async () => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.AUTH_WELCOME }],
      });
      appStorage.setItem("isLogged", "true");
      // setIsLogged(true);
      dispatch(setLogged({}));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <View>
      <Typography>SignUp Screen</Typography>
      <Button variant="secondary" onPress={() => {}} text="Set Profile" />
      <Button variant="secondary" onPress={loginHandler} text="Skip" />
    </View>
  );
};

export default SetProfileScreen;
