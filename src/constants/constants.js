import Config from 'react-native-config';
import { TestIds } from 'react-native-google-mobile-ads';

export const BANNER_ADD_ID = __DEV__ ? TestIds.BANNER : Config.AD_BANNER_ID;
