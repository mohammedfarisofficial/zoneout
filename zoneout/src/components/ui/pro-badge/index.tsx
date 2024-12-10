import { View } from "react-native";
import { styles } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

import Typography from "@components/ui/typography";

import * as FONTS from "@constants/font.ts";
import * as COLORS from "@constants/colors";

const ProBadge = () => {
  return (
    <View style={styles.badgeContainer}>
      <Typography style={{ color: COLORS.WHITE }} fontFamily={FONTS.POPPINS_BOLD} fontSize={RFValue(9)}>
        Pro
      </Typography>
    </View>
  );
};

export default ProBadge;
