import firebase from '@react-native-firebase/app';
import { getAnalytics } from '@react-native-firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB2AgZCZ11BF-ISatRexYeYhJ_tDG7E2n0',
  authDomain: 'igrab-tdh.firebaseapp.com',
  projectId: 'igrab-tdh',
  storageBucket: 'igrab-tdh.appspot.com',
  messagingSenderId: '67729079883',
  appId: '1:67729079883:web:7d7955315539c5025b57ce',
  measurementId: 'G-E0YP3X0PX6',
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export const analytics = getAnalytics(app);
