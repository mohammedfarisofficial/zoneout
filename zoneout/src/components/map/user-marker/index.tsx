import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FastImage from "react-native-fast-image";

interface Props {
  index?: number;
  text?: string;
  onPress: () => void;
}

export const TEST_IMAGE_URL = "https://i.pinimg.com/736x/23/a6/14/23a6148ca1951aff9c0a7b1716faf56c.jpg";

const UserMarker = ({ index, onPress, text }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: TEST_IMAGE_URL }} resizeMode={FastImage.resizeMode.cover} />
      </View>
      <Text>{text ? text : `User ${index}`}</Text>
    </TouchableOpacity>
  );
};

export default UserMarker;
