import Header from "@components/header";
import { getUserNotications } from "@helper/notification-helper";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";

const NotificationScreen = () => {
  const [error, setError] = useState<string>("");
  const [notifications, setNotifications] = useState<any>(null);

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
          setNotifications(data.notifications);
          dispatch(stopLoading());
        }
      } catch (error) {
        dispatch(stopLoading());
        console.log("Something went wrong!");
      }
    })();
  }, []);

  return (
    <View style={{ paddingTop: 100 }}>
      <Header />
      {error && <Text>{error}</Text>}
      {notifications && notifications.length && (
        <FlatList
          data={notifications}
          renderItem={({ item: user }) => (
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                backgroundColor: "lightgray",
                flexDirection: "row",
                paddingHorizontal: 20,
                alignItems: "center",
                marginVertical: 5,
              }}>
              <Text>{JSON.stringify(notifications)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
