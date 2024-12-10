import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

import * as ROUTES from "@constants/routes";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Current route

  console.log("navigationRef",navigationRef.current?.getCurrentRoute)
  const currentRouteName = state.routes[state.index].name;

  // Routes to hide the tab bar
  const hideTabBarRoutes = [ROUTES.ACCOUNT_NOTIFICATION, ROUTES.MAIN_COLLEGE_DETAILS];
  const isTabBarVisible = !hideTabBarRoutes.includes(currentRouteName)

  console.log("currentRouteName", currentRouteName);
  // Hide the tab bar for specific routes
  if (!isTabBarVisible) return null;

  return (
    <View style={styles.tabBar}>
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
    </View>
  );
};

// Styles for the custom tab bar
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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
