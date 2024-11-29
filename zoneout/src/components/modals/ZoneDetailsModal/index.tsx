import React, { useMemo, forwardRef } from "react";
import { styles } from "./styles";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Button from "@components/ui/button";
import Typography from "@components/ui/typography";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  onChange: (index: number) => void;
  onClose: () => void;
  isMember: boolean;
}

const ZoneDetailsModal = forwardRef<BottomSheet, Props>(({ onChange, onClose, isMember }, ref) => {
  const memeberSnapPoints = useMemo(() => ["100%", "50%"], []);
  const nonMemberSnapPoints = useMemo(() => ["30%"], []);

  return (
    <BottomSheet
      backgroundStyle={styles.sheetContainer}
      enablePanDownToClose
      onClose={onClose}
      snapPoints={isMember ? memeberSnapPoints : nonMemberSnapPoints}
      ref={ref}
      index={-1}
      handleIndicatorStyle={{ display: "none" }}
      onChange={onChange}>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomSheetView style={styles.contentContainer}>
          {isMember ? (
            <>
              <Typography>Party Zone ( Private )</Typography>
              <Button
                variant="secondary"
                onPress={() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.close();
                  }
                }}
                text="Continue"
              />
            </>
          ) : (
            <>
              <Typography>Party Zone ( Private )</Typography>
              <Button
                variant="secondary"
                onPress={() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.close();
                  }
                }}
                text="Request to Join"
              />
            </>
          )}
        </BottomSheetView>
      </SafeAreaView>
    </BottomSheet>
  );
});

ZoneDetailsModal.displayName = "ZoneDetailsModal";

export default ZoneDetailsModal;
