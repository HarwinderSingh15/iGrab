import React from 'react';
import Home from '../screens/Home';
import Preview from '../screens/Preview';
import ReelsDownloader from '../screens/ReelDownloader';

import { NAVIGATION } from '../constants/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
