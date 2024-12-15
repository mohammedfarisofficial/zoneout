import Button from "@components/ui/button";
import { BlurView } from "@react-native-community/blur";
import { normalizeHeight } from "@utils/scaling";
import { View, Text, StyleSheet, Platform } from "react-native";

import * as COLORS from "@constants/colors";

interface Props {
  text: string;
  variant?: "primary" | "blurred";
  onAction?: () => void;
}

const CreateEventCTABtn = ({ text, variant = "blurred", onAction = () => {} }: Props) => {
  return (
    <BlurView
      blurType={Platform.OS === "ios" ? (variant === "primary" ? "thickMaterial" : "ultraThinMaterialLight") : "light"}
      blurAmount={10}
      overlayColor={COLORS.GRAY_200}
      reducedTransparencyFallbackColor={COLORS.GRAY_200}
      style={[styles.container, containerVariants[variant]]}>
      <Button onPress={onAction} containerStyle={styles.button} textStyle={[{ color: COLORS.BLACK }, textVariants[variant]]} text={text} />
      {/* <Text>hi</Text> */}
    </BlurView>
  );
};

export default CreateEventCTABtn;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: normalizeHeight(60),
    height: normalizeHeight(35),
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    paddingVertical: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

const containerVariants = StyleSheet.create({
  blurred: {},
  primary: {
    backgroundColor: COLORS.BLACK,
  },
});

const textVariants = StyleSheet.create({
  blurred: {},
  primary: {
    color: COLORS.WHITE,
  },
});
