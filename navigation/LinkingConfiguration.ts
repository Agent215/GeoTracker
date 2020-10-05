import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Feed: {
            screens: {
              EventFeedScreen: 'feed',
            },
          },
          Map: {
            screens: {
              MapScreen: 'map',
            },
          },
          Settings: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
