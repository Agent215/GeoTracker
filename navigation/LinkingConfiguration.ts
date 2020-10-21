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
          Filters: {
            Screens: {
              FilterScreen: 'filters'
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