import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { acceptNotification, getUserNotications, rejectNotification } from "@helper/notification-helper";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";

import Header from "@components/header";
import Divider from "@components/ui/divider";
import Typography from "@components/ui/typography";
import NotificationItem from "@components/notification/notification-item";

import * as NOTIFICATION from "@constants/notification-status";
import * as FONTS from "@constants/font";
import * as COLORS from "@constants/colors";

import { horizontalSpacing, verticalSpacing } from "../../../styles/global-paddings";
import { SafeAreaView } from "react-native-safe-area-context";

export interface INotification {
  _id: string;
  type: number;
  data: {
    status: number;
    requestId: string;
  };
}

const NotificationScreen = () => {
  const [error, setError] = useState<string>("");
  const [notifications, setNotifications] = useState<INotification[] | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading());
        const { success, error, data } = await getUserNotications();

        if (error && error.type === 1) {
          const { message } = error;
          setError(message);
          dispatch(stopLoading());
          return;
        }
        if (success && data) {
          console.log("data", data);
          setNotifications(data.notifications);
          dispatch(stopLoading());
        }
      } catch (error) {
        dispatch(stopLoading());
        console.log("Something went wrong!");
      }
    })();
  }, []);

  const connectionRequestAcceptHandler = async (notification: INotification) => {
    dispatch(startLoading());
    const requestParams = {
      requestId: notification.data.requestId,
      notificationId: notification._id,
    };
    const { success, error, data } = await acceptNotification(requestParams);
    if (error) {
      dispatch(stopLoading());
      return;
    }
    if (success && data) {
      const { notification: updatedNotification } = data as { notification: INotification };
      updateNotification(updatedNotification);
      dispatch(stopLoading());
    }
  };
  const connectionRequestRejectHandler = async (notification: INotification) => {
    dispatch(startLoading());
    const requestParams = {
      requestId: notification.data.requestId,
      notificationId: notification._id,
    };
    const { success, error, data } = await rejectNotification(requestParams);
    if (error) {
      // Show toast
      dispatch(stopLoading());
      return;
    }
    if (success && data) {
      const { notification: updatedNotification } = data as { notification: INotification };
      updateNotification(updatedNotification);
      dispatch(stopLoading());
    }
  };

  const updateNotification = (updatedNotification: INotification) => {
    setNotifications(prevNotifications =>
      prevNotifications ? prevNotifications.map(n => (n._id === updatedNotification._id ? updatedNotification : n)) : null,
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <Header />
      {error && <Text>{error}</Text>}
      {notifications && notifications.length && (
        <FlatList
          data={notifications}
          scrollEventThrottle={1000 / 60}
          keyExtractor={item => item._id}
          ListHeaderComponent={
            <Typography variant="h3" fontFamily={FONTS.POPPINS_SEMIBOLD} style={{ marginBottom: verticalSpacing, marginLeft: horizontalSpacing }}>
              Notifications
            </Typography>
          }
          ItemSeparatorComponent={Divider}
          renderItem={({ item: notification }: { item: INotification }) => {
            const {
              data: { status },
            } = notification;

            // Create Util for selecting color
            let statusColor;
            if (status === NOTIFICATION.STATUS_PENDING) {
              statusColor = "pink";
            } else if (status === NOTIFICATION.STATUS_ACCEPTED) {
              statusColor = "darkgray";
            } else {
              statusColor = "lightgray";
            }
            return (
              <NotificationItem
                type={notification.type}
                status={status}
                statusColor={statusColor}
                notification={notification}
                onAccept={() => connectionRequestAcceptHandler(notification)}
                onReject={() => connectionRequestRejectHandler(notification)}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
