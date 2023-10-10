import React, { useCallback, useEffect, useState } from 'react';
import {
  TestIds,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {
  displayNormalNotification,
  displayProgressNotification,
} from '../utils/notificationsByNotifee';
import WebView from 'react-native-webview';
import Toast from 'react-native-root-toast';
import RNBlobUtil from 'react-native-blob-util';
import analytics from '@react-native-firebase/analytics';

import { COLORS } from '../theme/Colors';
import { ms } from 'react-native-size-matters';
import { goBack } from '../navigators/navigationRef';
import { arrow, close, download, newUrl } from '../assets';
import { inferContentTypeFromUrl } from '../utils/globalMethods';
import Header from '../components/Header';
import CustomBtn from '../components/Button';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { BANNER_ADD_ID } from '../constants/constants';

const TOAST_CONFIG = {
  opacity: 0.9,
  position: Toast.positions.BOTTOM,
  containerStyle: {
    width: ms(280),
    height: ms(40),
    backgroundColor: COLORS.appBlack,
  },
};

const Preview = ({ route }) => {
  const uri = route?.params?.uri;

  const [postUrl, setPostUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const { height, width } = useWindowDimensions();

  const handleWebViewMsg = (e: any) => {
    if (e?.nativeEvent) {
      const link = e?.nativeEvent?.data;
      setPostUrl(link);
    }
  };

  const onDone = (msg?: string) => {
    setPostUrl('');
    setDownloading(false);
  };

  const interstitial = InterstitialAd.createForAdRequest(
    __DEV__ ? TestIds.INTERSTITIAL : BANNER_ADD_ID,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'sport', 'social'],
    },
  );

  const handleNewUrl = () => {
    onDone();
    goBack();
  };

  const downloadPost = useCallback(() => {
    analytics().logEvent('download_started');
    setDownloading(true);
    Toast.show('Downloading started', TOAST_CONFIG);

    const date = new Date();
    displayNormalNotification('iGrab-post-1', 'Downloading started');
    let downloadDir = RNBlobUtil.fs.dirs.DownloadDir;

    const downloadPath =
      downloadDir +
      '/iGrab/' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      inferContentTypeFromUrl(postUrl);

    // Use react-native-blob-util to start the download
    RNBlobUtil.config({
      path: downloadPath,
      fileCache: true,
    })
      .fetch('GET', postUrl)
      .progress((received, total) => {
        let percentage = (received / total) * 100;
        console.log(percentage);
        displayProgressNotification(
          'iGrab-post-1',
          'Downloading',
          100,
          percentage,
        );
      })
      .then(res => {
        if (res.respInfo.status === 200) {
          displayNormalNotification('iGrab-post-1', 'Download is successful');
          setDownloading(false);
        } else {
          displayNormalNotification(
            'iGrab-post-1',
            'Download is not successful! Please try again',
          );
          setDownloading(false);
          Toast.show('Downloading complete', TOAST_CONFIG);
        }
      })
      .catch(err => {
        displayNormalNotification(
          'iGrab-post-1',
          'Download is not successful! Please try again',
        );
        setDownloading(false);
      });
  }, [postUrl]);

  const INJECTED_JS = `
      (function() {
        setTimeout(() => {
          document.body.style.color= "#333636"
          if (document.querySelectorAll("video").length > 0) {
            window.ReactNativeWebView.postMessage(document.querySelectorAll("video")[0].src);
          } else if (document.querySelectorAll('img').length > 0) {
            const imgs = document.querySelectorAll('img');
            const jsImgs = Array.prototype.slice.call(imgs);
            const imgLink = jsImgs.filter(el => el.srcset).map(el => el.srcset)[0].split(',')[2].split(' ')[0];
            window.ReactNativeWebView.postMessage(imgLink);
          }
        }, 5000)
      })();
    `;

  useEffect(() => {
    interstitial.load();
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      if (downloading) {
        interstitial.show();
      }
    });
  }, [downloading]);

  return (
    <SafeAreaWrapper>
      {!postUrl && (
        <View
          style={{
            zIndex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color={COLORS.instaPinkkish} />
        </View>
      )}

      <Header
        icon={arrow}
        title="Preview"
        rightIcon={close}
        onRightPress={handleNewUrl}
      />
      <WebView
        source={{ uri }}
        onMessage={handleWebViewMsg}
        injectedJavaScript={INJECTED_JS}
        style={{
          height,
          width,
          backgroundColor: COLORS.appBlack,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomBtn
          title="Download"
          icon={download}
          onPress={downloadPost}
          isLoading={downloading || !postUrl}
          iconStyles={{ backgroundColor: COLORS.instaReddish }}
        />
        <CustomBtn
          title="New url"
          icon={newUrl}
          onPress={handleNewUrl}
          iconStyles={styles.whiteBg}
          txtCntStyle={styles.whiteBg}
          txtStyle={{ color: COLORS.instaReddish }}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default Preview;

const styles = StyleSheet.create({
  whiteBg: { backgroundColor: COLORS.white },
  btnTxt: { fontSize: ms(16), color: 'white' },
});
