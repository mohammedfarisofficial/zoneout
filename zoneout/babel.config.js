module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        blocklist: null,
        allowlist: null,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@components': './src/components',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
