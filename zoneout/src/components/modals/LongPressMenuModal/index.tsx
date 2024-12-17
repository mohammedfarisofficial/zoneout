import React, { forwardRef, useMemo } from "react";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import Button from "@components/ui/button";
import LongPressMenuItem from "@components/long-press-menu-item";
import Header from "@components/header";
import { View } from "react-native";

interface Props {
  selectedPoints: any;
  onChange?: (index:number) => void;
  setEventCoords: (selectedPoints: any) => void;
  onEventCreation?: () => void;
}

const LongPressMenuModal = forwardRef<BottomSheet, Props>(({ onChange,onEventCreation, setEventCoords, selectedPoints }, ref) => {
  const snapPoints = useMemo(() => ["25%"], []); 

  const handleCreateZone = () => {
    setEventCoords(selectedPoints);
    if (ref && "current" in ref && ref.current) {
      ref.current.close();
    }
  };

  const renderBackdrop = useMemo(
    () => (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />,
    [],
  );

  return (
    <BottomSheet
      backgroundStyle={styles.sheetContainer}
      enablePanDownToClose
      snapPoints={snapPoints}
      ref={ref}
      index={-1}
      onChange={onChange}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ display: "none" }}>
      <BottomSheetView style={styles.contentContainer}>
        {/* <Button onPress={handleCreateZone} text="Create your Zone" />
        <Button onPress={() => {}} text="Leave a Message" /> */}
        {/* <Button onPress={() => {}} text="Report" /> */}
        <View style={{ position: "absolute", backgroundColor: "red", width: "100%" }}>
          <Header closeEnabled headerText="Pick an option to add" />
        </View>
        <LongPressMenuItem onAction={onEventCreation} />
        <LongPressMenuItem />
        <LongPressMenuItem />
      </BottomSheetView>
    </BottomSheet>
  );
});

export default LongPressMenuModal;
