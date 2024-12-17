import { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { useAnimatedStyle, withTiming, FadeInDown, FadeOutDown } from "react-native-reanimated";

import { useTabBarVisibility } from "./TabBarContext";
import AppContext from "@navigation/AppContext";

import * as ROUTES from "@constants/routes";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { tabBarVisibility } = useTabBarVisibility();

  const excludedRoutes = [ROUTES.ACCOUNT_NOTIFICATION, ROUTES.MAIN_NOTIFICATION, ROUTES.USER_CHAT];

  useEffect(() => {
    const currentRouteName = AppContext.navigationRef?.getCurrentRoute()?.name as string;
    const shouldHideTabBar = excludedRoutes.includes(currentRouteName);
    tabBarVisibility.value = !shouldHideTabBar;
  }, [navigation, state.index, tabBarVisibility, excludedRoutes]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(tabBarVisibility.value ? 0 : 100, { duration: 300 }) }],
    opacity: withTiming(tabBarVisibility.value ? 1 : 0, { duration: 300 }),
  }));

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutDown}
      style={styles.wrapper}
    >
      <Animated.View style={[styles.tabBar, animatedStyle]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabItem}>
              <Text style={[styles.label, isFocused && styles.focusedLabel]}>{label as string}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
  } as ViewStyle,
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 65,
    backgroundColor: "lightgray",
    borderRadius: 20,
  } as ViewStyle,
  tabItem: {
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  label: {
    fontSize: 14,
    color: "#888",
  } as TextStyle,
  focusedLabel: {
    color: "#000",
    fontWeight: "bold",
  } as TextStyle,
});

export default CustomTabBar;
