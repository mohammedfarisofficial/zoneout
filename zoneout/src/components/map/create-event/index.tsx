import { Platform, View } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Slider } from "@miblanchard/react-native-slider";
import { styles } from "./styles";

import Button from "@components/ui/button";

import * as COLORS from "@constants/colors";
import CreateEventCTABtn from "@components/buttons/create-event-cta-btn";
import { globalStyles } from "@styles/global-styles";
import { normalizeHeight, normalizeWidth } from "@utils/scaling";

interface Props {
  radius: number;
  onChange: (value: any) => void;
  onClear: () => void;
  onCreate: () => void;
  onChangeEnd: () => void;
}

const CreateEvent = ({ radius, onChange, onClear, onCreate, onChangeEnd }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[globalStyles.row, { justifyContent: "flex-end", marginBottom: normalizeHeight(5), gap: normalizeWidth(5) }]}>
        <CreateEventCTABtn text="Clear" onAction={onClear} />
        <CreateEventCTABtn text="Create" onAction={onCreate} variant="primary" />
      </View>
      <BlurView
        style={styles.sliderContainer}
        blurType={Platform.OS === "ios" ? "ultraThinMaterialLight" : "light"}
        blurAmount={10}
        overlayColor={COLORS.GRAY_200}
        reducedTransparencyFallbackColor={COLORS.GRAY_200}>
        <Slider
          minimumValue={10}
          maximumValue={100}
          value={radius}
          onValueChange={onChange}
          animationType="timing"
          containerStyle={{ width: "100%" }}
          thumbStyle={{ backgroundColor: COLORS.WHITE, width: 30, height: 30, borderRadius: 50 }}
          trackStyle={{ height: 28, borderRadius: 50 }}
          minimumTrackStyle={{ backgroundColor: COLORS.GRAY_800 }}
          maximumTrackStyle={{ backgroundColor: COLORS.GRAY_300 }}
        />
      </BlurView>

      {/* <Button onPress={onCreate} text="Create" /> */}
    </View>
  );
};

export default CreateEvent;
