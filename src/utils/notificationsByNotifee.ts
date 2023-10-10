import notifee from '@notifee/react-native';

// require for iOS
export const getNotificationsPermissions = async () => {
  await notifee.requestPermission();
};

// Create a channel (required for Android)
export const createChannelId = async () => {
  const channelId = await notifee.createChannel({
    id: 'iGrab_3188',
    name: 'iGrab Notis',
    vibration: false,
  });
  return channelId;
};

export const displayNormalNotification = async (id: string, title: string) => {
  await notifee.displayNotification({
    id,
    title,
    android: {
      channelId: 'iGrab_3188',
      smallIcon: 'ic_launcher',
      largeIcon: 'https://cdn-icons-png.flaticon.com/128/11005/11005470.png',
      pressAction: {
        id,
        launchActivity: 'default',
      },
    },
  });
};

export const displayProgressNotification = async (
  id: string,
  title: string,
  max: number,
  current: number,
) => {
  await notifee.displayNotification({
    id,
    title,
    android: {
      pressAction: {
        id,
        launchActivity: 'default',
      },
      smallIcon: 'ic_launcher',
      channelId: 'iGrab_3188',
      progress: {
        max,
        current,
      },
    },
  });
};

export const cancelProgressNotificaiton = async (id: string) => {
  await notifee.cancelNotification(id);
};
