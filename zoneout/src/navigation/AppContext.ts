import { createNavigationContainerRef, NavigationContainerRef } from "@react-navigation/native";

const AppContext = {
  navigationRef: null as NavigationContainerRef<any> | null,
};

export const forceRedirectToAuth = () => {
  AppContext.navigationRef?.reset({
    index: 0,
    routes: [{ name: "sign-up-enter-email" }],
  });
};

export default AppContext;
