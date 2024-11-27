import { useEffect, useRef, useState } from "react";
import { View, TextInput, Animated, Platform, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { moderateScale } from "react-native-size-matters";
import { BlurView } from "@react-native-community/blur";

import Typography from "@components/ui/typography";

import * as COLORS from "@constants/colors";

import ClearIconSVG from "@components/svg/clear-icon";

interface Props {
  label: string;
  enableClear?: boolean;
  text: string;
  setText: (text: string) => void;
}

const InputBox = ({ text, setText, label = "Email", enableClear = true }: Props) => {
  // const [text, setText] = useState<string>("");
  const labelAnimation = useRef(new Animated.Value(text ? 1 : 0)).current;

  const handleFocus = () => {
    // Label animation
    Animated.timing(labelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    // Label animation
    if (!text) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    top: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(15), moderateScale(3)],
    }),
    fontSize: labelAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  const clearHandler = () => {
    setText("");
  };

  return (
    <View style={[styles.container]}>
      <Typography style={[styles.label, labelStyle]}>{label}</Typography>
      <TextInput onFocus={handleFocus} onBlur={handleBlur} value={text} onChangeText={text => setText(text)} style={[styles.inputBox]} />
      <BlurView
        blurType={Platform.OS === "ios" ? "ultraThinMaterialLight" : "light"}
        blurAmount={10}
        overlayColor={COLORS.GRAY_200}
        reducedTransparencyFallbackColor={COLORS.GRAY_200}
        style={[styles.rightContainer]}>
        {text && enableClear && (
          <TouchableOpacity onPress={clearHandler}>
            <ClearIconSVG />
          </TouchableOpacity>
        )}
      </BlurView>
    </View>
  );
};

export default InputBox;
