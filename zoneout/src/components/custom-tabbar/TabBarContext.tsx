import { createContext, useContext, useEffect, useState } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type TabBarVisibilityContextType = {
  tabBarVisibility: SharedValue<boolean>;
  showTabBar: () => void;
  hideTabBar: () => void;
};

const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | null>(null);

export const TabBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error("useTabBarVisibility must be used within a TabBarProvider");
  }
  return context;
};
