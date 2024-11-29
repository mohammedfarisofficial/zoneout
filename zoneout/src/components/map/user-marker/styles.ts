import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

export const styles = ScaledSheet.create({
  container: {
    
  },
  innerContainer: {
    backgroundColor: "lightgray",
    width: "30@s",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 50,
  },
});
