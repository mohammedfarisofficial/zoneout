import { View, Text, Button } from "react-native";

import * as NOTIFICATION from "@constants/notification-status";

import { INotification } from "@screens/main/NotificationScreen";

interface Props {
  statusColor: string;
  status: number;
  type: number;
  notification: INotification;
  onAccept: (notification: INotification) => void;
  onReject: (notification: INotification) => void;
}

const NotificationItem = ({ statusColor, onAccept, onReject, status, notification }: Props) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: statusColor,
        paddingHorizontal: 20,
        alignItems: "flex-end",
        marginVertical: 5,
      }}>
      <Text>{JSON.stringify(notification)}</Text>
      {status === NOTIFICATION.STATUS_PENDING && (
        <>
          <Button onPress={() => onAccept(notification)} title="Accept" />
          <Button onPress={() => onReject(notification)} title="Reject" />
        </>
      )}
    </View>
  );
};

export default NotificationItem;
