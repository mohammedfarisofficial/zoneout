import { useMemo, forwardRef } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import Button from "@components/ui/button";
import Typography from "@components/ui/typography";

import { TEST_IMAGE_URL } from "@components/map/user-marker";

import * as ROUTES from "@constants/routes";
import { Connection } from "@store/auth/reducer";

interface Props {
  onChange: (index: number) => void;
  onClose: () => void;
  onUserDetails: () => void;
  userData: Connection | null;
}

const UserDetailsModal = forwardRef<BottomSheet, Props>(({ onChange, onClose, onUserDetails, userData }, ref) => {
  const snapPoints = useMemo(() => ["30%"], []);

  return (
    <BottomSheet
      backgroundStyle={styles.sheetContainer}
      enablePanDownToClose
      onClose={onClose}
      snapPoints={snapPoints}
      ref={ref}
      index={-1}
      handleIndicatorStyle={{ display: "none" }}
      onChange={onChange}>
      <SafeAreaView style={{ flex: 1 }}>
        <BottomSheetView style={styles.contentContainer}>
          <Typography>User Profile</Typography>
          <Typography>Email : {userData?.email}</Typography>
          <Typography>ID : {userData?._id}</Typography>
          <View style={styles.innerContainer}>
            <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: TEST_IMAGE_URL }} resizeMode={FastImage.resizeMode.cover} />
          </View>
          <Button variant="secondary" onPress={onUserDetails} text="View Profile" />
        </BottomSheetView>
      </SafeAreaView>
    </BottomSheet>
  );
});

UserDetailsModal.displayName = "UserDetailsModal";

export default UserDetailsModal;
