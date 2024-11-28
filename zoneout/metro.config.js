const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Add '.glb' to the list of asset extensions
defaultConfig.resolver.assetExts.push("glb");

// Merge the default config with additional custom settings
const config = mergeConfig(defaultConfig, {});

module.exports = wrapWithReanimatedMetroConfig(config);
