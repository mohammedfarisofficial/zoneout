import { useEffect, useState } from "react";
import { Animated, View, Image, Text } from "react-native";
import { styles } from "./styles.ts";
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

import { TEST_IMAGE_URL } from "@components/map/user-marker";
import { getConnectionDetails } from "@helper/zoneout-api";

import Typography from "@components/ui/typography/index.tsx";
import ProBadge from "@components/ui/pro-badge/index.tsx";

import * as FONTS from "@constants/font.ts";
import Header from "@components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import BubbleBackBtn from "@components/ui/bubble-back-btn/index.tsx";
import { globalStyles } from "src/styles/global-styles.ts";

export const TEST_IMAGE_URL_TWO = "https://i1.sndcdn.com/artworks-Xy4J91HgcLHqWYsq-FhfmQw-t500x500.jpg";

type ConnectionDetails = {
  email: string;
  connections: [string];
};

const UserDetailsScreen = ({ route }: any) => {
  const { userId } = route.params;
  const [userDetails, setUserDetails] = useState<ConnectionDetails | null>(null);

  useEffect(() => {
    (async () => {
      const { error, success, data } = await getConnectionDetails(userId);

      if (error) {
        console.log("Error getConnectionDetails", error);
        return;
      }
      if (success && data && data?.connection) {
        const { connection } = data;
        setUserDetails(connection);
      }
    })();
  }, [userId]);

  const [scrollY] = useState(new Animated.Value(0));

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { opacity: imageOpacity }]}>
        <Image
          style={styles.image}
          source={{
            uri: TEST_IMAGE_URL,
          }}
        />
        <LinearGradient colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.6)"]} style={styles.gradient} />
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}>
        <View style={styles.contentContainer}>
          <View style={styles.userProfileContent}>
            <View style={styles.profileContainer}>
              <Image
                style={globalStyles.profileImage}
                source={{
                  uri: TEST_IMAGE_URL_TWO,
                }}
              />
              <View style={styles.detailsContainer}>
                <Typography variant="h5" fontFamily={FONTS.POPPINS_BOLD}>
                  Mohammed Faris
                </Typography>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.usernameContainer}>
                    <Typography fontFamily={FONTS.POPPINS_REGULAR} fontSize={RFValue(9)}>
                      @_thefm
                    </Typography>
                  </View>
                  <ProBadge />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.text}>User Details</Text>
          <Text style={styles.text}>Email: {userDetails?.email || "Loading..."}</Text>
          <Text style={styles.text}>Connections: {userDetails?.connections.length || 0}</Text>

          {/* Large Dummy Content */}
          {[...Array(50)].map((_, index) => (
            <Text key={index} style={styles.dummyText}>
              Dummy Content Line {index + 1}: This is a placeholder for testing scrolling behavior. Add more detailed information as needed to fill
              the screen.
            </Text>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default UserDetailsScreen;
