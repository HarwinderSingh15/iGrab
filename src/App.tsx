import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigators/AppNavigator';
import { navigationRef } from './navigators/navigationRef';
import { getNotificationsPermissions } from './utils/notificationsByNotifee';

function App() {
  useEffect(() => {
    getNotificationsPermissions();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
