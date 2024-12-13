import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import { getCampusUsers } from "@helper/campus-helper";
import { useAppDispatch } from "@store/index";
import { startLoading, stopLoading } from "@store/ui/reducer";

import Header from "@components/header";
import { sendConnectionRequest } from "@helper/connection-helper";

interface CampusUser {
  _id: string;
  campus: string;
  user: {
    _id: string;
    email: string;
  };
}

const CampusDetailsScreen = () => {
  const [error, setError] = useState<string>("");
  const [campusUsers, setCampusUsers] = useState<CampusUser[] | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(startLoading());
        const { success, error, data } = await getCampusUsers();

        if (error && error.type === 1) {
          const { message } = error;
          setError(message);
          dispatch(stopLoading());
          return;
        }
        if (success && data) {
          setCampusUsers(data.campus_users);
          dispatch(stopLoading());
        }
      } catch (error) {
        dispatch(stopLoading());
        console.log("Something went wrong!");
      }
    })();
  }, []);

  const connectUserHandler = async (user: CampusUser) => {
    const {
      user: { _id: userId },
    } = user;
    console.log("Send Connection Request to : ", userId);
    dispatch(startLoading());
    const { success, error, data } = await sendConnectionRequest(userId);

    if (error) {
      console.log(error);
      dispatch(stopLoading());
      return;
    }
    if (success && data) {
      console.log("Data", data);
      dispatch(stopLoading());
    }
  };

  return (
    <View style={{ paddingTop: 100 }}>
      <Header />
      {error && <Text>{error}</Text>}
      {campusUsers && campusUsers.length && (
        <FlatList
          data={campusUsers}
          renderItem={({ item: user }: { item: CampusUser }) => (
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
              <Text>{user.user.email}</Text>
              <Button title="Connect" onPress={() => connectUserHandler(user)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CampusDetailsScreen;
