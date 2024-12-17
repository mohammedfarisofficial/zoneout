import React, { createContext, useContext, useRef } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

// Define the context type
type TabBarVisibilityContextType = {
  tabBarVisibility: SharedValue<boolean>;
  showTabBar: () => void;
  hideTabBar: () => void;
};

// Create the context
const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | null>(null);

// Provider Component
export const TabBarVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tabBarVisibility = useSharedValue(true);

  const showTabBar = () => {
    tabBarVisibility.value = true;
  };

  const hideTabBar = () => {
    tabBarVisibility.value = false;
  };

  return (
    <TabBarVisibilityContext.Provider value={{ tabBarVisibility, showTabBar, hideTabBar }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

// Custom Hook to use the context
export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error("useTabBarVisibility must be used within a TabBarVisibilityProvider");
  }
  return context;
};
