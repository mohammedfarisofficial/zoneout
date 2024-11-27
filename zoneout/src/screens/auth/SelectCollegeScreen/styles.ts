import { ScaledSheet } from "react-native-size-matters";

import * as COLORS from "@constants/colors";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  mapContainer: {
    width: "90%",
    height: "200@vs",
    backgroundColor: "red",
  },
  mapInnerContainer: {
    flex: 1,
  },
});
