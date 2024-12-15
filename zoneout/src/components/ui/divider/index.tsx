import { View, StyleSheet } from 'react-native';
import { normalizeModerately } from '../../../utils/scaling';

import * as COLORS from "@constants/colors";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: normalizeModerately(1),
    backgroundColor: COLORS.GRAY_200,
    width: '100%',
  },
});

export default Divider;
