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
  });
  return channelId;
};

export const displayNormalNotification = async (id:string,title: string) => {
  await notifee.displayNotification({
    id,
    title,
    android: {
      channelId: await createChannelId(),
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
      channelId: await createChannelId(),
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
