import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import AppNavigator from './navigators/AppNavigator';
import { navigationRef } from './navigators/navigationRef';
import {
  createChannelId,
  getNotificationsPermissions,
} from './utils/notificationsByNotifee';
import Splash from './screens/Splash';

function App() {
  const [hideSplash, setHideSplash] = useState(false);
  useEffect(() => {
    createChannelId();
    getNotificationsPermissions();

    const clearId = setTimeout(() => {
      setHideSplash(true);
    }, 1000);

    return () => clearTimeout(clearId);
  }, []);

  return (
    <RootSiblingParent>
      {!hideSplash ? (
        <Splash />
      ) : (
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      )}
    </RootSiblingParent>
  );
}

export default App;
