import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
  onPress: () => void;
  onLongPress?: () => void;
  id: string | number;
}

const ZoneGallery = ({ onPress, id, onLongPress }: Props) => {
  // Generate random transformations and memoize them to prevent regeneration on re-renders
  const cardTransforms = useMemo(() => {
    const generateRandomTransform = () => {
      const randomRotation = Math.random() * 20 - 10; // Random rotation between -10 and 10 degrees
      const randomTranslationX = Math.random() * 20 - 10; // Random horizontal translation
      const randomTranslationY = Math.random() * 20 - 10; // Random vertical translation
      return [{ rotate: `${randomRotation}deg` }, { translateX: randomTranslationX }, { translateY: randomTranslationY }];
    };

    // Generate transformations for all cards
    return [generateRandomTransform(), generateRandomTransform(), generateRandomTransform()];
  }, []); // Empty dependency array ensures this only runs once

  return (
    <TouchableOpacity onLongPress={onLongPress} activeOpacity={1} onPress={onPress} style={styles.container}>
      <View style={[styles.cardContainer, { backgroundColor: "gray", transform: cardTransforms[0] }]}></View>
      <View style={[styles.cardContainer, { backgroundColor: "lightgray", transform: cardTransforms[1] }]}></View>
      <View style={[styles.cardContainer, { backgroundColor: "darkgray", transform: cardTransforms[2] }]}></View>
    </TouchableOpacity>
  );
};

export default ZoneGallery;
