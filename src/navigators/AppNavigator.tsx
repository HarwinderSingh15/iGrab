import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NAVIGATION } from '../constants/Navigation';

import Home from '../screens/Home';
import ReelsDownloader from '../screens/ReelDownloader';
import Preview from '../screens/Preview';

const Stack = createNativeStackNavigator();

const SCREENS = [
  {
    name: NAVIGATION.Home,
    comp: Home,
  },
  {
    name: NAVIGATION.ReelsDownloader,
    comp: ReelsDownloader,
  },
  {
    name: NAVIGATION.Preview,
    comp: Preview,
  },
];

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {SCREENS.map(({ name, comp }, idx) => (
        <Stack.Screen key={idx + name} name={name} component={comp} />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigator;
