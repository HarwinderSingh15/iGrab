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
import SpInAppUpdates, {
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { Platform } from 'react-native';

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

  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(
      false, // isDebug
    );
    inAppUpdates.checkNeedsUpdate().then(result => {
      if (result.shouldUpdate) {
        let updateOptions: StartUpdateOptions = {};
        if (Platform.OS === 'android') {
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions);
      }
    });
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
