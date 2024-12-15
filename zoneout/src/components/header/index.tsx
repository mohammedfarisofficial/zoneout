import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

import BubbleBackBtn from "@components/ui/bubble-back-btn";
import BubbleCloseBtn from "@components/ui/bubble-close-btn";
import Typography from "@components/ui/typography";

import * as FONTS from "@constants/font";

interface Props {
  headerText?: string;
  closeEnabled?: boolean;
  onClose?: () => void;
}

const Header = ({ closeEnabled = false, onClose = () => {}, headerText }: Props) => {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View style={styles.container}>
        {closeEnabled ? <BubbleCloseBtn onClose={onClose} /> : <BubbleBackBtn />}
        {headerText && (
          <Typography fontFamily={FONTS.POPPINS_MEDIUM} variant="h5" style={{ position: "absolute", left: 0, right: 0, textAlign: "center" }}>
            {headerText}
          </Typography>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
