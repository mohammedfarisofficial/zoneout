import { Image, TouchableOpacity, View } from "react-native";

import * as NOTIFICATION from "@constants/notification-status";
import * as COLORS from "@constants/colors";
import * as FONTS from "@constants/font";

import { INotification } from "@screens/main/NotificationScreen";
import { styles } from "./styles";
import { globalStyles } from "src/styles/global-styles";
import { TEST_IMAGE_URL } from "@components/map/user-marker";
import { horizontalSpacing } from "src/styles/global-paddings";
import { normalizeHeight } from "../../../utils/scaling";

import Typography from "@components/ui/typography";
import NotificationCTAButton from "@components/notification/notification-cta-button";
import { activeOpacity } from "../../../styles/properties";

interface Props {
  statusColor: string;
  status: number;
  type: number;
  notification: INotification;
  onAccept: () => void;
  onReject: () => void;
}

const NotificationItem = ({ type, statusColor, onAccept, onReject, status, notification }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        {
          backgroundColor: status === NOTIFICATION.STATUS_PENDING ? COLORS.GRAY_100 : COLORS.WHITE,
        },
      ]}>
      {/* Profile Container  */}
      <View style={styles.profileContainer}>
        <Image
          style={globalStyles.profileImage}
          source={{
            uri: TEST_IMAGE_URL,
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        {type === NOTIFICATION.TYPE_CONNECTION && (
          <>
            {status === NOTIFICATION.STATUS_PENDING && (
              <>
                <View style={[globalStyles.row]}>
                  <Typography fontFamily={FONTS.POPPINS_SEMIBOLD} style={{ color: COLORS.BLACK }}>
                    Mohammed Faris
                  </Typography>
                  <Typography style={{ color: COLORS.GRAY_800 }}> has sent you a</Typography>
                </View>
                <Typography style={{ color: COLORS.GRAY_800 }}>connection request</Typography>
                <Typography style={{ color: COLORS.GRAY_800 }} variant="h8">
                  4h ago
                </Typography>
                <View style={[globalStyles.row, { gap: horizontalSpacing * 0.4, marginTop: normalizeHeight(9) }]}>
                  <NotificationCTAButton text="Reject" onAction={onAccept} variant="outlined" />
                  <NotificationCTAButton text="Accept" onAction={onReject} />
                </View>
              </>
            )}
            {status === NOTIFICATION.STATUS_REJECTED && (
              <>
                <View style={[globalStyles.row]}>
                  <Typography style={{ color: COLORS.GRAY_800 }}>You rejected</Typography>
                  <Typography fontFamily={FONTS.POPPINS_SEMIBOLD} style={{ color: COLORS.BLACK, marginLeft: 4 }}>
                    Mohammed Faris's
                  </Typography>
                </View>
                <Typography style={{ color: COLORS.GRAY_800 }}>connection request</Typography>
                <Typography style={{ color: COLORS.GRAY_800 }} variant="h8">
                  4h ago
                </Typography>
              </>
            )}

            {status === NOTIFICATION.STATUS_ACCEPTED && (
              <>
                <Typography style={{ color: COLORS.GRAY_800 }}>
                  You accepted
                  <Typography fontFamily={FONTS.POPPINS_SEMIBOLD} style={{ color: COLORS.BLACK }}>
                    {" "}
                    Mohammed Faris's
                  </Typography>{" "}
                  connection request.
                </Typography>
                <Typography style={{ color: COLORS.GRAY_800 }} variant="h8">
                  4h ago
                </Typography>
              </>
            )}
          </>
        )}
      </View>
      {/* <Text style={{ color: COLORS.BLACK }}>{JSON.stringify(notification)}</Text>
      {status === NOTIFICATION.STATUS_PENDING && (
        <>
          <Button onPress={() => onAccept(notification)} title="Accept" />
          <Button onPress={() => onReject(notification)} title="Reject" />
        </>
      )} */}
    </TouchableOpacity>
  );
};

export default NotificationItem;
