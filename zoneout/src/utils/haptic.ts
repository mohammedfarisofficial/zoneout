import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const haptic = (type = 1): any => {
  switch (type) {
    case 1:
      ReactNativeHapticFeedback.trigger("impactMedium", options);
      break;
    case 2:
      ReactNativeHapticFeedback.trigger("soft", options);
      break;
    default:
      break;
  }
};
