import { RootState } from "@store/index";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useSelector } from "react-redux";

const Loader = () => {
  const { loading } = useSelector((state: RootState) => state.ui);

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
