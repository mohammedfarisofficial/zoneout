import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@components/header";
import Button from "@components/ui/button";

import * as COLORS from "@constants/colors";
import InputBox from "@components/ui/input-box";
import { useState } from "react";

const CreateEventScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
      <Header onClose={() => navigation.goBack()} headerText="Add Event details" />
      <InputBox text={email} setText={setEmail} label="Email" />
      <InputBox text={email} setText={setEmail} label="Email" />
      <Button onPress={() => navigation.goBack()} text="Create Event" />
    </SafeAreaView>
  );
};

export default CreateEventScreen;
