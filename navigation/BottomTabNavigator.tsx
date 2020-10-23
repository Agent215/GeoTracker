import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import EventFeedScreen from '../screens/EventFeedScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen'
import { BottomTabParamList, EventScreenParamList, MapScreenParamList, SettingsScreenParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Feed"
        component={EventFeedNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-paper" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={MapScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreenNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-contact" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const EventFeedStack = createStackNavigator<EventScreenParamList>();

 function EventFeedNavigator() {
  return (
    <EventFeedStack.Navigator>
      <EventFeedStack.Screen
        name="EventFeedScreen"
        component={EventFeedScreen}
        options={{ headerTitle: 'Event Screen Title' }}
      />
    </EventFeedStack.Navigator>
  );
}

const MapScreenStack = createStackNavigator<MapScreenParamList>();

function MapScreenNavigator() {
  return (
    <MapScreenStack.Navigator>
      <MapScreenStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Map Screen Title' }}
      />
    </MapScreenStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsScreenParamList>();

 function SettingsScreenNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings Screen Title' }}
      />
    </SettingsStack.Navigator>
  );
}