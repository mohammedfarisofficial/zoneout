import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { acceptNotification, getUserNotications, rejectNotification } from "@helper/notification-helper";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";

import Header from "@components/header";

import * as NOTIFICATION_STATUS from "@constants/notification-status";

interface INotification {
  _id: string;
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
    <View style={{ paddingTop: 100 }}>
      <Header />
      {error && <Text>{error}</Text>}
      {notifications && notifications.length && (
        <FlatList
          data={[...notifications, ...notifications, ...notifications]}
          scrollEventThrottle={1000 / 60}
          keyExtractor={item => item._id}
          renderItem={({ item: notification }: { item: INotification }) => {
            const {
              data: { status },
            } = notification;

            let statusColor;
            if (status === NOTIFICATION_STATUS.REJECTED) {
              statusColor = "pink";
            } else if (status === NOTIFICATION_STATUS.ACCEPTED) {
              statusColor = "darkgray";
            } else {
              statusColor = "lightgray";
            }
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
                {status === NOTIFICATION_STATUS.PENDING && (
                  <>
                    <Button onPress={() => connectionRequestAcceptHandler(notification)} title="Accept" />
                    <Button onPress={() => connectionRequestRejectHandler(notification)} title="Reject" />
                  </>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
