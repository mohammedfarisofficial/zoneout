import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { gActiveOpacity } from "../../styles/properties";

interface Props {
  onAction?: () => void;
}

const LongPressMenuItem = ({ onAction }: Props) => {
  return (
    <TouchableOpacity onPress={onAction} style={styles.container} activeOpacity={gActiveOpacity}>
      <Text>Event</Text>
    </TouchableOpacity>
  );
};

export default LongPressMenuItem;
