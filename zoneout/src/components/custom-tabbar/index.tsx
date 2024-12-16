import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";


import * as ROUTES from "@constants/routes";
import AppContext from "@navigation/AppContext";

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Helper function to get the nested route name
  const getNestedRouteName = (route: any): string => {
    if (!route.state) return route.name; // No nested state, return the route name
    const nestedRoute = route.state.routes[route.state.index];
    return getNestedRouteName(nestedRoute); // Recursively get nested route
  };

  // Current route name (including nested)
  const currentRouteName = (AppContext.navigationRef?.getCurrentRoute()?.name as any);

  // Routes to hide the tab bar
  const hideTabBarRoutes = [ROUTES.ACCOUNT_NOTIFICATION, ROUTES.MAIN_NOTIFICATION];
  const isTabBarVisible = !hideTabBarRoutes.includes(currentRouteName);

  console.log("Current Route Name:", currentRouteName);
  console.log("Is Tab Bar Visible:", isTabBarVisible);
  


  // console.log("navigationRef",)
  

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
    height: 65,
    backgroundColor: "lightgray",
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
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
