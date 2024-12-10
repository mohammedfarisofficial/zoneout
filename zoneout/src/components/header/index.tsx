import { View } from "react-native";
import { styles } from "./styles";
import { StatusBar } from "react-native";

import BubbleBackBtn from "@components/ui/bubble-back-btn";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <View style={styles.container}>
      <BubbleBackBtn />
    </View>
  );
};

export default Header;
